import React, { Component } from 'react';
import './App.css';
import './components/Form.css'
import CandidateForm from './components/CandidateForm'

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