import React from 'react';

const PlayerStats = ({ wins }) => {
  return (
    <div className="player-stats">
      <h2>Estadísticas del Jugador</h2>
      <p>Victorias: {wins}</p>
    </div>
  );
};

export default PlayerStats;
