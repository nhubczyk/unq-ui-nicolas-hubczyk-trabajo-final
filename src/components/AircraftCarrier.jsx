import aircraftCarrierImage from '../image/portaAviones.png';
import React, { useEffect, useState } from 'react';

const AircraftCarrier = ({ isSelected, onSelect }) => {
    return (
      <div>
        {isSelected ? (
          <img className="ship-image" src={aircraftCarrierImage} alt="AircraftCarrier" />
        ) : (
          <button onClick={onSelect}>Seleccionar Porta Aviones</button>
        )}
      </div>
    );
};
  
export default AircraftCarrier;