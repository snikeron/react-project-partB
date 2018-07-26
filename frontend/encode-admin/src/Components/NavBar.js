import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'

import './NavBar.css'

function NavBar({isLoggedIn, logout}) {
    return <nav>
    {isLoggedIn && <Fragment>
        <Link to="/candidates">Candidates</Link> <button onClick={()=>logout()}>Logout</button>
    </Fragment>}
    </nav>
}

export default NavBar
