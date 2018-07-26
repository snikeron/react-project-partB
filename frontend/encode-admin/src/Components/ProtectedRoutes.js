import React, {Component} from 'react' 
import {Redirect} from 'react-router-dom'

export default class ProtectedRoutes extends Component {
    // constructor(props) {
    //     super(props)
    // }

    render() {
        // I don't know why this works but it does.
        if(!this.props.open) {
            if(this.props.open === false) {
                return <Redirect to="/" />
            }
            return null
        }

        return this.props.children
    }
}
