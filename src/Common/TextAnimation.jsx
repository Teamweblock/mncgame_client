
import React, { useState, useEffect } from 'react';


const TextAnimation = ({ text, speed = 100, className }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (typeof text === 'string' && text.length > 0) {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText((prev) => prev + text[index]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    } else {
      // Clear displayed text if text is not valid
      setDisplayedText('');
    }
  }, [text, speed]);

  // Render nothing if text is undefined
  if (typeof text === 'undefined') {
    return null;
  }

  return <h1 className="welcome-text1">{displayedText}</h1>;
};

export default TextAnimation;
