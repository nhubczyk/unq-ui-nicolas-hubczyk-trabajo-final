import React from 'react';

const PlayerStats = ({ wins, texto }) => {
  return (
    <div className="player-stats">
      <div className="player-stats-text">{texto}</div>
      <div>{wins}</div>
    </div>
  );
};

export default PlayerStats;
