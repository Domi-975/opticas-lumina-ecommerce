import React from 'react';

const Login = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container mt-5">
        <h1>Login</h1>
        <form>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" className="form-control" />
          </div>
          <div className="mb-3">
            <label>Contraseña</label>
            <input type="password" className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
        </form>
        {/* TODO: Conectar con API de login */}
      </div>
    </div>
  );
};

export default Login;