import React from 'react';
import Square from './Square';

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
      <div>
        {[...Array(3).keys()].map((i) => (
          <div key={i} className='board-row'>
            {[...Array(3).keys()].map((j) => this.renderSquare(i * 3 + j))}
          </div>
        ))}
      </div>
    );
  }
}
