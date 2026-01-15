// Cambiar img de avatar 
const Perfil = ({ foto, cambiarFoto, insertarFoto}) => {
    return (
         <div className='img-perfil'>
            <img src={foto}
                alt="foto avatar"
                className='img-avatar'
                onClick={()=> insertarFoto.current.click()} />
                <input type="file" 
                        accept="image/*"
                        ref= { insertarFoto }
                        onChange={cambiarFoto}
                        className='inputfoto'
                        style={{ display: "none" }}
                        />
            <button className='cambiarimagenbtn' onClick={()=>insertarFoto.current.click()}> Cambiar imagen </button>
        </div>
    )
}

export default Perfil