import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth, generateUserDocument } from '../../firebaseConfig'

export const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState(null)

  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault()
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password)
      generateUserDocument(user, { displayName })
    } catch (error) {
      setError('Error Signing up with email and password')
    }

    setEmail('')
    setPassword('')
    setDisplayName('')
  }
  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget
    if (name === 'userEmail') {
      setEmail(value)
    } else if (name === 'userPassword') {
      setPassword(value)
    } else if (name === 'displayName') {
      setDisplayName(value)
    }
  }
  return (
    <div className='infoWindow'>
      <div className='infoWindow-header'>Sign Up</div>
      <hr></hr>
      <div className='infoWindow-body'>
        {error !== null && <div>{error}</div>}
        <form className=''>
          <input
            type='text'
            className='infoWindow-body-form-input'
            name='displayName'
            value={displayName}
            placeholder='Name'
            id='displayName'
            onChange={(event) => onChangeHandler(event)}
          />
          <input
            type='email'
            className='infoWindow-body-form-input'
            name='userEmail'
            value={email}
            placeholder='Your Email'
            id='userEmail'
            onChange={(event) => onChangeHandler(event)}
          />
          <input
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
              createUserWithEmailAndPasswordHandler(event, email, password)
            }}
          >
            Sign up
          </div>
          <Link className={'infoWindow-body-form-input'} to='/signIn'>
            You've already have an account? Click here
          </Link>
        </form>
      </div>
    </div>
  )
}
