import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { Redirect, useHistory } from 'react-router-dom'

const firebaseConfig = {
  apiKey: 'AIzaSyB-MbVE0gSmIjcLdgsCaWnip0XI71wXmmQ',
  authDomain: 'verallia-int-map-database.firebaseapp.com',
  databaseURL: 'https://verallia-int-map-database.firebaseio.com',
  projectId: 'verallia-int-map-database',
  storageBucket: 'verallia-int-map-database.appspot.com',
  messagingSenderId: '783186530200',
  appId: '1:783186530200:web:92395d2ddbe53131eb25ed'
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const signOutUser = () =>
  firebase
    .auth()
    .signOut()
    .catch((e) => {})
export const generateUserDocument = async (user, additionalData) => {
  if (!user) return
  const userRef = firestore.doc(`users/${user.uid}`)
  const snapshot = await userRef.get()
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      })
    } catch (error) {
      console.error('Error creating user document', error)
    }
  }
  return getUserDocument(user.uid)
}

const getUserDocument = async (uid) => {
  if (!uid) return null
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get()
    return {
      uid,
      ...userDocument.data()
    }
  } catch (error) {
    console.error('Error fetching user', error)
  }
}

export const generateStateDocument = async (user, newState) => {
  const ref = await firestore.doc(`users/${user.uid}`)
  const existing = await firestore.doc(`users/${user.uid}`).get()
  try {
    await ref.set({
      ...existing.data(),
      state: {
        ...newState,
        updated: new Date().toLocaleDateString()
      }
    })
  } catch (error) {
    console.error('Error creating user document', error)
  }
}

export const writeStateLog = async (user, newState) => {
  const ref = await firestore.doc(`users/${user.uid}`)
  const existing = await firestore.doc(`users/${user.uid}`).get()
  try {
    let time = new Date()
    let newLog = []
    if (existing.data().log) {
      if (existing.data().log.length > 0 && existing.data().log.length <= 3) {
        console.log('log added ' + existing.data().log.length)
        existing.data().log.map((e) => {
          return newLog.push(e)
        })
        newLog.push({ [time]: JSON.stringify(newState) })
      } else if (existing.data().log.length > 3) {
        console.log('log shifted ' + existing.data().log.length)
        newLog = existing.data().log
        newLog.shift()
        newLog.push({ [time]: JSON.stringify(newState) })
      } else {
        console.log('log started ' + existing.data().log.length)
        newLog.push({ [time]: JSON.stringify(newState) })
      }
    } else {
      newLog.push({ [time]: JSON.stringify(newState) })
    }
    await ref.set({
      ...existing.data(),
      log: newLog
    })
  } catch (error) {
    console.error('Error creating user document', error)
  }
}

export const getExistingState = async (user) => {
  const existing = await firestore.doc(`users/${user.uid}`).get()
  try {
    return existing.data().state
  } catch (error) {
    console.error('Error creating user document', error)
    return false
  }
}
