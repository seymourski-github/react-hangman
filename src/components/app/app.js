import React, { Component } from 'react';
import { Hangman } from '../../components';
import { data } from './data.js';
import './app.css';

export default class App extends Component {
  render() {
    return (<Hangman data={data} />);
  }
}
