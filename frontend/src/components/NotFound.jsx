import React from 'react'
import { Link } from 'react-router-dom'
import notFound from '../assets/notFound.jpg'

const NotFound = () => {
  return (
    <div className='divNotFound'>
      <img src={notFound} alt='not found' width='800px' />
      <Link to='/' className='btnVolver'>Volver al inicio</Link>
    </div>
  )
}

export default NotFound
