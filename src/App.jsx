import React, { useState } from 'react';
import Board from './components/Board';
import Cell from './components/Cell';
import Ship from './components/Ship';
import GameInfo from './components/GameInfo';
import ComputerPlayer from './components/ComputerPlayer';
import PlayerStats from './components/PlayerStats';  // Importa PlayerStats

import './styles/styles.css';

const App = () => {
  // Estado del juego
  const [playerBoard, setPlayerBoard] = useState([
    Array(10).fill(null).map(() => Array(10).fill("empty")),
  ]);

  const [computerBoard, setComputerBoard] = useState([
    Array(10).fill(null).map(() => Array(10).fill("empty")),
  ]);

  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [playerWins, setPlayerWins] = useState(0);
  const [computerWins, setComputerWins] = useState(0);

  // Función para manejar el clic en una celda del jugador
  const handlePlayerCellClick = (row, col) => {
    // Verificar si el juego ya terminó
    if (gameOver) {
      alert("El juego ya ha terminado. Reinicie para jugar de nuevo.");
      return;
    }

    // Clonar el tablero para evitar mutar directamente el estado
    const newPlayerBoard = [...playerBoard];

    // Verificar si la celda ya ha sido seleccionada
    if (newPlayerBoard[row][col] === "empty") {
      // Marcar la celda como "ship" para indicar la posición del barco
      newPlayerBoard[row][col] = "ship";
    } else {
      // El jugador seleccionó una celda ya seleccionada, no hacer nada
      alert("Ya has seleccionado esta celda. Elige otra.");
      return;
    }

    // Actualizar el estado del tablero del jugador
    setPlayerBoard(newPlayerBoard);

    // Verificar si la computadora ganó
    if (checkGameOver(newPlayerBoard)) {
      setGameOver(true);
      alert("¡La computadora ganó! Reinicie para jugar de nuevo.");
      setComputerWins(computerWins + 1);
      return;
    }

    // Cambiar el turno
    setIsPlayerTurn(false);

    // Lógica adicional según sea necesario

    // Puedes agregar más lógica para determinar si el juego ha terminado
    // y actualizar el estado de gameOver en consecuencia (setGameOver(true))
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
      <Board board={playerBoard} onClick={handlePlayerCellClick} />
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

