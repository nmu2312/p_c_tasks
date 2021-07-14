import React from 'react';
import Game from './Game';

export default {
  component: Game,
  title: 'Game',
};

const Template = (args) => <Game {...args} />;
export const Default = Template.bind({});
Default.args = {
  history: [{ squares: Array(9).fill(null), position: null }],
  stepNumber: 0,
  xIsNext: true,
  orderIsDesc: false,
  handleClick: () => {},
  jumpTo: () => {},
  changeOrder: () => {},
};

export const Draw = Template.bind({});
Draw.args = {
  history: [
    {
      squares: [null, null, null, null, null, null, null, null, null],
      position: null,
    },
    {
      squares: ['X', null, null, null, null, null, null, null, null],
      position: 0,
    },
    {
      squares: ['X', 'O', null, null, null, null, null, null, null],
      position: 1,
    },
    {
      squares: ['X', 'O', null, 'X', null, null, null, null, null],
      position: 3,
    },
    {
      squares: ['X', 'O', null, 'X', null, null, 'O', null, null],
      position: 6,
    },
    {
      squares: ['X', 'O', null, 'X', 'X', null, 'O', null, null],
      position: 4,
    },
    {
      squares: ['X', 'O', null, 'X', 'X', 'O', 'O', null, null],
      position: 5,
    },
    {
      squares: ['X', 'O', null, 'X', 'X', 'O', 'O', 'X', null],
      position: 7,
    },
    {
      squares: ['X', 'O', null, 'X', 'X', 'O', 'O', 'X', 'O'],
      position: 8,
    },
    {
      squares: ['X', 'O', 'X', 'X', 'X', 'O', 'O', 'X', 'O'],
      position: 2,
    },
  ],
  stepNumber: 9,
  xIsNext: false,
  orderIsDesc: false,
  handleClick: () => {},
  jumpTo: () => {},
  changeOrder: () => {},
};
