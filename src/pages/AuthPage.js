import React from 'react'
import { SignUp } from './../components/auth/SignUp'
import { SignIn } from './../components/auth/SignIn'
import { useParams } from 'react-router-dom'

export const AuthPage = () => {
  const { type } = useParams()
  return type === 'signIn' ? (
    <div className={'modal'}>
      <SignIn />
    </div>
  ) : (
    <div className={'modal'}>
      <SignUp />
    </div>
  )
}
