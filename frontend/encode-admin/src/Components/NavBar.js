import React, {Fragment} from 'react'
// import {Link} from 'react-router-dom'
import logo from '../logo.svg'

import './NavBar.css'

function NavBar({isLoggedIn, logout}) {
    if (isLoggedIn) {
        return <nav className="App-header">
        {
            <Fragment>
                {/* <Link to="/candidates">Candidates</Link>  */}
                <img src={logo} className="App-logo" alt="logo" />
                <button onClick={()=>logout()} className="menu">Logout</button>
            </Fragment>
        }
        
        </nav>
    } else {
        return <nav className="App-header">
        {
            <Fragment>
                <img src={logo} className="App-logo" alt="logo" />
            </Fragment>
        }
        
        </nav>
    }
    
}

export default NavBar
