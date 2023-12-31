import React from 'react';
import Cell from './Cell';
import Ship from './Ship';

const calculateShipImage = ( board, rowIndex, colIndex ) => {
  if (colIndex >= 0 && rowIndex >= 0 && board[rowIndex][colIndex] !== "empty"){
    const shipType = board[rowIndex][colIndex];
    if ( (rowIndex == 0 || board[rowIndex - 1][colIndex] !== shipType) && (colIndex == 0 || board[rowIndex][colIndex -1] !== shipType)){
      if (rowIndex + 1 <= 10 && board[rowIndex + 1][colIndex] === shipType) {
        return {height: 1, width: 4};
      }
      else {
        return {height: 4, width: 1 };
      }
    }
  }
  return null;
};

const Board = ({ board, computerBoard, onClick }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cellValue, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              value={cellValue}
              computerValue={computerBoard[rowIndex][colIndex]}
              onClick={() => onClick(rowIndex, colIndex)}
              headShip={calculateShipImage(board, rowIndex, colIndex)}
            >
              {cellValue === 'ship' && (
                <Ship
                  length={3} 
                  orientation="horizontal" 
                  position={{ top: `${rowIndex * 40}px`, left: `${colIndex * 40}px` }} 
                />
              )}
            </Cell>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;


