import React, { useEffect, useState } from 'react'
import { AuthContext } from 'context/AuthContext'
import { auth, signOutUser } from 'backend/firebaseConfig'

export const AuthState = ({ children }) => {
  const [user, setAuthUser] = useState(null)

  useEffect(() => {
    const unlisten = auth.onAuthStateChanged((authUser) => {
      authUser ? setAuthUser(authUser) : setAuthUser(null)
    })
    return () => {
      unlisten()
    }
  })

  return <AuthContext.Provider value={{ user, signOutUser }}>{children}</AuthContext.Provider>
}
