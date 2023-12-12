import React, { useEffect, useState } from 'react';
import submarineImage from '../image/submarino.png';
import cruiseImage from '../image/imagenCruzero.png';

const Cell = ({ value, onClick, headShip}) => {
  const [ship, setShip] = useState(null);
  const shipImageDictionary = {
    "submarine" : submarineImage, 
    "cruise" : cruiseImage,
  }

  useEffect(() => {
    if (headShip) {
      setShip(headShip);
    }
  },[headShip])

  return (
    <div className={`cell ${value}`} onClick={onClick}>
      {ship && <img style={{height: ship.height * 40, width: ship.width * 44, marginLeft: ship.width * 33}} src={shipImageDictionary[value]} alt={value} className="cell-ship-image"/>}
    </div>
  );
};

export default Cell;
