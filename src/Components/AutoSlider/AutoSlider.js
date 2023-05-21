import React, { useState, useEffect } from 'react';
import './AutoSlider.css';

function AutoSlider({ cards }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex(activeIndex === cards.length - 1 ? 0 : activeIndex + 1);
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [activeIndex, cards.length]);

  return (
    <div className="auto-slider">
      <div className="auto-slider-wrapper">
        <div className="auto-slider-container" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {cards.map((card, index) => (
            <div className="auto-slider-card" key={index}>
              <img src={card.image} alt={card.title} />
              <h2>{card.title}</h2>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AutoSlider;