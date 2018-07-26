import React, {Component, Fragment} from 'react'
// import NavBar from '../Components/Navbar'
import NavBar from '../Components/NavBar'
import {Switch} from 'react-router-dom'


export default class DefaultLayout extends Component {
    // constructor(props) {
    //     super(props)
    // }

    render() {
        
        const {isLoggedIn, children, logout} = this.props
        return <Fragment>
                <NavBar logout={logout} isLoggedIn={isLoggedIn} />
            <main className="main-wrapper">
                <Switch>
                    {children}
                </Switch>
            </main>
        </Fragment>
    }
}