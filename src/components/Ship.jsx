import React from 'react';

const Ship = ({ length, orientation, position }) => {
  const renderShip = () => {
    const shipStyle = {
      width: orientation === 'horizontal' ? `${length * 40}px` : '40px',
      height: orientation === 'vertical' ? `${length * 40}px` : '40px',
      backgroundColor: 'blue', 
    };

    return <div className="ship" style={shipStyle}></div>;
  };

  return (
    <div className={`ship-container ${orientation}`} style={position}>
      {renderShip()}
    </div>
  );
};

export default Ship;
