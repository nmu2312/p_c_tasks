import React from 'react';
import Board from './Board';
import styled from 'styled-components';
import { calculateWinner } from '../utils';

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
  render() {
    const history = this.props.history;
    const current = history[this.props.stepNumber];
    const winner = calculateWinner(current.squares);

    const status = winner
      ? 'Winner: ' + (this.props.xIsNext ? 'O' : 'X')
      : this.props.stepNumber === 9
      ? 'Draw!'
      : '次のプレイヤー: ' + (this.props.xIsNext ? 'X' : 'O');

    const moves = (this.props.orderIsDesc
      ? history.slice().reverse()
      : history
    ).map((step, index) => {
      const move = this.props.orderIsDesc ? history.length - 1 - index : index;
      const position = `(${step.position % 3}, ${Math.floor(
        step.position / 3
      )})`;
      const desc = move
        ? `Go to move #${move} ${position}`
        : 'Go to game start';
      return (
        <li key={move}>
          <button
            onClick={() => this.props.jumpTo(move)}
            style={
              move === this.props.stepNumber ? { fontWeight: 'bold' } : null
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
            onClick={(i) => this.props.handleClick(i)}
          />
        </GameBoard>
        <GameInfo data-test='game-info'>
          <Status data-test='status'>{status}</Status>
          <div>
            <button onClick={() => this.props.changeOrder()}>
              Change Order
            </button>
          </div>
          <ol data-test='history'>{moves}</ol>
        </GameInfo>
      </Wrapper>
    );
  }
}
