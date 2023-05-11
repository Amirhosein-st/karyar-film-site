import React from 'react';
import './IconModal.css';

const IconModal = ({ isOpen, onClose, onSelectIcon }) => {
  const icons = [
    { id: 1, gender: 'man' },
    { id: 2, gender: 'woman' },
    { id: 3, gender: 'man' },
    { id: 4, gender: 'woman' },
    { id: 5, gender: 'man' },
    { id: 6, gender: 'woman' },
    { id: 7, gender: 'man' },
    { id: 8, gender: 'woman' },
    { id: 9, gender: 'man' },
    { id: 10, gender: 'woman' },
    { id: 11, gender: 'man' },
    { id: 12, gender: 'woman' }
  ];

  const handleSelectIcon = (id) => {
    onSelectIcon(id);
    onClose();
  };

  return (
    <div className={`icon-modal ${isOpen ? 'open' : ''}`}>
      <div className="icon-modal-content">
        <button onClick={onClose} className="close-modal">
          &times;
        </button>
        <h2>Select your icon:</h2>
        <div className="icons-container">
          <div className="man-icons">
            <h3>Man</h3>
            {icons
              .filter((icon) => icon.gender === 'man')
              .map((icon) => (
                <div
                  key={icon.id}
                  className="bar-2"
                  id={icon.id}
                  onClick={() => handleSelectIcon(icon.id)}
                ></div>
              ))}
          </div>
          <div className="woman-icons">
            <h3>Woman</h3>
            {icons
              .filter((icon) => icon.gender === 'woman')
              .map((icon) => (
                <div
                  key={icon.id}
                  className="bar-3"
                  id={icon.id}
                  onClick={() => handleSelectIcon(icon.id)}>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconModal;