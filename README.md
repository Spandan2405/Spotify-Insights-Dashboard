<div id="top" class="">

<div align="center" class="text-center">
<h1>🎵 SPOTIFY-INSIGHTS-DASHBOARD</h1>
<p><em>Uncover Music Insights, Elevate Your Listening Experience</em></p>
</div>
<br>
<h2>Overview</h2>
<p>A modern, responsive web application that visualizes your Spotify listening habits, top tracks, artists, playlists, and more. Built with React, Vite, and Tailwind CSS, this dashboard provides a seamless and interactive experience for exploring your Spotify profile data.</p>
<p><strong>Why Spotify-Insights-Dashboard?</strong></p>
<p>This project empowers developers to create engaging, data-driven music experiences with seamless API integration. The core features include:</p>
<ul class="list-disc pl-4 my-0">
<li class="my-0">🎨 <strong>🚀 Fast Development:</strong> Utilizes React with Vite for rapid build times and Hot Module Replacement.</li>
<li class="my-0">🔧 <strong>🛠️ API Management:</strong> Includes utilities for handling Spotify tokens, refresh, and error states.</li>
<li class="my-0">📊 <strong>📈 Rich Visual Components:</strong> Offers user profiles, playlists, top artists, tracks, and detailed insights.</li>
<li class="my-0">🧩 <strong>🔗 Modular Architecture:</strong> Centralized context and reusable components for scalable development.</li>
<li class="my-0">💡 <strong>✨ Enhanced User Experience:</strong> Interactive filters, loading indicators, and personalized data presentation.</li>
</ul>
<hr>

## 🌟 Live Demo

- **🔗 Live Application**: https://spotify-insights-dashboard.vercel.app/
- **👀 Demo Mode**: Try the application instantly with sample data
- **📧 Request Access**: Get personalized access to use your own Spotify data
  
## ✨ Features

### 🎯 Core Analytics
- **Profile Overview**: Display user profile with follower count, following, and playlist statistics
- **Top Artists**: View most listened-to artists with filtering by time periods (4 weeks, 6 months, all time)
- **Top Tracks**: Discover favorite songs with album artwork and detailed information
- **Recently Played**: Track recent listening history with timestamps
- **Playlists**: Browse user-created playlists with track counts and descriptions
- **Artist Details**: Deep dive into individual artists with related artists and top tracks
- **Track Details**: Detailed track information including audio features and recommendations

### 🚀 User Experience Features
- **Demo Mode**: Instant access with realistic sample data - perfect for recruiters and quick exploration
- **Access Request System**: Professional form submission with automated email workflow
- **Video Walkthrough**: Embedded video demonstration of all features
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **Loading States**: Smooth loading animations and skeleton screens
- **Error Handling**: Comprehensive error handling with user-friendly messages and retry options

### 🔧 Technical Features
- **OAuth 2.0 Authentication**: Secure Spotify authentication with automatic token refresh
- **Real-time Data**: Live data fetching from Spotify Web API
- **State Management**: Global state management using React Context
- **Client-side Routing**: Smooth navigation with React Router
- **Email Integration**: Automated email system for access requests using Nodemailer
- **Local Storage**: Secure token storage with expiration handling
- **API Rate Limiting**: Proper handling of Spotify API rate limits

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **React Router** - Client-side routing and navigation
- **React Context** - Global state management

### Backend & APIs
- **Spotify Web API** - Music data and user authentication
- **EmailJs** - Email service integration
- **OAuth 2.0** - Secure authentication flow

### Development & Deployment
- **JavaScript/TypeScript** - Modern JavaScript with type safety
- **Git** - Version control
- **Environment Variables** - Secure configuration management
- **Responsive Design** - Mobile-first approach

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Spotify Developer Account
- Email service credentials (Gmail recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Spandan2405/Spotify-Insights-Dashboard.git
   cd spotify-profile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Spotify API Configuration
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   SPOTIFY_REDIRECT_URI=http://localhost:3000/callback
   
   # Application Configuration
   FRONTEND_URL=http://localhost:3000
   ```

4. **Configure Spotify App**
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create a new app
   - Add `http://localhost:3000/callback` to redirect URIs
   - Copy Client ID and Client Secret to your `.env.local`

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage

### Demo Mode
1. Visit the landing page
2. Click "Launch Demo" to explore with sample data
3. Navigate through all features without authentication

### Personal Access
1. Click "Request Access" on the landing page
2. Fill out the access request form
3. Wait for approval email
4. Use your Spotify credentials to log in

### Features Navigation
- **Profile**: Overview of your Spotify profile and statistics
- **Top Artists**: Your most played artists with time filtering
- **Top Tracks**: Your favorite songs with detailed information
- **Recent**: Recently played tracks with timestamps
- **Playlists**: Your created playlists and their details

## 🏗️ Project Structure

```
spotify-profile-analytics/
├── spotify-profile/              # Main application
│   └── src/
│       ├── components/           # React components
│       │   ├── Sidebar.jsx       # Navigation sidebar
│       │   ├── UserProfile.jsx   # Profile component
│       │   └── ...
│       ├── context/              # React Context
│       │   └── SpotifyContext.jsx
│       ├── pages/                # Application pages
│       │   ├── Profile.jsx
│       │   ├── Artists.jsx
│       │   └── ...
│       ├── utils/                # Utility functions
│       │   └── spotify.jsx       # Spotify API integration
│       └── data/                 # Demo data
│           └── demoData.json
├── public/                       # Static assets
└── README.md
```

## 🔐 Authentication Flow

1. **User Authentication**: OAuth 2.0 flow with Spotify
2. **Token Management**: Automatic refresh token handling
3. **Secure Storage**: Tokens stored in localStorage with expiration
4. **API Requests**: Authenticated requests to Spotify Web API
5. **Error Handling**: Graceful handling of authentication errors

## 🎨 Design System

- **Color Palette**: Spotify green (#1DB954) with dark theme
- **Typography**: Clean, modern fonts with proper hierarchy
- **Responsive Breakpoints**: Mobile-first responsive design
- **Component Library**: Reusable components with consistent styling
- **Animations**: Smooth transitions and loading states

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms
- **Netlify**: Static site deployment
- **Railway**: Full-stack deployment
- **Heroku**: Container-based deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

- **Portfolio**: https://spandangupta-v2.netlify.app/
- **LinkedIn**: https://www.linkedin.com/in/spandangupta2003
- **Email**: spandan2405@gmail.com
- **GitHub**: https://github.com/Spandan2405

---

⭐ **Star this repository if you found it helpful!**

Built with ❤️ and lots of ☕


## ScreenShots :-

<img width="1896" height="856" alt="image" src="https://github.com/user-attachments/assets/c3c44b70-ddc5-4b6e-a0f0-d049de2a33e9" />

![image](https://github.com/user-attachments/assets/671dfaa4-676e-4faf-b955-895af882d40e)

![image](https://github.com/user-attachments/assets/f2742db2-a8e5-4005-afb5-dba6c1fc9d63)

![image](https://github.com/user-attachments/assets/15ceccb4-78f6-4971-aa14-a9fdca263f34)

![image](https://github.com/user-attachments/assets/63c37e10-a79e-49ef-870a-f0053b52c613)
![image](https://github.com/user-attachments/assets/0e5ad3af-b9de-4a70-b637-548495e74fb1)
