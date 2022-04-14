import React from 'react';
import App from './App';
import ReactDOM from "react-dom";

// Reference: exempli-gratia
// Edited by Xiao Lin
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
