import React from 'react'
import { Redirect } from 'react-router-dom'
import { signOutUser } from '../firebaseConfig'

export const signOutHandler = (event) => {
  event.preventDefault()
  signOutUser()
}
