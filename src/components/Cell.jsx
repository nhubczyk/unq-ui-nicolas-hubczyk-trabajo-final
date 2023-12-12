import React, { useEffect, useState } from 'react';
import submarineImage from '../image/submarino.png';

const Cell = ({ value, onClick, headShip}) => {
  const [ship, setShip] = useState(null);
  useEffect(() => {
    if (headShip) {
      setShip(headShip);
    }
  },[headShip])
  
  return (
    <div className={`cell ${value}`} onClick={onClick}>
      {ship && <img style={{height: ship.height * 40, width: ship.width * 44, marginLeft: ship.width * 33}} src={submarineImage} alt="Submarine" className="cell-ship-image"/>}
    </div>
  );
};

export default Cell;
