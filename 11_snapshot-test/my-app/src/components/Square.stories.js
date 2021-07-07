import React from 'react';
import Square from './Square';

export default {
  component: Square,
  title: 'Square',
};

const Template = (args) => <Square {...args} />;

export const Default = Template.bind({});
Default.args = {
  style: null,
  value: null,
};

export const Player1 = Template.bind({});
Player1.args = {
  style: null,
  value: 'X',
};

export const Player2 = Template.bind({});
Player2.args = {
  style: null,
  value: 'O',
};

export const ThirdPlayer = Template.bind({});
ThirdPlayer.args = {
  style: null,
  value: '△',
};

export const Player1Wins = Template.bind({});
Player1Wins.args = {
  style: { backgroundColor: 'yellow' },
  value: 'X',
};
