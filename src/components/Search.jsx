import React, { useState } from 'react';

import '../styles/Search.css';

export default function Search({ searchCity }) {
  const [currentCity, setCurrentCity] = useState('');

  function handleInputChange(event) {
    setCurrentCity(event.target.value);
  }

  function handleButtonClick() {
    if (currentCity.trim() === '') return;
    searchCity(currentCity);
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') handleButtonClick();
  }

  return (
    <div className="Search">
      <label className="Search__label">
        <input
          className="Search__input"
          value={currentCity}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </label>

      <button className="Search__button" onClick={handleButtonClick}>
        <img
          width={30}
          height={25}
          src="https://img.icons8.com/ios-filled/50/000000/search--v2.png"
          alt=""
        />
      </button>
    </div>
  );
}
