import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}    
          {this.renderSquare(6)}         
        </div>
        <div className="board-row">
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}    
          {this.renderSquare(13)}  
        </div>
        <div className="board-row">
          {this.renderSquare(14)}
          {this.renderSquare(15)}
          {this.renderSquare(16)}
          {this.renderSquare(17)}
          {this.renderSquare(18)}
          {this.renderSquare(19)}    
          {this.renderSquare(20)}  
        </div>
        <div className="board-row">
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
          {this.renderSquare(24)}
          {this.renderSquare(25)}
          {this.renderSquare(26)}    
          {this.renderSquare(27)}  
        </div>
          <div className="board-row">
          {this.renderSquare(28)}
          {this.renderSquare(29)}
          {this.renderSquare(30)}
          {this.renderSquare(31)}
          {this.renderSquare(32)}
          {this.renderSquare(33)}    
          {this.renderSquare(34)}  
        </div>
        <div className="board-row">
          {this.renderSquare(35)}
          {this.renderSquare(36)}
          {this.renderSquare(37)}
          {this.renderSquare(38)}
          {this.renderSquare(39)}
          {this.renderSquare(40)}    
          {this.renderSquare(41)}  
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(42).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "R" : "B";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "Red" : "Blue");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [0+(1*1), 1+(1*1), 2+(1*1), 3+(1*1)],
    [1+(1*1), 2+(1*1), 3+(1*1), 4+(1*1)],
    [2+(1*1), 3+(1*1), 4+(1*1), 5+(1*1)],
    [3+(1*1), 4+(1*1), 5+(1*1), 6+(1*1)],
    [4+(1*1), 5+(1*1), 6+(1*1), 7+(1*1)],
 
    [0+(1*2), 1+(1*2), 2+(1*2), 3+(1*2)],
    [1+(1*2), 2+(1*2), 3+(1*2), 4+(1*2)],
    [2+(1*2), 3+(1*2), 4+(1*2), 5+(1*2)],
    [3+(1*2), 4+(1*2), 5+(1*2), 6+(1*2)],
    [4+(1*2), 5+(1*2), 6+(1*2), 7+(1*2)],

    [0+(1*3), 1+(1*3), 2+(1*3), 3+(1*3)],
    [1+(1*3), 2+(1*3), 3+(1*3), 4+(1*3)],
    [2+(1*3), 3+(1*3), 4+(1*3), 5+(1*3)],
    [3+(1*3), 4+(1*3), 5+(1*3), 6+(1*3)],
    [4+(1*3), 5+(1*3), 6+(1*3), 7+(1*3)],

    [0+(1*4), 1+(1*4), 2+(1*4), 3+(1*4)],
    [1+(1*4), 2+(1*4), 3+(1*4), 4+(1*4)],
    [2+(1*4), 3+(1*4), 4+(1*4), 5+(1*4)],
    [3+(1*4), 4+(1*4), 5+(1*4), 6+(1*4)],
    [4+(1*4), 5+(1*4), 6+(1*4), 7+(1*4)],

    [0+(1*5), 1+(1*5), 2+(1*5), 3+(1*5)],
    [1+(1*5), 2+(1*5), 3+(1*5), 4+(1*5)],
    [2+(1*5), 3+(1*5), 4+(1*5), 5+(1*5)],
    [3+(1*5), 4+(1*5), 5+(1*5), 6+(1*5)],
    [4+(1*5), 5+(1*5), 6+(1*5), 7+(1*5)],

    [0+(1*6), 1+(1*6), 2+(1*6), 3+(1*6)],
    [1+(1*6), 2+(1*6), 3+(1*6), 4+(1*6)],
    [2+(1*6), 3+(1*6), 4+(1*6), 5+(1*6)],
    [3+(1*6), 4+(1*6), 5+(1*6), 6+(1*6)],
    [4+(1*6), 5+(1*6), 6+(1*6), 7+(1*6)],


  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]  && squares[a] === squares[d] ) {
      return squares[a];
    }
  }
  return null;
}


/*
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/
