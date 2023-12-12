import submarineImage from '../image/submarino.png';
import React, { useEffect, useState } from 'react';

const Submarine = ({ isSelected, onSelect }) => {
    return (
      <div>
        {isSelected ? (
          <img className="ship-image" src={submarineImage} alt="Submarine" />
        ) : (
          <button onClick={onSelect}>Seleccionar Submarino</button>
        )}
      </div>
    );
};
  
export default Submarine;
