import React, { Component } from 'react';
import './App.css';
import Login from './pages/Login';
import CandidateList from './Components/CandidateList';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CandidateInfo from './Components/CandidateInfo'
import DefaultLayout from './layouts/DefaultLayout'
import ProtectedRoutes from './Components/ProtectedRoutes'
import auth from './api/auth';


class App extends Component {

  state = {
    isLoggedIn: false,
  }

  login = () => {
    localStorage.setItem('isLoggedIn', true)

    this.setState({
      isLoggedIn: true
    })
  }

  logout = () => {
      localStorage.removeItem('isLoggedIn')

      this.setState({
          isLoggedIn: false
      }, () => {    
          auth.logoutUser()
      })
  }

  componentDidMount() {
    const isLoggedIn = localStorage.getItem('isLoggedIn')

    if(isLoggedIn) {
      this.setState({
        isLoggedIn: true 
      })
    }
  }
    // post username, password √
    // receieve token √
    // update state 
    // update state to set LoggedIn to true

  render() {


    const {isLoggedIn} = this.state
    console.log('reloaded',isLoggedIn)
    return (
      
          <Router>
                  <DefaultLayout logout={this.logout} isLoggedIn={isLoggedIn}>
                      <Route exact path="/" render={() => <Login isLoggedIn={isLoggedIn} login={this.login} />} />
                      <ProtectedRoutes open={isLoggedIn}>
                          <Route exact path="/candidates" component={CandidateList} />
                          <Route exact path="/candidates/:id" render={({ match }) => {
                            const { id } = match.params
                            return <CandidateInfo _id={id} />
                          }} />
                      </ProtectedRoutes>
                  </DefaultLayout>
        
          </Router>
      //     <div className="App">
      //     <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //   </header>

      //   <main className="main-wrapper">
      //     <Router>
      //       <Switch>
      //         {/* admin auth ROUTE */}
      //         <Route exact path="/candidates" component={CandidateList} />
      //         <Route path="/candidates/:id" render={({ match }) => {
      //           const { id } = match.params
      //           return <CandidateInfo _id={id} />
      //         }} />
      //       </Switch>
      //       </Router>
      //       </main>
      // </div>
    );
  }
}

export default App;