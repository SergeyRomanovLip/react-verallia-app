import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../firebaseConfig'

export const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault()
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      errorHandler('Error signing in with password and email!')
      console.error('Error signing in with password and email', error)
    })
  }

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget

    if (name === 'userEmail') {
      setEmail(value)
    } else if (name === 'userPassword') {
      setPassword(value)
    }
  }

  const errorHandler = (error) => {
    setError(error)
    setTimeout(() => {
      setError(null)
    }, 3000)
  }

  return (
    <div className='infoWindow'>
      <div className='infoWindow-header'>Sign In</div>
      <hr></hr>
      <div className='infoWindow-body'>
        {error !== null && (
          <div
            style={{ backgroundColor: 'darkred', color: 'white' }}
            className={'infoWindow-body-form-input'}
          >
            {error}
          </div>
        )}
        <form className=''>
          <input
            autoComplete='on'
            type='email'
            className='infoWindow-body-form-input'
            name='userEmail'
            value={email}
            placeholder='Your email'
            id='userEmail'
            onChange={(event) => onChangeHandler(event)}
          />
          <input
            autoComplete='on'
            type='password'
            className='infoWindow-body-form-input'
            name='userPassword'
            value={password}
            placeholder='Your Password'
            id='userPassword'
            onChange={(event) => onChangeHandler(event)}
          />
          <div
            className='infoWindow-body-form-button'
            onClick={(event) => {
              signInWithEmailAndPasswordHandler(event, email, password)
            }}
          >
            Sign in
          </div>
          <Link className={'infoWindow-body-form-input'} to='/signUp'>
            If you dont have an account click here
          </Link>
        </form>
      </div>
    </div>
  )
}
export default SignIn
