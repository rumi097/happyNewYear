# 💖 New Year Celebration for Rafia

A romantic, interactive New Year celebration web app created with React - a digital surprise card filled with love and magic! ✨

## ✨ Features

- 🎆 **Automatic & Interactive Fireworks** - Beautiful fireworks that launch automatically and on click/tap
- 🎊 **Magical Confetti & Sparkles** - Heart-shaped sparkles and colorful confetti falling gracefully
- 💝 **Elegant Text Animations** - Smooth typewriter effects with glowing romantic text
- 🎵 **Background Music** - Gentle romantic music with play/pause controls
- 💖 **Celebration Button** - Tap to trigger a spectacular fireworks finale
- 🎁 **Interactive Gift Box** - Beautiful animated gift box that opens to reveal special messages
- 🌐 **Social Share Buttons** - One-click sharing to WhatsApp, Facebook, Twitter, Messenger, or copy link
- 🎯 **3D Parallax Effect** - Elements move based on device tilt or mouse movement for depth
- 📱 **Mobile-First Design** - Optimized for all devices, especially mobile
- 🎨 **Romantic Color Palette** - Soft pinks, golds, and warm whites

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will open automatically at `http://localhost:3000`

## 💌 How to Share

This app is designed to be shared as a surprise! Here are some ways to share it:

1. **Use the built-in share button** (bottom-right corner):
   - Click the pink 💝 Share button
   - Choose WhatsApp, Facebook, Twitter, Messenger, or copy the link
   - Send directly to your loved one!

2. **Deploy it online** using services like:
   - Vercel (recommended): `npm run build` then upload the `dist` folder
   - Netlify: Drag and drop the `dist` folder
   - GitHub Pages: Push to a repo and enable GitHub Pages

3. **Perfect timing**: Send it at midnight on New Year's Eve! 🎉

## 🎁 Interactive Elements

- **Tap/Click anywhere** - Creates fireworks at that location
- **Music Button** (top-right) - Toggle romantic background music
- **Tap to Celebrate Button** - Triggers mega fireworks display
- **Open Your Gift Button** - Reveals 4 special romantic messages
- **Share Button** (bottom-right) - Share to social media platforms
- **Parallax Effect** - Tilt your device or move your mouse to see 3D depth

## 🎨 Customization

You can easily customize the messages in `src/App.jsx`:

```jsx
<TypewriterText 
  text="Happy New Year, [Name] ❤️" 
  className="main-heading"
/>
```

Change the romantic wish:
```jsx
<TypewriterText 
  text="Your custom romantic message here..."
  className="romantic-message"
/>
```

## 🎵 Audio Note

The music player uses a placeholder URL. For production:
1. Add your own romantic music file to the `public` folder
2. Update the audio source in `src/components/MusicPlayer.jsx`

```jsx
audio.src = '/your-music-file.mp3';
```

## 📱 Mobile Optimization

- Full-screen experience
- Touch-optimized interactions
- Responsive text sizing
- Optimized animations for mobile performance
- Prevents scrolling and zoom

## 🛠️ Technologies Used

- React 18
- Vite (Fast build tool)
- HTML5 Canvas (for animations)
- CSS3 (Advanced animations & effects)
- Vanilla JavaScript (Audio API)

## 💝 Perfect For

- New Year surprises
- Romantic gestures
- Special celebrations
- Digital greeting cards
- Long-distance relationships

## 📄 License

This is a personal project created with love. Feel free to use it for your own romantic surprises! ❤️

---

Made with 💖 for someone special
