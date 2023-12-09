import React, { useEffect, useState } from 'react';

const ComputerPlayer = ({ computerBoard, isPlayerTurn, onComputerTurn }) => {
  const [shotsFired, setShotsFired] = useState([]);

  useEffect(() => {
    // Lógica para el turno de la computadora
    if (!isPlayerTurn) {
      const randomRow = Math.floor(Math.random() * computerBoard.length);
      const randomCol = Math.floor(Math.random() * computerBoard[0].length);

      // Verificar si la ubicación ya fue disparada antes
      const isShotAlreadyFired = shotsFired.some(
        (shot) => shot.row === randomRow && shot.col === randomCol
      );

      // Realizar el disparo y notificar al componente padre
      if (!isShotAlreadyFired) {
        onComputerTurn(randomRow, randomCol);
        setShotsFired([...shotsFired, { row: randomRow, col: randomCol }]);
      }
    }
  }, [isPlayerTurn, computerBoard, onComputerTurn, shotsFired]);

  return (
    <div className="computer-player">
      {/* Puedes agregar contenido adicional si es necesario */}
    </div>
  );
};

export default ComputerPlayer;
