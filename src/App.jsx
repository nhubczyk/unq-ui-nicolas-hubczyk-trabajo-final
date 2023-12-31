import React, { useEffect, useState } from 'react';
import Board from './components/Board';
import Cell from './components/Cell';
import Ship from './components/Ship';
import GameInfo from './components/GameInfo';
import ComputerPlayer from './components/ComputerPlayer';
import PlayerStats from './components/PlayerStats';
import Submarine from './components/Submarine';
import Cruise from './components/Cruise';
import AircraftCarrier from './components/AircraftCarrier';
import TorpedoBoat from './components/TorpedoBoat';
import './styles/styles.css';
import BoardComputer from './components/BoardComputer';

const App = () => {
  // Estado del juego
  const [playerBoard, setPlayerBoard] = useState([]);
  const [computerBoard, setComputerBoard] = useState([]);
  const [selectedShip, setSelectedShip] = useState(null);
  const [selectedOrientation, setSelectedOrientation] = useState('horizontal');
  const [playerGuessBoard, setPlayerGuessBoard] = useState([]);
  const [computerGuessBoard, setComputerGuessBoard] = useState([]);
  const [points, setPoints] = useState(0);
  const [pointsComputer, setPointsComputer] = useState(0);
  
  useEffect(() => {
    setPlayerBoard(Array(10).fill(null).map(() => Array(10).fill("empty")));
    setComputerBoard(Array(10).fill(null).map(() => Array(10).fill("empty")));
    setPlayerGuessBoard(Array(10).fill(null).map(() => Array(10).fill("empty")));
    setComputerGuessBoard(Array(10).fill(null).map(() => Array(10).fill("empty")));
  },[])
  

  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [playerWins, setPlayerWins] = useState(0);
  const [computerWins, setComputerWins] = useState(0);
  useEffect(() => {
    if (gameOver) {
      alert("El juego ya ha terminado. Reinicie para jugar de nuevo.");
  }},[gameOver])

  const handleClick = (rowIndex, colIndex) => {
    const newPlayerGuessBoard = [...playerGuessBoard];
  
    if (playerGuessBoard[rowIndex][colIndex] === 'empty') {
      if (computerBoard[rowIndex][colIndex] !== 'empty') {
        newPlayerGuessBoard[rowIndex][colIndex] = 'red';
        setPoints(points + 1);
      } else {
        newPlayerGuessBoard[rowIndex][colIndex] = 'blue';
      }
      setPlayerGuessBoard(newPlayerGuessBoard);
    } else {
      alert("Ya hiciste click en esta celda");
    }

    setIsPlayerTurn(false);
  };

  useEffect(() => {
    if (!isPlayerTurn) {
      handleComputerTurn();
  }},[isPlayerTurn])


   // Función para manejar el clic en una celda del jugador durante la fase de selección de barcos
   const shipSelectPosition = (row, col) => {
    if (selectedShip) {
      const newPlayerBoard = [...playerBoard];
      const positionsOccupied = calculatePositionsOccupied(newPlayerBoard, row, col, selectedShip.length, selectedOrientation);

      if (("vertical" == selectedOrientation && positionsOccupied && row + selectedShip.length < 10) 
            || ("horizontal" == selectedOrientation && positionsOccupied && col + selectedShip.length < 10)) {
        for (let i = 0; i < selectedShip.length; i++) {
          if (selectedOrientation === 'vertical') {
            newPlayerBoard[row][col + i] = selectedShip.name;
          } else {
            newPlayerBoard[row + i][col] = selectedShip.name;
          }
        }
        setSelectedShip(null);
        setPlayerBoard(newPlayerBoard);
      } else {
        alert("Posición inválida. Elija otra.");
      }
    }
  };

  const calculatePositionsOccupied = (board, row, col, length, orientation) => {
    if (orientation !== 'vertical') {
      return board[row].slice(col, col + length).every((c) => c === 'empty')
    }else {
      return board.slice(row, row + length).every((r) => r[col] === 'empty')
    }
  };

// Funcion para que la computadora elija sus barcos.
const handleSelectShipPosition = () => {
  const computerBoardCopy = Array(10).fill(null).map(() => Array(10).fill("empty"));

  const placeShip = (shipLength) => {
    let shipPlaced = false;

    while (!shipPlaced) {
      const isHorizontal = Math.random() > 0.5;
      var randomRow = 0;
      var randomCol = 0;
      if (isHorizontal) {
        randomCol = Math.floor(Math.random() * (10 - shipLength + 1));
        randomRow = Math.floor(Math.random() * 10);
      }else {
        randomCol = Math.floor(Math.random() * 10);
        randomRow = Math.floor(Math.random() * (10 - shipLength + 1));
      }

      const orientacion = isHorizontal ? "horizontal" : "vertical";
      const positionsOccupied = calculatePositionsOccupied(computerBoardCopy, randomRow, randomCol, shipLength, orientacion);
      if (positionsOccupied) {
        // Colocar el barco en las posiciones
        for (let i = 0; i < shipLength; i++) {
          if (!isHorizontal) {
            computerBoardCopy[randomRow + i][randomCol] = "ship";
          }else {
            computerBoardCopy[randomRow][randomCol + i] = "ship";
          }
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

  useEffect(() => {
    if (pointsComputer >= 14) {
        setGameOver(true);
        alert("¡Gano la computadora! Reinicie para jugar de nuevo.");
        setComputerWins(computerWins + 1);
        return;
    }
    },[pointsComputer])

    useEffect(() => {
      if (points >= 14) {
        setGameOver(true);
        alert("¡Ganaste el juego! Reinicie para jugar de nuevo.");
        setPlayerWins(playerWins + 1);
        return;
      }
    },[points])

  // Función para manejar el turno de la computadora
  const handleComputerTurn = () => {
    if (!gameOver && !isPlayerTurn) {
      let randomRow, randomCol;

      // Garantizar que la computadora elija una celda vacía
      do {
        randomRow = Math.floor(Math.random() * 10);
        randomCol = Math.floor(Math.random() * 10);
      } while (computerGuessBoard[randomRow][randomCol] !== "empty");

      const newComputerBoard = [...computerGuessBoard];
      if (playerBoard[randomRow][randomCol] === "empty") {
        newComputerBoard[randomRow][randomCol] = "blue";
      }
      else {
        newComputerBoard[randomRow][randomCol] = "red";
        setPointsComputer(pointsComputer + 1);
      }
      setComputerGuessBoard(newComputerBoard);

      setIsPlayerTurn(true);
    }
  };

  // Función para iniciar un nuevo juego
  const startNewGame = () => {
    setPlayerBoard(Array(10).fill(null).map(() => Array(10).fill("empty")));
    setComputerBoard(Array(10).fill(null).map(() => Array(10).fill("empty")));
    setPlayerGuessBoard(Array(10).fill(null).map(() => Array(10).fill("empty")));
    setComputerGuessBoard(Array(10).fill(null).map(() => Array(10).fill("empty")));
    handleSelectShipPosition();
    setIsPlayerTurn(true);
    setGameOver(false);
  };

  useEffect(() => {
    handleSelectShipPosition();
  },[])

  return (
    <div>
      <h1 className='title-name'>Juego de Batalla Naval</h1>
      <div className="game-container">
        <div className="board-container">
          <Board board={playerBoard} computerBoard={computerGuessBoard} onClick={shipSelectPosition} />
        </div>
        <div className="ships-container">
          {/* Muestra los barcos al lado del tablero */}
          <Submarine 
          isSelected={selectedShip !== null && selectedShip.name == 'submarine'}
          onSelect={() => setSelectedShip({ name: 'submarine', length: 4 })} />
          <Cruise 
          isSelected={selectedShip !== null && selectedShip.name == 'cruise'}
          onSelect={() => setSelectedShip({ name: 'cruise', length: 4 })} />
          <AircraftCarrier
          isSelected={selectedShip !== null && selectedShip.name == 'aircraftcarrier'}
          onSelect={() => setSelectedShip({ name: 'aircraftcarrier', length: 4 })} />
          <TorpedoBoat
          isSelected={selectedShip !== null && selectedShip.name == 'torpedoboat'}
          onSelect={() => setSelectedShip({ name: 'torpedoboat', length: 2 })} />
        </div>
        <div>
            <label>Orientación:</label>
            <select
              value={selectedOrientation}
              onChange={(e) => setSelectedOrientation(e.target.value)}
            >
              <option value="horizontal">Horizontal</option>
              <option value="vertical">Vertical</option>
            </select>
          </div>
          <div className="board-container">
            {playerGuessBoard && <BoardComputer boardComputer={playerGuessBoard} onClick={handleClick} />}
          </div>
      </div>
      <div>
      <div className="player-stats-container">
        <PlayerStats wins={playerWins} texto={"Victorias del jugador"} />
        <PlayerStats wins={computerWins} texto={"Victorias de la computadora"}/>
      </div>
      <div className="restart-button-container">
        <button onClick={startNewGame}>Reiniciar Juego</button>
      </div>
    </div>
  </div>
  );
};

export default App;

