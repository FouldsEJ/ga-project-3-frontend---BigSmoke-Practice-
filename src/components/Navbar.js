import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { isAdmin, getLoggedInUserId } from '../lib/auth.js';

import ReactTooltip from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faMagnifyingGlassLocation,
  faRightFromBracket,
  faRightToBracket,
  faUser,
  faUserPlus,
  faPlusCircle,
  faCity,
} from '@fortawesome/free-solid-svg-icons';

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
      <div className="navbar">
        <div className="navbar-brand"></div>
        <div className="navbar-start is-mobile ">
          <Link to="/" className="navbar-item is-white">
            <h1>
              <FontAwesomeIcon
                icon={faCity}
                size="2x"
                data-tip
                data-for="homeTip"
              />
              <strong> The Big Smoke</strong>
            </h1>
            <ReactTooltip id="homeTip" place="right" effect="solid">
              Home
            </ReactTooltip>
          </Link>

          <Link to="/explore" className="navbar-item is-white">
            <FontAwesomeIcon
              icon={faMagnifyingGlassLocation}
              size="2x"
              data-tip
              data-for="exploreTip"
            />
          </Link>
          <ReactTooltip id="exploreTip" place="top" effect="solid">
            Explore
          </ReactTooltip>

          {isAdminState && (
            <Link to="/add-place" className="navbar-item is-white">
              <FontAwesomeIcon
                icon={faPlusCircle}
                size="2x"
                data-tip
                data-for="addlocationTip"
              />
              <ReactTooltip id="addlocationTip" place="top" effect="solid">
                Add a place
              </ReactTooltip>
            </Link>
          )}

          {getLoggedInUserId() && (
            <Link to="/profile " className="navbar-item is-white">
              <FontAwesomeIcon
                icon={faUser}
                size="2x"
                data-tip
                data-for="profileTip"
              />
              <ReactTooltip id="profileTip" place="top" effect="solid">
                My profile
              </ReactTooltip>
            </Link>
          )}
        </div>
        <div className="navbar-end is-mobile ">
          {!getLoggedInUserId() && (
            <Link to="/login" className="navbar-item is-white">
              <FontAwesomeIcon
                icon={faRightToBracket}
                size="2x"
                data-tip
                data-for="loginTip"
              />
              <ReactTooltip id="loginTip" place="top" effect="solid">
                Login
              </ReactTooltip>
            </Link>
          )}

          {!getLoggedInUserId() && (
            <Link to="/register " className="navbar-item is-white">
              <FontAwesomeIcon
                icon={faUserPlus}
                size="2x"
                data-tip
                data-for="registerTip"
              />
              <ReactTooltip id="registerTip" place="top" effect="solid">
                Register
              </ReactTooltip>
            </Link>
          )}

          {getLoggedInUserId() && (
            <Link to="/" className="navbar-item is-white" onClick={logout}>
              <FontAwesomeIcon
                icon={faRightFromBracket}
                size="2x"
                data-tip
                data-for="logoutTip"
              />
              <ReactTooltip id="logoutTip" place="top" effect="solid">
                Logout
              </ReactTooltip>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
