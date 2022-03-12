import React from 'react'

function loginForm() {
  return (
    <div className='login-form'>
        <div className='form'>
            <div className='header'>
                <button>Artist</button>
                |
                <button>User</button>
            </div>
            <input type='text' placeholder='username'/>
            <input type='password' placeholder='password'/>
            <p>Forgot password?</p>
            <button>login</button>
            <div className='footer'>
                <p>click here to register</p>
                <button>register</button>
            </div>

        </div>
    </div>
  )
}

export default loginForm