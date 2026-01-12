import React from 'react';

const Register = () => {
  return (
    <div className="container mt-5">
      <h1>Registro</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="fullName">Nombre Completo</label>
          <input type="text" id="fullName" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Registrar</button>
      </form>
      {/* TODO: Conectar con API de registro */}
    </div>
  );
};

export default Register;