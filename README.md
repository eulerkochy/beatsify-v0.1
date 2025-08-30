# Beatsify - Your Music Buddy

A modern React application that helps you discover and create amazing playlists using Spotify's API and AI-powered recommendations.

## Features

- 🎵 **Spotify Integration**: Seamless login and playlist creation
- 🔍 **Smart Search**: Find songs with autocomplete and keyboard navigation
- 🎯 **AI Recommendations**: Get personalized track recommendations
- 📱 **Modern UI**: Beautiful, responsive design with animations
- ⚡ **Fast Performance**: Built with Vite and optimized for speed

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion
- **Backend**: Express.js, Node.js
- **State Management**: Zustand
- **API**: Spotify Web API
- **Deployment**: Railway (full-stack)

## Quick Start

### Prerequisites
- Node.js 18+ 
- Spotify Developer Account
- Railway account (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd beatsify-v0.1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your Spotify API credentials
   ```

4. **Start development server**
   ```bash
   npm run dev:all
   ```

5. **Visit the app**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001

## Deployment

### Railway Deployment (Recommended)

Railway is perfect for deploying both frontend and backend as a single service.

1. **Install Railway CLI**
   ```bash
   npm i -g @railway/cli
   ```

2. **Login to Railway**
   ```bash
   railway login
   ```

3. **Deploy**
   ```bash
   railway init
   railway up
   ```

4. **Set environment variables** in Railway dashboard:
   - `SPOTIFY_CLIENT_SECRET`
   - `VITE_SPOTIFY_CLIENT_ID`
   - `VITE_REDIRECT_URI`

5. **Update Spotify redirect URIs** in your Spotify Developer Dashboard

### Alternative Deployments

- **Vercel + Railway**: Frontend on Vercel, backend on Railway
- **Render**: Full-stack deployment
- **Heroku**: Traditional full-stack deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## Spotify API Setup

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Add redirect URIs:
   - Development: `http://localhost:3000/callback`
   - Production: `https://your-domain.com/callback`
4. Copy Client ID and Client Secret

## Environment Variables

```env
# Spotify API Configuration
VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
VITE_REDIRECT_URI=http://localhost:3000/callback

# Production
VITE_REDIRECT_URI=https://your-domain.com/callback
```

## Available Scripts

- `npm run dev` - Start frontend development server
- `npm run dev:server` - Start backend development server
- `npm run dev:all` - Start both frontend and backend
- `npm run build` - Build frontend for production
- `npm run build:full` - Build both frontend and backend
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
beatsify-v0.1/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── services/          # API services
│   ├── store/             # State management
│   └── types/             # TypeScript types
├── backend/               # Backend files
├── server.js              # Express server
├── dist/                  # Built frontend files
└── package.json           # Dependencies and scripts
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) for details.

## Support

If you encounter any issues:
1. Check the [troubleshooting guide](./DEPLOYMENT.md#troubleshooting)
2. Review the [deployment documentation](./DEPLOYMENT.md)
3. Open an issue on GitHub

---

Built with ❤️ using React, TypeScript, and Spotify API
