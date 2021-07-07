import React from 'react';
import Board from './Board';
import { action } from '@storybook/addon-actions';
// import * as SquareStories from './Square.stories';

export default {
  component: Board,
  title: 'Board',
};

const Template = (args) => <Board {...args} />;
export const Default = Template.bind({});
Default.args = {
  squares: Array(9).fill(null),
  onClick: action('clicked'),
};
export const AllFilledWithTriangles = Template.bind({});
AllFilledWithTriangles.args = {
  squares: Array(9).fill('△'),
  onClick: action('clicked'),
};
