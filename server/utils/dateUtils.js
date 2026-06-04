/**
 * Convert ISO datetime string to MySQL format (YYYY-MM-DD HH:MM:SS)
 * If value is already in MySQL format or is a Date object, return as-is
 */
const convertToMySQLDateTime = (value) => {
  if (!value) return value;
  
  // If it's an ISO string, convert it
  if (typeof value === 'string' && value.includes('T')) {
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      return date.toISOString().slice(0, 19).replace('T', ' ');
    }
  }
  
  // If it's a Date object, convert it
  if (value instanceof Date && !isNaN(value.getTime())) {
    return value.toISOString().slice(0, 19).replace('T', ' ');
  }
  
  return value;
};

/**
 * Sanitize data object by converting datetime fields
 * Skips fields that shouldn't be updated from client (like created_at, id)
 */
const sanitizeData = (data, excludeFields = ['id', 'created_at']) => {
  const sanitized = { ...data };
  
  // Remove excluded fields
  excludeFields.forEach(field => delete sanitized[field]);
  
  // Convert datetime fields
  const datetimeFields = ['updated_at', 'published_at', 'booked_at', 'date'];
  Object.keys(sanitized).forEach(key => {
    if (datetimeFields.includes(key)) {
      sanitized[key] = convertToMySQLDateTime(sanitized[key]);
    }
  });
  
  return sanitized;
};

module.exports = { convertToMySQLDateTime, sanitizeData };
