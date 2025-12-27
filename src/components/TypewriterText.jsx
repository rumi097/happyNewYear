import { useState, useEffect } from 'react';
import './TypewriterText.css';

const TypewriterText = ({ text, className, delay = 0, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Initial delay before starting
    const delayTimer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, isVisible, text, speed]);

  if (!isVisible) return null;

  return (
    <div className={`typewriter-text ${className}`}>
      {displayedText}
      {currentIndex < text.length && <span className="cursor">|</span>}
    </div>
  );
};

export default TypewriterText;
