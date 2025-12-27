import { useState } from 'react';
import './GiftBox.css';

const GiftBox = ({ onOpen, onClose }) => {
  const [currentGiftIndex, setCurrentGiftIndex] = useState(-1); // -1 means not started
  const [isBoxOpening, setIsBoxOpening] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [finalMessageShown, setFinalMessageShown] = useState(false);

  const handleOpen = (e) => {
    e.stopPropagation();
    if (currentGiftIndex === -1) {
      // First time opening
      setIsBoxOpening(true);
      setTimeout(() => {
        setIsBoxOpening(false);
        setCurrentGiftIndex(0);
        if (onOpen) onOpen();
      }, 2000);
    } else if (finalMessageShown) {
      // Restart from first gift
      setFinalMessageShown(false);
      setCurrentGiftIndex(0);
      if (onOpen) onOpen();
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (currentGiftIndex < gifts.length - 1) {
      // Transition to next gift
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentGiftIndex(currentGiftIndex + 1);
        setIsTransitioning(false);
      }, 1200);
    } else {
      // Show final message
      setIsTransitioning(true);
      setTimeout(() => {
        setShowFinalMessage(true);
        setIsTransitioning(false);
      }, 1200);
    }
  };

  const handleCloseFinalMessage = () => {
    setShowFinalMessage(false);
    setFinalMessageShown(true);
    if (onClose) onClose();
  };

  const gifts = [
    {
      icon: "💖",
      title: "Endless Love",
      message: "My love for you grows stronger every day"
    },
    {
      icon: "🌟",
      title: "Dreams Come True",
      message: "May all your wishes and dreams become reality"
    },
    {
      icon: "🎭",
      title: "Adventure Together",
      message: "Let's create amazing memories in the new year"
    },
    {
      icon: "🌹",
      title: "Forever Yours",
      message: "Today, tomorrow, and always - I'm yours"
    }
  ];

  return (
    <div className="gift-box-container">
      {currentGiftIndex === -1 && (
        <button className="open-gift-button" onClick={handleOpen}>
          🎁 Open Your Gift
        </button>
      )}

      {finalMessageShown && (
        <button className="small-gift-button" onClick={handleOpen}>
          🎁
        </button>
      )}

      {isBoxOpening && (
        <div className="gift-box-animation">
          <div className="gift-box opening">
            <div className="box-lid"></div>
            <div className="box-base"></div>
            <div className="ribbon-vertical"></div>
            <div className="ribbon-horizontal"></div>
            <div className="box-glow"></div>
            <div className="gift-particles">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="particle" style={{
                  '--angle': `${(360 / 24) * i}deg`,
                  '--delay': `${i * 0.04}s`
                }}></div>
              ))}
            </div>
            <div className="confetti-burst">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="confetti-piece" style={{
                  '--rotation': `${(360 / 20) * i}deg`,
                  '--delay': `${0.5 + i * 0.03}s`,
                  '--color': ['#FFB6C1', '#FFD700', '#FF69B4', '#FFC0CB'][i % 4]
                }}></div>
              ))}
            </div>
          </div>
          <div className="opening-rays">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="light-ray" style={{
                '--rotation': `${(360 / 12) * i}deg`
              }}></div>
            ))}
          </div>
        </div>
      )}

      {isTransitioning && (
        <div className="transition-animation">
          <div className="firework-burst">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="burst-line" style={{
                '--angle': `${(360 / 8) * i}deg`
              }}></div>
            ))}
          </div>
          <div className="heart-explosion">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="heart-particle" style={{
                '--rotation': `${(360 / 16) * i}deg`,
                '--delay': `${i * 0.05}s`
              }}>💖</div>
            ))}
          </div>
          <div className="star-burst">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="star-particle" style={{
                '--rotation': `${(360 / 12) * i}deg`,
                '--delay': `${i * 0.06}s`
              }}>⭐</div>
            ))}
          </div>
          <div className="rainbow-ring"></div>
          <div className="pulse-wave"></div>
        </div>
      )}

      {currentGiftIndex >= 0 && !showFinalMessage && !finalMessageShown && !isTransitioning && (
        <div className="current-gift-display">
          <div className="gift-item revealed" key={currentGiftIndex}>
            <div className="gift-petal-wrapper">
              <div className="petal petal-1"></div>
              <div className="petal petal-2"></div>
              <div className="petal petal-3"></div>
              <div className="petal petal-4"></div>
              <div className="gift-content">
                <div className="gift-icon">{gifts[currentGiftIndex].icon}</div>
                <div className="gift-title">{gifts[currentGiftIndex].title}</div>
                <div className="gift-message">{gifts[currentGiftIndex].message}</div>
              </div>
            </div>
          </div>
          
          <button className="next-gift-button" onClick={handleNext}>
            {currentGiftIndex < gifts.length - 1 ? '✨ Next Gift' : '💝 Final Message'}
          </button>
        </div>
      )}

      {showFinalMessage && !isTransitioning && (
        <div className="final-gift-message">
          <div className="many-more-message">
            <div className="message-icon">🎁💖✨</div>
            <div className="message-text">
              Many more beautiful moments like this are coming for you in the new year!
            </div>
            <div className="message-subtext">
              Each day with you is a gift I treasure forever
            </div>
            <button className="close-final-button" onClick={handleCloseFinalMessage}>
              ✨ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GiftBox;
