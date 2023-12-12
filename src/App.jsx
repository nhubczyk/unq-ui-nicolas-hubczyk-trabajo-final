import React, { useEffect, useState } from 'react';
import Board from './components/Board';
import Cell from './components/Cell';
import Ship from './components/Ship';
import GameInfo from './components/GameInfo';
import ComputerPlayer from './components/ComputerPlayer';
import PlayerStats from './components/PlayerStats';
import Submarine from './components/Submarine';

import './styles/styles.css';

const App = () => {
  // Estado del juego
  const [playerBoard, setPlayerBoard] = useState([]);

  const [computerBoard, setComputerBoard] = useState([]);

  const [selectedShip, setSelectedShip] = useState(null);
  
  useEffect(() => {
    setPlayerBoard(Array(10).fill(null).map(() => Array(10).fill("empty")));
    setComputerBoard(Array(10).fill(null).map(() => Array(10).fill("empty")));
  },[])
  

  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [playerWins, setPlayerWins] = useState(0);
  const [computerWins, setComputerWins] = useState(0);
  useEffect(() => {
    if (gameOver) {
      alert("El juego ya ha terminado. Reinicie para jugar de nuevo.");
  }},[gameOver])

   // Función para manejar el clic en una celda del jugador durante la fase de selección de barcos
   const shipSelectPosition = (row, col) => {
    if (selectedShip) {
      // Clonar el tablero para evitar mutar directamente el estado
      const newPlayerBoard = [...playerBoard];

      // Verificar si las celdas están disponibles para el submarino
      const positionsOccupied = newPlayerBoard
        .slice(row, row + selectedShip.length)
        .every((r) => r[col] === "empty");

      if (positionsOccupied && row + selectedShip.length <= 10) {
        // Colocar el submarino en las posiciones
        for (let i = 0; i < selectedShip.length; i++) {
          newPlayerBoard[row + i][col] = selectedShip.name;
        }

        
        // Restablecer el estado del submarino seleccionado
        setSelectedShip(null);

        // Actualizar el estado del tablero del jugador
        setPlayerBoard(newPlayerBoard);

        // Cambiar el turno
        setIsPlayerTurn(false);

        // Lógica adicional según sea necesario
      } else {
        // El usuario seleccionó una posición inválida para el submarino
        alert("Posición inválida. Elija otra.");
      }
    }
  };

  //Funcion para que la computadora elija sus barcos.
  const handleSelectShipPosition = () => {
    const computerBoardCopy = [...computerBoard];
  
    const placeShip = (shipLength) => {
      let shipPlaced = false;
  
      while (!shipPlaced) {
        const randomRow = Math.floor(Math.random() * 10);
        const randomCol = Math.floor(Math.random() * (10 - shipLength + 1));
        
        // Verificar si las posiciones están disponibles
        const positionsOccupied = computerBoardCopy
          .slice(randomRow, randomRow + shipLength)
          .every((row) => row[randomCol] === "empty");
  
        if (positionsOccupied) {
          // Colocar el barco en las posiciones
          for (let i = 0; i < shipLength; i++) {
            computerBoardCopy[randomRow + i][randomCol] = "ship";
          }
  
          shipPlaced = true;
        }
      }
    };
  
    // Colocar cada tipo de barco
    placeShip(4); // Portaaviones
    placeShip(4); // Crucero
    placeShip(4); // Submarino
    placeShip(2); // Lancha
  
    // Restablecer el estado del tablero de la computadora con los barcos colocados
    setComputerBoard(computerBoardCopy);
  };

  // Función para manejar el turno de la computadora
  const handleComputerTurn = () => {
    // Lógica para que la computadora realice movimientos aleatorios y evite lugares ya seleccionados
    if (!gameOver && !isPlayerTurn) {
      let randomRow, randomCol;

      // Garantizar que la computadora elija una celda vacía
      do {
        randomRow = Math.floor(Math.random() * 10);
        randomCol = Math.floor(Math.random() * 10);
      } while (computerBoard[randomRow][randomCol] !== "empty");

      // Marcar la celda como seleccionada por la computadora
      const newComputerBoard = [...computerBoard];
      newComputerBoard[randomRow][randomCol] = "selected";  // Puedes usar un valor diferente si lo prefieres
      setComputerBoard(newComputerBoard);

      // Verificar si el jugador ganó
      if (checkGameOver(newComputerBoard)) {
        setGameOver(true);
        alert("¡Has ganado! Reinicie para jugar de nuevo.");
        setPlayerWins(playerWins + 1);
        return;
      }

      // Cambiar el turno
      setIsPlayerTurn(true);

      // Puedes agregar más lógica según sea necesario

      // Puedes agregar más lógica para determinar si el juego ha terminado
      // y actualizar el estado de gameOver en consecuencia (setGameOver(true))
    }
  };

  // Función para verificar si el juego ha terminado
  const checkGameOver = (board) => {
    // Implementa la lógica para verificar si el juego ha terminado
    // Por ejemplo, puedes verificar si todos los barcos han sido hundidos
    // o si se cumplen otras condiciones específicas del juego
    // Retorna true si el juego ha terminado, false de lo contrario
    return false;  // Debes ajustar esto según la lógica específica del juego
  };

  // Función para iniciar un nuevo juego
  const startNewGame = () => {
    // Lógica para reiniciar el estado del juego
    // Puedes reiniciar el estado del tablero del jugador y la computadora aquí
    setPlayerBoard(Array(10).fill(null).map(() => Array(10).fill("empty")));
    setComputerBoard(Array(10).fill(null).map(() => Array(10).fill("empty")));
    setIsPlayerTurn(true);
    setGameOver(false);
  };

  return (
    <div>
      <h1>Juego de Batalla Naval</h1>
      <div className="game-container">
        <div className="board-container">
          <Board board={playerBoard} onClick={shipSelectPosition} />
        </div>
        <div className="ships-container">
          {/* Muestra los barcos al lado del tablero */}
          <Submarine 
          isInBoard={selectedShip !== null}
          onSelect={() => setSelectedShip({ name: 'submarine', length: 4 })} />
        </div>
      </div>
      {/* ... (otros componentes y lógica) */}
      <ComputerPlayer computerBoard={computerBoard} isPlayerTurn={isPlayerTurn} onComputerTurn={handleComputerTurn} />
      {/* ... (otros componentes y lógica) */}
      <PlayerStats wins={playerWins} />
      <PlayerStats wins={computerWins} />
      <button onClick={startNewGame}>Reiniciar Juego</button>
    </div>
  );
};

export default App;

