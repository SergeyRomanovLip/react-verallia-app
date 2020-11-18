import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from 'context/AuthContext'

export const AuthPage = () => {
  const user = useContext(AuthContext)
  useEffect(() => {
    console.log(user)
  }, [user])

  const auth = {}

  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState(null)

  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const registerHandler = async () => {
    try {
      const data = {}
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      const data = {}
    } catch (e) {}
  }

  return (
    <div className='modal'>
      <div className='auth'>
        <div className='auth-header'>Авторизация</div>
        <form className='auth-body'>
          <input
            autoComplete='on'
            placeholder='Введите email'
            id='email'
            type='text'
            name='email'
            className='auth-body-form-input'
            value={form.email}
            onChange={changeHandler}
          />
          <input
            autoComplete='on'
            placeholder='Введите пароль'
            id='password'
            type='password'
            name='password'
            className='auth-body-form-input'
            value={form.password}
            onChange={changeHandler}
          />

          <div className='auth-body-form-button' style={{ marginRight: 10 }} disabled={false} onClick={loginHandler}>
            Войти
          </div>
          <div className='auth-body-form-button' onClick={registerHandler} disabled={false}>
            Регистрация
          </div>
        </form>
      </div>
    </div>
  )
}
