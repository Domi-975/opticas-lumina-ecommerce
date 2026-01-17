// se encarga del perfil lateral con info de la persona

const PerfilForm = ({ perfil, setPerfil }) => {
  return (
    <div className='datos-perfil'>
      <h2>Editar Perfil</h2>
      <label>Nombre Completo</label>
      <input
        type='text'
        value={perfil.nombre}
        onChange={(e) => setPerfil({ ...perfil, nombre: e.target.value })}
      />
      <label>Correo Electrónico</label>
      <input
        type='email'
        value={perfil.email}
        onChange={(e) => setPerfil({ ...perfil, email: e.target.value })}
      />
      <label>Contraseña</label>
      <input
        type='password'
        value={perfil.password}
        onChange={(e) => setPerfil({ ...perfil, password: e.target.value })}
      />
      <button className='guardarbtn'> Guardar </button>
    </div>
  )
}

export default PerfilForm
