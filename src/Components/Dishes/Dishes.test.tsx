import React from 'react';
import ReactDOM from 'react-dom';
import Dishes from './Dishes';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Dishes />, div);
  ReactDOM.unmountComponentAtNode(div);
});