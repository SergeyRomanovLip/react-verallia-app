import React, { useState } from "react";
import { useHttp } from "../hooks/http.hook";

export const AuthPage = () => {
  const { loading, error, request } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="row">
      <div className=".col s6 offset-s3">
        <h1>Сократи Ссылку</h1>
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>
              <div>
                <div className="input-field col s6">
                  <input
                    placeholder="Введите Email"
                    id="email"
                    type="text"
                    className="validate"
                    name="email"
                    onChange={changeHandler}
                  />
                  <label htmlFor="email">First Name</label>
                </div>
                <div className="input-field col s6">
                  <input
                    placeholder="Введит пароль"
                    id="password"
                    type="password"
                    name="password"
                    className="validate"
                    onChange={changeHandler}
                  />
                  <label htmlFor="password">First Name</label>
                </div>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button className="btn yellow darken-4" style={{ marginRight: 10 }}>
              Войти
            </button>
            <button className="btn yellow darken-4">Регистрация</button>
          </div>
        </div>
      </div>
    </div>
  );
};
