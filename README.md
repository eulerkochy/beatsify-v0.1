# Beatsify - Your Music Buddy 🎵

A modern React application that creates personalized Spotify playlists based on your favorite songs. Built with the latest web technologies and best practices.

## ✨ Features

- **Smart Playlist Generation**: Create playlists based on any song you love
- **Spotify Integration**: Seamless authentication and playlist creation
- **Modern UI**: Beautiful, responsive design with smooth animations
- **Real-time Search**: Instant search with autocomplete functionality
- **Type Safety**: Full TypeScript support for better development experience
- **Modern Stack**: Built with React 18, Vite, and shadcn/ui components

## 🚀 Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: Zustand
- **Data Fetching**: React Query
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **API**: Spotify Web API

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd beatsify-v0.1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
   VITE_REDIRECT_URI=http://localhost:3000/callback
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests
- `npm run type-check` - Check TypeScript types

### Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   └── ...             # Custom components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
├── services/           # API services
├── store/              # Zustand store
├── types/              # TypeScript type definitions
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles
```

### Key Components

- **SearchBox**: Smart search with autocomplete
- **Playlist**: Display and manage playlists
- **LoginPage**: Spotify authentication
- **HomePage**: Main application interface

## 🎨 Design System

The app uses shadcn/ui components with a custom design system:

- **Colors**: Spotify-inspired color palette
- **Typography**: Inter font family
- **Spacing**: Consistent spacing scale
- **Animations**: Smooth transitions and micro-interactions

## 🔐 Spotify API Setup

1. **Create a Spotify App**
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create a new app
   - Get your Client ID

2. **Configure Redirect URIs**
   - Add `http://localhost:3000/callback` to your app's redirect URIs
   - For production, add your domain's callback URL

3. **Set Environment Variables**
   - Add your Client ID to the `.env` file

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy your app

### Other Platforms

The app can be deployed to any platform that supports Node.js:

- Netlify
- Railway
- Heroku
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Vite](https://vitejs.dev/) for fast development
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations

## 🐛 Issues

If you encounter any issues, please [open an issue](https://github.com/your-username/beatsify/issues) on GitHub.

---

Made with ❤️ by [Your Name]
