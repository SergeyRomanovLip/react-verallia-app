import React, { useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { auth, generateUserDocument, signOutUser } from '../../firebaseConfig'

export const AuthState = ({ children }) => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      const user = await generateUserDocument(userAuth)
      setUser(user)
    })
  }, [auth, AuthContext])

  return <AuthContext.Provider value={{ user, signOutUser }}>{children}</AuthContext.Provider>
}
