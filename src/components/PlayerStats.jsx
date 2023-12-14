import React from 'react';

const PlayerStats = ({ wins, texto }) => {
  return (
    <div className="player-stats">
      <h2>{texto}</h2>
      <p>Victorias: {wins}</p>
    </div>
  );
};

export default PlayerStats;
