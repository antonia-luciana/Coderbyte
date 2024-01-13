import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

function Square({status, onClick}) {

  return (
    <div
      className="square"
      style={squareStyle}
      onClick={onClick}
    >
    {status ? status : ''}
    </div>
  );
}

const initialBoardState = Array.from({length: 3}, (_, i) => [0, 0, 0])

function Board() {
  const [player, setPlayer] = useState('X');
  const [board, setBoard] = useState(initialBoardState);
  const [winner, setWinner] = useState(null);
  const [start, setStart] = useState(true);

  useEffect(() => {
    if (!start) {
      checkWinner();
      if (!winner) {
        nextPlayerTurn();
      }
    }
  }, [board])

  const checkWinner = () => {
    for (let i=0; i<board.length; i++) {
      console.log(i);
      if (board[i][0] !== 0 && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        setWinner(player);
      }
      if (board[0][i] !== 0 && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        setWinner(player);
      }
      if (i===0 && board[i][i] && board[i][i] === board[i+1][i+1] && board[i+1][i+1] === board[i+2][i+2]) {
        setWinner(player);
      }
      if (i === 0 && board[i][2-i] && board[i][2-i] === board[i+1][i+1] && board[i+1][i+1] === board[2-i][i]) {
        setWinner(player);
      }
    }
  }

  const nextPlayerTurn = () => setPlayer(player === 'X' ? 'O' : 'X');

  const handleClick = (i, j) => {
    if (!winner) {
      const newBoard = JSON.parse(JSON.stringify(board)); //Deep copy
      newBoard[i][j] = newBoard[i][j] ? newBoard[i][j] : player;
      setBoard(newBoard);
      setStart(false);
    }
  }

  const reset = () => {
    setBoard(initialBoardState);
    setStart(true);
    setWinner(null);
  }

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>X</span></div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>
        Winner: <span>{winner ? winner : ''}</span>
      </div>
      <button style={buttonStyle} onClick={reset}>Reset</button>
      <div style={boardStyle}>
        {board ? board.map((row, i) => (
          <div key={`row-${i}`} className="board-row" style={rowStyle}>
            {row.map((column, j) => <Square 
              key={`square-${i}-${j}`} 
              status={column}
              onClick={() => handleClick(i,j)}
            /> )}
          </div>
        )) : ''}
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Game />);