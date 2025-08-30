# Beatsify Deployment Guide

## Overview
Beatsify is a full-stack application that can be deployed as a single service:
- **Frontend**: React app built with Vite
- **Backend**: Express.js API server
- **Deployment**: Railway (recommended) or similar platforms

## Prerequisites
- Spotify Developer Account with API credentials
- Git repository (GitHub, GitLab, etc.)
- Railway account (free tier available)

## Step 1: Spotify API Setup

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Add redirect URIs:
   - Development: `http://localhost:3000/callback`
   - Production: `https://your-railway-domain.com/callback`
4. Copy your Client ID and Client Secret

## Step 2: Railway Deployment (Recommended)

### Option A: Deploy via Railway CLI
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Initialize and deploy
railway init
railway up
```

### Option B: Deploy via Railway Dashboard
1. Go to [Railway](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Connect your GitHub repository
4. Railway will automatically detect the Node.js app
5. Set environment variables in the Railway dashboard:
   - `SPOTIFY_CLIENT_SECRET`: Your Spotify Client Secret
   - `VITE_SPOTIFY_CLIENT_ID`: Your Spotify Client ID
   - `VITE_REDIRECT_URI`: Your Railway domain + `/callback`

### Railway Configuration
The app uses the following configuration:
- **Build Command**: `npm run build:full` (builds both frontend and backend)
- **Start Command**: `npm start` (starts the Express server)
- **Health Check**: `/api/health` endpoint

## Step 3: Environment Variables

Set these in your Railway project settings:

```
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
VITE_REDIRECT_URI=https://your-railway-domain.com/callback
```

## Step 4: Test Deployment

1. Visit your Railway domain
2. Test the Spotify login flow
3. Verify that recommendations work

## Alternative Deployment Options

### Vercel + Railway (Split Deployment)
- Frontend on Vercel
- Backend on Railway
- Requires CORS configuration

### Render (Full Stack)
- Similar to Railway
- Good free tier
- Automatic deployments

### Heroku (Full Stack)
- More complex setup
- Requires Procfile
- Good for scaling

### DigitalOcean App Platform
- Good for full-stack deployments
- Automatic scaling
- Built-in CI/CD

## Troubleshooting

### Common Issues:
1. **Build failures**: Check Node.js version (requires 18+)
2. **Spotify redirect errors**: Verify redirect URIs match exactly
3. **Static files not serving**: Ensure `dist` folder is built
4. **API errors**: Check environment variables

### Debug Commands:
```bash
# Test locally
npm run build:full
npm start

# Check Railway logs
railway logs
```

### Local Testing:
```bash
# Build and test locally
npm run build:full
npm start

# Visit http://localhost:3001
```
