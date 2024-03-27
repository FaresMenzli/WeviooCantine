import React from 'react';
import ReactDOM from 'react-dom';
import DishDetails from './DishDetails';


it('should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DishDetails />, div);
  ReactDOM.unmountComponentAtNode(div);
});