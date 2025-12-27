import { useState, useRef, useEffect } from 'react';
import './MusicPlayer.css';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio();
    
    // Using the local song file from public folder
    audio.src = '/song/ytmp3free.cc_abba-happy-new-year-lyrics-youtubemp3free.org.mp3';
    audio.loop = true;
    audio.volume = 0.3; // Gentle volume
    
    audioRef.current = audio;

    // Attempt to autoplay the music when page loads
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          // Autoplay was prevented by browser, user will need to click play button
          console.log('Autoplay prevented:', error);
        });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = (e) => {
    e.stopPropagation(); // Prevent triggering fireworks
    
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        console.log('Audio play failed:', err);
      });
    }
    
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-player">
      <button 
        className={`music-button ${isPlaying ? 'playing' : ''}`}
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="6" y="4" width="4" height="16" fill="currentColor" rx="1" />
            <rect x="14" y="4" width="4" height="16" fill="currentColor" rx="1" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
          </svg>
        )}
      </button>
      
      <div className="music-label">
        {isPlaying ? '🎵 Playing' : '🎵 Play Music'}
      </div>
    </div>
  );
};

export default MusicPlayer;
