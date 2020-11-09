import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const AuthPage = () => {
  const auth = useContext(AuthContext);

  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", {
        ...form,
      });
      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", {
        ...form,
      });
      auth.login(data.token, data.userId);
      message(data.message);
    } catch (e) {}
  };

  return (
    <div className="modal">
      <div className="auth">
        <div className="auth-header">Авторизация</div>
        <div className="auth-body">
          <input
            placeholder="Введите email"
            id="email"
            type="text"
            name="email"
            className="auth-body-form-input"
            value={form.email}
            onChange={changeHandler}
          />
          <input
            placeholder="Введите пароль"
            id="password"
            type="password"
            name="password"
            className="auth-body-form-input"
            value={form.password}
            onChange={changeHandler}
          />

          <div
            className="auth-body-form-button"
            style={{ marginRight: 10 }}
            disabled={loading}
            onClick={loginHandler}
          >
            Войти
          </div>
          <div
            className="auth-body-form-button"
            onClick={registerHandler}
            disabled={loading}
          >
            Регистрация
          </div>
        </div>
      </div>
    </div>
  );
};
