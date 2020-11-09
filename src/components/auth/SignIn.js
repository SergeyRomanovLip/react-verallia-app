import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { auth } from '../../firebaseConfig'

export const SignIn = () => {
  const { user } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault()
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      setError('Error signing in with password and email!')
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

  return (
    <div className='infoWindow'>
      <div className='infoWindow-header'>Sign In</div>
      <hr></hr>
      <div className='infoWindow-body'>
        {error !== null && <div>{error}</div>}
        <form className=''>
          <input
            type='email'
            className='infoWindow-body-form-input'
            name='userEmail'
            value={email}
            placeholder='Your email'
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
