import React from "react";
import { Link } from "react-router-dom";  

const Login = () => {
  
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 ">
        
        <div className="card d-flex justify-content-center align-items-center p-4 bg-dark text-light">
          <div className="card-title">
            <h1>Login</h1>
          </div>
          <div className="card-body">
            <form>
              <div className="mb-3">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="Email" />
              </div>
              <div className="mb-3">
                <label>Contraseña</label>
                <input type="password" className="form-control" placeholder="Contraseña" />
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <button type="submit" className="btn btn-light text-dark fw-semibold">
                  Iniciar Sesión
                </button>
              </div>
            </form>
            <p className="text-center mt-3">¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
          </div>
        </div>
    </div>
  );
};

export default Login;
