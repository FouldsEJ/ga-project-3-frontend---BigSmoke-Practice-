import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { isAdmin, getLoggedInUserId } from '../lib/auth.js';

function Navbar() {
  const [isAdminState, setIsAdminState] = useState(isAdmin());
  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsAdminState(isAdmin());
  }, [location]);

  const logout = () => {
    sessionStorage.removeItem('token');
    setIsAdminState(false);
    navigate('/');
  };
  return (
    <header>
      <div className='navbar has-shadow is-white '>
        <div className='navbar-brand'>
          <a className='navbar-item'>
            <img
              src='https://www.johnsonbanks.co.uk/content/thoughts/488_london_logo_tl.jpg'
              alt='navbar-logo'
              width='70px'
              height='70px'
            />
          </a>
        </div>
        <div className='navbar-start is-mobile '>
          <Link to='/' className='navbar-item is-white'>
            Home
          </Link>
          <Link to='/explore' className='navbar-item is-white'>
            Explore
          </Link>

          {isAdminState && (
            <Link to='/add-place' className='navbar-item is-white'>
              Add Place
            </Link>
          )}
          {getLoggedInUserId() && (
            <Link to='/profile ' className='navbar-item is-white'>
              My Profile
            </Link>
          )}
        </div>
        <div className='navbar-end is-mobile '>
          {!getLoggedInUserId() && (
            <Link to='/login' className='navbar-item is-white'>
              Login
            </Link>
          )}
          {!getLoggedInUserId() && (
            <Link to='/register ' className='navbar-item is-white'>
              Register
            </Link>
          )}
          {getLoggedInUserId() && (
            <div className='navbar-item' onClick={logout}>
              Logout
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
