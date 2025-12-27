import { useState } from 'react';
import './CelebrationButton.css';

const CelebrationButton = ({ onClick }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent triggering screen click
    setIsPressed(true);
    onClick();
    
    setTimeout(() => setIsPressed(false), 300);
  };

  return (
    <button 
      className={`celebration-button ${isPressed ? 'pressed' : ''}`}
      onClick={handleClick}
    >
      <span className="button-content">
        <span className="sparkle">✨</span>
        Tap to Celebrate
        <span className="sparkle">✨</span>
      </span>
    </button>
  );
};

export default CelebrationButton;
