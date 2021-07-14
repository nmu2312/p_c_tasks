import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { calculateWinner } from './utils';
import Game from './components/Game';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null), position: null }],
      stepNumber: 0,
      xIsNext: true,
      orderIsDesc: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.jumpTo = this.jumpTo.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
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
    return (
      <Game
        {...this.state}
        handleClick={this.handleClick}
        jumpTo={this.jumpTo}
        changeOrder={this.changeOrder}
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
