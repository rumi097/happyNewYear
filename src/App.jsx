import { useState, useEffect, useRef } from 'react';
import Fireworks from './components/Fireworks';
import Confetti from './components/Confetti';
import TypewriterText from './components/TypewriterText';
import MusicPlayer from './components/MusicPlayer';
import CelebrationButton from './components/CelebrationButton';
import GiftBox from './components/GiftBox';
import './App.css';

function App() {
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [fireworkTrigger, setFireworkTrigger] = useState(0);
  const [bigCelebration, setBigCelebration] = useState(false);
  const [giftBoxOpened, setGiftBoxOpened] = useState(false);
  const [celebrationClosed, setCelebrationClosed] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  // Parallax 3D tilt effect
  useEffect(() => {
    const handleDeviceOrientation = (event) => {
      // For mobile devices with gyroscope
      if (event.beta !== null && event.gamma !== null) {
        const x = (event.gamma / 90) * 20; // -20 to 20
        const y = (event.beta / 90) * 20;
        setParallax({ x, y });
      }
    };

    const handleMouseMove = (event) => {
      // For desktop - mouse position
      const x = (event.clientX / window.innerWidth - 0.5) * 20;
      const y = (event.clientY / window.innerHeight - 0.5) * 20;
      setParallax({ x, y });
    };

    // Request permission for iOS devices
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', handleDeviceOrientation);
          }
        })
        .catch(console.error);
    } else {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleScreenClick = (e) => {
    // Trigger firework at click position
    if (!bigCelebration) {
      setFireworkTrigger(prev => prev + 1);
    }
  };

  const handleCelebrate = () => {
    setBigCelebration(true);
    setShowFinalMessage(true);
    setGiftBoxOpened(false); // Hide gift box when celebrating
    
    // Play celebration sound
    const audio = new Audio();
    audio.volume = 0.6;
    // Using a data URI for a simple celebration sound effect
    audio.play().catch(err => console.log('Audio play failed:', err));

    // Reset big celebration after animation
    setTimeout(() => setBigCelebration(false), 3000);
  };

  const handleGiftBoxOpen = () => {
    setGiftBoxOpened(true);
  };

  const handleGiftBoxClose = () => {
    setGiftBoxOpened(false);
  };

  const handleCloseCelebration = () => {
    setShowFinalMessage(false);
    setCelebrationClosed(true);
  };

  const handleReopenCelebration = (e) => {
    e.stopPropagation();
    setCelebrationClosed(false);
    setShowFinalMessage(true);
  };

  return (
    <div className="app" onClick={handleScreenClick}>
      <canvas ref={canvasRef} className="background-canvas" />
      
      <div 
        className="parallax-layer layer-1"
        style={{
          transform: `translate(${parallax.x * 0.5}px, ${parallax.y * 0.5}px)`
        }}
      >
        <Fireworks 
          trigger={fireworkTrigger} 
          bigCelebration={bigCelebration}
        />
      </div>
      
      <div 
        className="parallax-layer layer-2"
        style={{
          transform: `translate(${parallax.x * 0.3}px, ${parallax.y * 0.3}px)`
        }}
      >
        <Confetti />
      </div>
      
      <div 
        className="content parallax-layer layer-3"
        style={{
          transform: `translate(${parallax.x * 0.15}px, ${parallax.y * 0.15}px)`
        }}
      >
        <MusicPlayer />
        
        <div className="message-container">
          <TypewriterText 
            text="Happy New Year, Rafia ❤️" 
            className="main-heading"
            delay={500}
          />
          
          <TypewriterText 
            text="May this new year bring you endless happiness, love, and all the dreams your heart holds. I'm grateful for you, today and always."
            className="romantic-message"
            delay={3000}
            speed={30}
          />
          
          {!showFinalMessage && !giftBoxOpened && (
            <CelebrationButton onClick={handleCelebrate} />
          )}
          
          {celebrationClosed && (
            <button className="small-celebration-button" onClick={handleReopenCelebration}>
              💖
            </button>
          )}
          
          <GiftBox onOpen={handleGiftBoxOpen} onClose={handleGiftBoxClose} />
          
          {showFinalMessage && !celebrationClosed && (
            <div className="final-celebration">
              <div className="final-message">
                <TypewriterText 
                  text="You are my greatest blessing, my endless joy, and the love of my life. Forever and always, Rafia ❤️✨" 
                  className="love-message"
                  delay={500}
                  speed={40}
                />
              </div>
              <div className="celebration-extras">
                <div className="floating-hearts"></div>
                <div className="sparkle-burst"></div>
              </div>
              <button className="close-celebration-button" onClick={handleCloseCelebration}>
                ✨ Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
