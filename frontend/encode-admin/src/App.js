import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import CandidateList from './Components/CandidateList';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CandidateInfo from './Components/CandidateInfo'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>

        <main className="main-wrapper">
          <Router>
            <Switch>
              {/* admin auth ROUTE */}
              <Route exact path="/candidates" component={CandidateList} />
              <Route path="/candidates/:id" render={({ match }) => {
                const { id } = match.params
                return <CandidateInfo _id={id} />
              }} />
            </Switch>
          </Router>
        </main>
      </div>
    );
  }
}

export default App;
