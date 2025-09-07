// src/hooks/useTypingEffect.js

import { useState, useEffect } from 'react';

const useTypingEffect = (textToType, typingSpeed = 200) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Reset the effect if the text to type changes
    setDisplayedText('');
    setCurrentIndex(0);
  }, [textToType]);

  useEffect(() => {
    if (currentIndex < textToType.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prevText) => prevText + textToType[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, typingSpeed);

      // Cleanup function to clear the timeout if the component unmounts
      return () => clearTimeout(timeoutId);
    }
  }, [currentIndex, textToType, typingSpeed]);

  return displayedText;
};

export default useTypingEffect;