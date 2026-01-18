import React from 'react';
import { Link } from "react-router-dom";  

const Register = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 ">
        
        <div className="card d-flex justify-content-center align-items-center p-4 bg-dark text-light">
          <div className="card-title">
            <h1>Registro</h1>
          </div>
          <div className="card-body">
            <form>
              <div className="mb-3">
                <label>Nombre completo</label>
                <input type="text" className="form-control" placeholder="Nombre completo" />
              </div>
              <div className="mb-3">
                <label>Correo</label>
                <input type="email" className="form-control" placeholder="Email" />
              </div>
              <div className="mb-3">
                <label>Contraseña</label>
                <input type="password" className="form-control" placeholder="Contraseña" />
              </div>

              <div className="mb-3">
                <label>Teléfono</label>
                <input type="number" className="form-control" placeholder="Teléfono" />
              </div>

              <div className="mb-3">
                <label>Dirección</label>
                <input type="text" className="form-control" placeholder="Dirección" />
              </div>

              <div className="d-flex justify-content-center align-items-center">
                <button type="submit" className="btn btn-light text-dark fw-semibold">
                 Registrarse
                </button>
              </div>
              <p className="text-center mt-3">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
            </form>
          </div>
        </div>
    </div>
  );
};

export default Register;