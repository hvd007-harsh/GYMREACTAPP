import './User.css';


import React from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
  

  return (
      <>
       <div className="Login-Form">
          <form action="" className='form'>
               <label htmlFor="Username">Username</label>
               <input type="text" name="username" id="username"  />
               <label htmlFor="Username">Password</label>
               <input type="password" name="password" id="password" />
          </form>
            <div className="ref">
                <Link to="/Register">Register</Link>
            </div>
       </div>
      </>
  )
}

export default Login