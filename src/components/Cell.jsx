import React, { useEffect, useState } from 'react';
import submarineImage from '../image/submarino.png';
import cruiseImage from '../image/imagenCruzero.png';
import aircraftCarrierImage from '../image/portaAviones.png';
import torpedoBoatImage from '../image/lanchaDeTorpedos.png';

const Cell = ({ value, computerValue, onClick, headShip}) => {
  const [ship, setShip] = useState(null);
  const [isVertical, setIsVertical] = useState(null);
  const shipImageDictionary = {
    "submarine" : submarineImage, 
    "cruise" : cruiseImage,
    "aircraftcarrier" : aircraftCarrierImage,
    "torpedoboat" : torpedoBoatImage,
  }

  useEffect(() => {
    if (headShip) {
      setShip(headShip);
      setIsVertical(headShip.height > headShip.width);
    }
  },[headShip])

  return (
    <div className={`cell ${computerValue}`} onClick={onClick}>
      {ship && <img style={{height: isVertical ? 41.5: 40, width: isVertical ? ship.height * 41.5: ship.width * 44, marginLeft: ! (isVertical) && ship.width * 33, marginTop: isVertical && ship.height * 31.5, transform: isVertical && "rotate(90deg)"}} 
          src={shipImageDictionary[value]} alt={value} className="cell-ship-image"/>}
    </div>
  );
};

export default Cell;
