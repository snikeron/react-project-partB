import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CandidateForm from './form/CandidateForm'

class App extends Component {
  render() {
    return (
      <div className="App">
        <CandidateForm />
      </div>
    );
  }
}

export default App;
