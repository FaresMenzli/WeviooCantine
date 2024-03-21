import React from 'react';
import ReactDOM from 'react-dom';
import DishDetails from './DishDetails';
import { Dish } from '../../Models/Dish';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DishDetails />, div);
  ReactDOM.unmountComponentAtNode(div);
});