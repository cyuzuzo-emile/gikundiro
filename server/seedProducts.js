require('dotenv').config();
const pool = require('./db');

const products = [
  { name: '2024 Home Jersey', category: 'Jerseys', price: 25000, image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=400&fit=crop', rating: 4.8, in_stock: true },
  { name: '2024 Away Jersey', category: 'Jerseys', price: 25000, image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop', rating: 4.6, in_stock: true },
  { name: 'Training Kit', category: 'Jerseys', price: 18000, image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&h=400&fit=crop', rating: 4.4, in_stock: true },
  { name: 'Official Scarf', category: 'Scarves', price: 8000, image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=400&fit=crop', rating: 4.9, in_stock: true },
  { name: 'Club Cap', category: 'Hats', price: 5000, image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop', rating: 4.5, in_stock: true },
  { name: 'Flag Banner', category: 'Accessories', price: 12000, image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=400&fit=crop', rating: 4.7, in_stock: true },
  { name: 'Season Ticket 2024', category: 'Tickets', price: 150000, image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=400&fit=crop', rating: 5.0, in_stock: true },
  { name: 'Retro Jersey 2010', category: 'Jerseys', price: 30000, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop', rating: 4.9, in_stock: false },
];

(async () => {
  try {
    for (const p of products) {
      await pool.query(
        'INSERT IGNORE INTO products (name,category,price,image,rating,in_stock) VALUES (?,?,?,?,?,?)',
        [p.name, p.category, p.price, p.image, p.rating, p.in_stock]
      );
    }
    console.log('Products seeded successfully!');
  } catch (e) {
    console.error('Seed error:', e.message);
  } finally {
    process.exit();
  }
})();
