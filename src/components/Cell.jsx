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
    <div className={`cell ${computerValue} ${value}`} onClick={onClick}>
    </div>
  );
};

export default Cell;
