import cruiseImage from '../image/imagenCruzero.png';
import React, { useEffect, useState } from 'react';

const Cruise = ({ isSelected, onSelect }) => {
    return (
      <div>
        {isSelected ? (
          <img className="ship-image" src={cruiseImage} alt="Cruise" />
        ) : (
          <button onClick={onSelect}>Seleccionar Cruzero</button>
        )}
      </div>
    );
};
  
export default Cruise;