import React, {useState} from "react";
import Board from "./Board"
import calculateWinner from "./calculateWinner"



function Game(){
  const[history, setHistory] = useState([
    {
      squares: Array(1000).fill(null),
      row: Array(1000).fill(null),
      col: Array(1000).fill(null)
    }
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext]  = useState(true);
  const [row, setRow] = useState(9);
  const [col, setCol] = useState(9);
  const [iRow, setIRow] = useState(9);
  const [iCol, setICol] = useState(9);

  function handleClick(i) {
    const currentHistory = history.slice(0, stepNumber + 1)
    const current = currentHistory[currentHistory.length-1];
    const squares = current.squares.slice();

    if (calculateWinner(squares, stepNumber, row, col, 5).winner || squares[i]) {
      return;
    }
    squares[i] =  xIsNext ? "X" : "O";
    setHistory(currentHistory.concat([
      {
        squares: squares,
        row: Math.floor(i/col),
        col: Math.floor(i%col)
      }]));
    setStepNumber(currentHistory.length);
    setXIsNext(!xIsNext);
    
  }

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext(step%2 ===0);
  }

  function settingRow(event){
    setIRow(event.target.value);
  }

  function settingCol(event){
    setICol(event.target.value);
  }

  function restart(){
    setHistory([
      {
        squares: Array(1000).fill(null),
        row: Array(1000).fill(null),
        col: Array(1000).fill(null)
      }
    ]);
    setStepNumber(0);
    setXIsNext(true);
    setRow(iRow);
    setCol(iCol);
  }
  const current = history[stepNumber];
  const winInfo = calculateWinner(current.squares, stepNumber, row, col, 5);
  const winner = winInfo.winner;
  const line = winInfo.line;
  

  const moves = history.map((step, move) => {
  const desc = move ?
    'Go to move #' + move + '('+step.col+','+step.row+')':
    'Go to game start';
    return (
      <li key={move}>
      <button
        className={move === stepNumber ? 'move-list-item-selected' : ''}
                onClick={() => jumpTo(move)}>{desc}
      </button>
      </li>
    );
  });
  
  let status;
  if (winner) {
    if (winner === "D")
      status = "Draw";
    else
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }
  
  return (
      <div className="game">
        <div className="setting">
          <label className="title">row</label>
          <input type="number" min="5" max="20" className="input" onChange={settingRow}/>
          <label className="title">column</label>
          <input type="number" min="5" max="20" className="input" onChange={settingCol}/>
          <input type="button" value="restart" onClick={() => restart()} className="input"/>
        </div>
        <div className="game-board">
          <Board
            winLine={line}
            squares={current.squares}
            onClick={i => handleClick(i)}
            r={row}
            c={col}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
  );
}
  

  export default Game;

