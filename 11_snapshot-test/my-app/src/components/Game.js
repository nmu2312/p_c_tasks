import React from 'react';
import Board from './Board';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const GameBoard = styled.div``;

const GameInfo = styled.div`
  margin-left: 30px;
`;

const Status = styled.div`
  margin-bottom: 10px;
`;

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null), position: null }],
      stepNumber: 0,
      xIsNext: true,
      orderIsDesc: false,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{ squares: squares, position: i }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  changeOrder() {
    this.setState({ orderIsDesc: !this.state.orderIsDesc });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const status = winner
      ? 'Winner: ' + (this.state.xIsNext ? 'O' : 'X')
      : this.state.stepNumber === 9
      ? 'Draw'
      : '次のプレイヤー: ' + (this.state.xIsNext ? 'X' : 'O');

    const moves = (this.state.orderIsDesc
      ? history.slice().reverse()
      : history
    ).map((step, index) => {
      const move = this.state.orderIsDesc ? history.length - 1 - index : index;
      const position = `(${step.position % 3}, ${Math.floor(
        step.position / 3
      )})`;
      const desc = move
        ? `Go to move #${move} ${position}`
        : 'Go to game start';
      return (
        <li key={move}>
          <button
            onClick={() => this.jumpTo(move)}
            style={
              move === this.state.stepNumber ? { fontWeight: 'bold' } : null
            }
          >
            {desc}
          </button>
        </li>
      );
    });

    return (
      <Wrapper>
        <GameBoard>
          <Board
            winner={winner}
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </GameBoard>
        <GameInfo>
          <Status>{status}</Status>
          <div>
            <button onClick={() => this.changeOrder()}>Change Order</button>
          </div>
          <ol>{moves}</ol>
        </GameInfo>
      </Wrapper>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return null;
}
