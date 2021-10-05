import React from "react";
import Square from "./Square"

function Board({winLine, squares, onClick, r, c}) {
        const square =[];
        for (let i=0;i<r;i++){
            const row =[];
            for (let j=0;j<c;j++)
            row.push(renderSquare(squares,winLine,i*c+j,onClick));
            square.push(<div className="board-row">{row}</div>)
        }
        return square;
}

function renderSquare(squares, winLine,i,onClick) {
      return (
          <Square
              highlight={winLine && winLine.includes(i)}
              onClick={() => onClick(i)}
              value={squares[i]}
          />
    );
}

  export default Board;
