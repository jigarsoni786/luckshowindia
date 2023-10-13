import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import header from '../img/header.webp'
import header_mobile from '../img/luck_show_header.webp'

const Nav = () => {
  const auth = localStorage.getItem('user')
  const Navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    Navigate('/')
  }
  return (
    <div>

      <div>
        <div>
          <img src={header} alt='header' className='img-fluid d-none d-md-block' />
        </div>
        <div>
          <img src={header_mobile} alt='header' className='img-fluid d-block d-md-none' />
        </div>

        <div className='d-flex flex-column flex-md-row align-items-center justify-content-center'>
          <ul className='nav_header mb-0 align-items-start align-items-md-center'>
            <li><Link className='nav_link' to="/">HOME</Link></li>
            <li><Link className='nav_link' to="/Result">QUIZ RESULT</Link></li>
            <li><Link className='nav_link' to="/About">ABOUT</Link></li>
          </ul>
          <ul className='nav_header mb-0 align-items-center'>
            {auth ? <>

              <li><Link className='nav_link' to="/AddLottry">ADD RESULT</Link></li>
              <li> <div className="dropdown">
                <button className="dropbtn bg-danger">Hey  {JSON.parse(auth).name}</button>
                <div className="dropdown-content bg-danger text-white">
                  <Link onClick={logout} to="/">Logout</Link>
                </div>
              </div></li>
            </> :

              <>
                <Link className='nav_link bg-primary py-2 px-4 rounded-2' to="/Login">LOG IN</Link>
                <li></li>
                {/* <li><Link to="/Ragister">Ragister</Link></li> */}
              </>
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Nav