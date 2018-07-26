import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';
import './components/Form.css'
import CandidateForm from './components/CandidateForm'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      <div className="App">
        <CandidateForm />
      </div>
      </div>
    );
  }
}

export default App;