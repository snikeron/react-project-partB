import React from 'react'
import auth from '../api/Auth';
import {Redirect} from 'react-router-dom'
import '../Components/Encode-Admin.css'


export default function LoginForm (props) {

    if(props.isLoggedIn) {
      return <Redirect to="/candidates" />
    }

    return <div className="login">
    <h2>Encode Talent Management</h2>
    <form onSubmit={(e) => {
      e.preventDefault()
      const form = e.target.elements
      const email = form.email.value
      const password = form.password.value

      if(email === '' || password === '') {
          alert('please fill out the form')
          return;
      }

      auth.loginUser(email, password)
        .then(() => {
            props.login()
        })
        .catch(err => {
            console.error(err)
        })
      e.target.reset()
    }}>
      <p>
        <label htmlFor="email">Email: </label>
        <input type="email" name="email"/>
      </p>

      <p>
        <label htmlFor="password">Password: </label>
        <input type="password" name="password"/>
      </p>

      <p>
        <input type="submit" value="Login" />
      </p>
    </form>
</div>
}
