# Deploying Rayon Sports FC on Render

This guide walks you through deploying your full-stack application on Render.

---

## Prerequisites

1. **GitHub Account** - Push your code to a GitHub repository
2. **Render Account** - Sign up at [render.com](https://render.com)
3. **MongoDB Atlas Account** - Sign up at [mongodb.com/atlas](https://www.mongodb.com/atlas)

---

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and sign up
2. Create a free cluster:
   - Select "Free" tier (M0)
   - Choose a cloud provider (AWS recommended)
   - Select a region closest to you
3. Create a database user:
   - Go to "Database Access" → "Add New User"
   - Username: `admin`
   - Password: Create a strong password (save this!)
   - Database User Privileges: "Read and write to any database"
4. Network Access:
   - Go to "Network Access" → "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
5. Get connection string:
   - Go to "Database" → "Connect" → "Drivers"
   - Copy the connection string
   - Replace `<password>` with your database password
   - The string should look like:
     ```
     mongodb+srv://admin:yourpassword@cluster0.xyz123.mongodb.net/rayonsportsfc?retryWrites=true&w=majority
     ```

---

## Step 2: Deploy Backend (API)

1. Log in to [Render](https://render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `rayon-sports-api`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Add Environment Variables (click "Advanced"):
   - `MONGODB_URI`: (your MongoDB Atlas connection string)
   - `JWT_SECRET`: (generate a random string - use a password generator)
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
6. Click "Create Web Service"
7. Wait for deployment to complete (2-5 minutes)
8. Note your backend URL (e.g., `https://rayon-sports-api.onrender.com`)

---

## Step 3: Deploy Frontend

1. On Render, click "New" → "Static Site"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `rayon-sports-web`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `build`
4. Add Environment Variables:
   - `REACT_APP_API_URL`: `https://rayon-sports-api.onrender.com` (your backend URL from Step 2)
5. Click "Create Static Site"
6. Wait for deployment to complete (3-5 minutes)

---

## Step 4: Configure CORS

After deploying, update your backend to allow your frontend:

1. Go to your Render API dashboard
2. Click "Environment"
3. Update `ALLOWED_ORIGINS` variable:
   ```
   https://rayon-sports-web.onrender.com
   ```
4. Click "Save Changes"
5. The service will automatically redeploy

---

## Step 5: Test Your Live Website

1. Visit your frontend URL (e.g., `https://rayon-sports-web.onrender.com`)
2. Test:
   - Homepage loads
   - Navigation works
   - Try registering a new account
   - Try logging in
   - Check if data persists

---

## Troubleshooting

### Frontend shows "Network Error"
- Check browser console for details
- Verify `REACT_APP_API_URL` is set correctly in frontend environment variables
- Check that backend is running and responding at `/api/health`

### Login/Register doesn't work
- Check CORS settings on backend
- Verify `ALLOWED_ORIGINS` includes your frontend URL
- Check browser console for CORS errors

### Database connection errors
- Verify MongoDB Atlas cluster is running (not paused)
- Check username/password in connection string
- Ensure network access allows all IPs (0.0.0.0/0)

### Build failures
- Check Build Logs in Render dashboard
- Ensure all dependencies are in package.json
- Verify Node version compatibility

---

## Important Notes

- **Free Tier Limits**: Render's free tier has limits (750 hours, 512 MB RAM). Your site will sleep after 15 minutes of inactivity and wake up on the next visit.
- **Database**: MongoDB Atlas free tier also has limitations but works fine for small projects.
- **Custom Domain**: You can connect a custom domain in Render settings (requires verification).
