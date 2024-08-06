import React from 'react'
import Logo from '../assets/imbd.png'
import { Form, Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex space-x-8 item-center pl-3 py-2'>

    <Link to='/' >
    <img src={Logo}/>
    </Link>

    <Link to='/' className='text-blue-500 text-3xl font-bold' >
     Movies
    </Link>

    <Link to='/watchlist'className='text-green-500 text-3xl font-bold' >
      Watchlist
    </Link>

    
    
    </div>
    
    
  )
}

export default Navbar
