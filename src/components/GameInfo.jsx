import React from 'react';

const GameInfo = ({ isPlayerTurn, gameOver }) => {
  return (
    <div className="game-info">
      <p>{gameOver ? 'Juego Terminado' : `Turno de ${isPlayerTurn ? 'Jugador' : 'Computadora'}`}</p>
    </div>
  );
};

export default GameInfo;
