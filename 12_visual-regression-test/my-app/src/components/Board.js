import React from 'react';
import Square from './Square';
import styled from 'styled-components';

const BoardRow = styled.div`
  &::after {
    clear: both;
    content: '';
    display: table;
  }
`;

export default class Board extends React.Component {
  renderSquare(i) {
    const style = this.props.winner?.includes(i)
      ? { backgroundColor: 'yellow' }
      : null;
    return (
      <Square
        key={i}
        style={style}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <>
        {[...Array(3).keys()].map((i) => (
          <BoardRow key={i}>
            {[...Array(4).keys()].map((j) => this.renderSquare(i * 3 + j))}
          </BoardRow>
        ))}
      </>
    );
  }
}
