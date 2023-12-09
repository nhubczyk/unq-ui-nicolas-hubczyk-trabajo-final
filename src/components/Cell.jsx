import React from 'react';

const Cell = ({ value, onClick }) => {
  return (
    <div className={`cell ${value}`} onClick={onClick}>
      {/* Puedes mostrar contenido adicional según el valor de la celda */}
    </div>
  );
};

export default Cell;
