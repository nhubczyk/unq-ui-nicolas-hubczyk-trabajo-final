import React from 'react';
import Cell from './Cell';
import Ship from './Ship';

const Board = ({ board, onClick }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cellValue, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              value={cellValue}
              onClick={() => onClick(rowIndex, colIndex)}
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


