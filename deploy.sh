#!/bin/bash

echo "🚀 Beatsify Railway Deployment Script"
echo "====================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Build the full application
echo "📦 Building full application..."
npm run build:full

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

echo ""
echo "💡 Next steps for Railway deployment:"
echo ""
echo "1. Install Railway CLI:"
echo "   npm i -g @railway/cli"
echo ""
echo "2. Login to Railway:"
echo "   railway login"
echo ""
echo "3. Deploy to Railway:"
echo "   railway init"
echo "   railway up"
echo ""
echo "4. Set environment variables in Railway dashboard:"
echo "   - SPOTIFY_CLIENT_SECRET"
echo "   - VITE_SPOTIFY_CLIENT_ID"
echo "   - VITE_REDIRECT_URI"
echo ""
echo "5. Update Spotify redirect URIs:"
echo "   - Add your Railway domain to Spotify Developer Dashboard"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
echo ""
echo "🎉 Ready for Railway deployment!"
