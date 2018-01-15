import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const props = {
  data: [{
    "name": "Thomas Edison"
  }],
  display: {
    gallowsOn: false,
    roundToggleOn: true
  }
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App {...props} />, div);
});
