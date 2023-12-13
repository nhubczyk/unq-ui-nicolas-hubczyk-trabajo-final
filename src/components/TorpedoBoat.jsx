import torpedoBoatImage from '../image/lanchaDeTorpedos.png';
import React, { useEffect, useState } from 'react';

const TorpedoBoat = ({ isSelected, onSelect }) => {
    return (
      <div>
        {isSelected ? (
          <img className="ship-image" src={torpedoBoatImage} alt="TorpedoBoat" />
        ) : (
          <button onClick={onSelect}>Seleccionar Lancha de Torpedos</button>
        )}
      </div>
    );
};

export default TorpedoBoat;