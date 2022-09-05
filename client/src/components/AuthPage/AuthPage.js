import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useMessage } from "../../hooks/errorMessage.hook";
import { useHttp } from "../../hooks/http.hook";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
  const { loading, error, request, clearError } = useHttp();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
   message(error)
   clearError()
  },[error, message, clearError])

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const handleRegister = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...state });
      message(data.message)
    } catch (e) {}
  };

  const handleLogin = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...state });
      auth.login(data.token, data.userId)
      //message(data.message)
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Сократить ссылку</h1>
        <div className="card blue lighten-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>
              <div className="input-field">
                <input
                  id="email"
                  type="text"
                  name="email"
                  className="white-input"
                  onChange={handleChange}
                  value={state.email}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="white-input"
                  onChange={handleChange}
                  value={state.password}
                />
                <label htmlFor="password">Пароль</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
            onClick={handleLogin}
              className="btn yellow darken-4"
              disabled={loading}
              style={{ marginRight: 10 }}
            >
              Войти
            </button>
            <button
              onClick={handleRegister}
              disabled={loading}
              className="btn grey lighten-4 black-text"
            >
              Зарегестироваться
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
