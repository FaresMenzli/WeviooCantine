import React from 'react';
import ReactDOM from 'react-dom';
import StaffDashboard from './StaffDashboard';

it('should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StaffDashboard />, div);
  ReactDOM.unmountComponentAtNode(div);
});