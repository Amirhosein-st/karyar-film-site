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
  }, [activeIndex]);

//   const handlePrevClick = () => {
//     setActiveIndex(activeIndex === 0 ? cards.length - 1 : activeIndex - 1);
//   };

//   const handleNextClick = () => {
//     setActiveIndex(activeIndex === cards.length - 1 ? 0 : activeIndex + 1);
//   };

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
        {/* <button className="auto-slider-prev" onClick={handlePrevClick}>
          Prev
        </button>
        <button className="auto-slider-next" onClick={handleNextClick}>
          Next
        </button> */}
      </div>
    </div>
  );
}

export default AutoSlider;