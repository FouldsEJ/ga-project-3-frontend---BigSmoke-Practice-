import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header>
      <div className="navbar has-shadow is-white ">
        <div className="navbar-brand">
          <a className="navbar-item">
            <img
              src="https://www.johnsonbanks.co.uk/content/thoughts/488_london_logo_tl.jpg"
              alt="navbar-logo"
              width="70px"
              height="70px"
            />
          </a>
        </div>
        <div className="navbar-start is-mobile ">
          <Link to="/" className="navbar-item is-white">
            Home
          </Link>
          <Link to="/places " className="navbar-item is-white">
            Explore
          </Link>
        </div>
        <div className="navbar-end is-mobile ">
          <Link to="/login" className="navbar-item is-white">
            Login
          </Link>
          <Link to="/register " className="navbar-item is-white">
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
