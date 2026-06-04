# Deployment Guide for Rayon Sports FC Website

## Overview
This is a full-stack application with:
- **Frontend**: React + Tailwind CSS (already built in `client/build`)
- **Backend**: Node.js + Express API
- **Database**: MongoDB

---

## Option 1: Railway (Recommended - Free Tier)

### Step 1: Prepare Your Code
1. Push your code to GitHub
2. Create a `.env` file in the `server` folder with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

### Step 2: Deploy Backend on Railway
1. Go to [railway.app](https://railway.app) and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Set the root directory to `server`
5. Add environment variables in Railway dashboard:
   - `MONGODB_URI`: Get free MongoDB from MongoDB Atlas
   - `JWT_SECRET`: Generate a random string
   - `NODE_ENV`: `production`
6. Deploy

### Step 3: Deploy Frontend on Vercel
1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Set root directory to `client`
5. Add build command: `npm run build`
6. Add output directory: `build`
7. Add environment variable:
   - `VITE_API_URL`: Your Railway backend URL (e.g., `https://your-app.railway.app`)
8. Deploy

---

## Option 2: Render (Free Tier)

### Step 1: Backend
1. Go to [render.com](https://render.com) and sign up
2. Create "New Web Service"
3. Connect your GitHub repo
4. Settings:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `node server.js`
5. Add environment variables
6. Deploy

### Step 2: Frontend
1. Create "New Static Site" on Render
2. Connect GitHub repo
3. Settings:
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Publish Directory: `build`
4. Add environment variable for API URL
5. Deploy

---

## Option 3: Fly.io (Full Stack)

### Step 1: Install Fly CLI
```bash
npm install -g flyctl
flyctl auth login
```

### Step 2: Create fly.toml
Create `fly.toml` in project root:
```toml
app = "rayon-sports-fc"
kill_signal = "SIGINT"
kill_timeout = 5
processes = []

[build]
  builder = "heroku/buildpacks:20"

[env]
  NODE_ENV = "production"

[services]
  http_checks = []
  internal_port = 5000
  processes = ["app"]
  protocol = "tcp"
  script = "npm start"

[[services]]
  ports = ["80:5000", "443:5000"]

[[statics]]
  guest_path = "/app/client/build"
  url_prefix = "/"
```

### Step 3: Deploy
```bash
flyctl launch
flyctl deploy
```

---

## MongoDB Setup (Required for All Options)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas/database)
2. Create free account
3. Create free cluster
4. Create database user
5. Get connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/rayonsportsfc?retryWrites=true&w=majority
   ```

---

## Quick Local Production Test

To test locally before deploying:

```bash
# Install dependencies
cd client && npm install
cd ../server && npm install

# Set environment variables
set MONGODB_URI=mongodb://localhost:27017/rayonsportsfc
set JWT_SECRET=your_secret
set NODE_ENV=production
set PORT=5000

# Run production build
cd .. 
npm run prod
```

---

## Environment Variables Needed

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret for JWT tokens | `randomstring123` |
| `NODE_ENV` | Set to `production` | `production` |
| `PORT` | Server port | `5000` |

---

## After Deployment

1. Update CORS settings in `server/server.js` to allow your frontend domain
2. Update API base URL in `client/src/services/api.js` to point to your backend
3. Rebuild and redeploy frontend
