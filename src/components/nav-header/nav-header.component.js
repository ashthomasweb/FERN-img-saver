import React from 'react'
import { Link } from 'react-router-dom'

function NavHeader() {
  return (
    <div className='container'>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <Link to='/' className='navbar-brand'>MERN-Stack Image Saver</Link>
        <div className='collpase navbar-collapse'>
          <ul className='navbar-nav mr-auto'>
            <li className='navbar-item'>
              <Link to='/' className='nav-link'>Create Item</Link>
            </li>
          </ul>
        </div>
      </nav>
      <br />
    </div>
  )
}

export default NavHeader

// END of document
