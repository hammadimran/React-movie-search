import React,{useState} from 'react';
import ReactDOM from 'react-dom';

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

class Square extends React.Component {
  // Square component that is used to render each square
  // It get the value inside and also onclick handler as props 
  render() {
  return (
    <div
      className="square"
      onClick={this.props.onClickSquare}
      style={squareStyle}>
      {this.props.valueInsideSquare}
    </div>
  );
}
}

function Board() {
  
  // use state isXTurn and setState setXTurn
  //isXTurn is used to identify who does the next turn
  const [isXTurn, setXTurn] = useState(true);

  // use state square and setState setsqaure
  // square is used to for the values of the blocks
  // In the start we fill all the sqare with null value
  const [squares, setsqaures] = useState(Array(9).fill(null));
  
  // Determine all the winning combinations
  const getwinnerCombinations = () => {
      const winnerCombinations = [
         [0, 1, 2], 
         [3, 4, 5], 
         [6, 7, 8], 
         [0, 3, 6], 
         [1, 4, 7], 
         [2, 5, 8], 
         [0, 4, 8], 
         [2, 4, 6], 
      ];
      // Iterate through all the boxes and check if they match the winner combination
      for(let i=0; i<winnerCombinations.length; i++) {
        let [box1, box2, box3] = winnerCombinations[i];
        if (squares[box1] && squares[box1] === squares[box2] && 
          squares[box2] === squares[box3]) { 
            return squares[box1];
          }
      } 
      return false;
  } 

// reset method to fill all the squares with null and start turn from X
  const reset = () => {
      setsqaures(Array(9).fill(null));
      setXTurn(true);
  }

  // This function is executed when a player makes a move
  const move = (boxNumber) => {
    // if the player has won return
    if (squares[boxNumber] || getwinnerCombinations()) return;

    // make temporay square
    const temp = [...squares];
    // Check whose turn it is and set the label accordingly
    temp[boxNumber] = isXTurn ? 'X' : 'O';
    // set the temporary square to the original one and toggle the turn
    setsqaures(() => temp);
    setXTurn(() => !isXTurn);
  }


    //Change the next turn using the isXTurn state variable
    // Change the winner value using the getwinnerCombinations
    //for each sqaure pass the value inside
    // and pass the onClickHandler
  return (
    <div style={containerStyle} className="gameBoard">
      <div className="status" style={instructionsStyle}>Next player: { isXTurn ? 'X' : '0' }</div>
      <div className="winner" style={instructionsStyle}>Winner: { getwinnerCombinations() || 'None' }</div>
      <button onClick={reset} style={buttonStyle}>Reset</button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square valueInsideSquare={squares[0]} onClickSquare={() => move(0)} />
          <Square valueInsideSquare={squares[1]} onClickSquare={() => move(1)} />
          <Square valueInsideSquare={squares[2]} onClickSquare={() => move(2)} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square valueInsideSquare={squares[3]} onClickSquare={() => move(3)} />
          <Square valueInsideSquare={squares[4]} onClickSquare={() => move(4)} />
          <Square valueInsideSquare={squares[5]} onClickSquare={() => move(5)} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square valueInsideSquare={squares[6]} onClickSquare={() => move(6)} />
          <Square valueInsideSquare={squares[7]} onClickSquare={() => move(7)} />
          <Square valueInsideSquare={squares[8]} onClickSquare={() => move(8)} />
        </div>
      </div>
    </div>
  );
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);