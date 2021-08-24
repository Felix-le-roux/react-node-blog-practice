import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../context/Context';
import { Link } from 'react-router-dom';
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaSearch,
  FaTelegram,
  FaTwitterSquare,
} from 'react-icons/fa';

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const PF = 'http://localhost:5000/images/';

  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset;

    setPrevScrollPos(currentScrollPos);
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, handleScroll]);

  return (
    <div
      style={{
        boxShadow:
          prevScrollPos <= 0
            ? 'none'
            : 'rgba(25, 45, 100, 0.08) 0px 10px 30px 0px',
      }}
      className='navbar'
    >
      <div className='topLeft'>
        <FaFacebookSquare className='topIcon' />
        <FaInstagramSquare className='topIcon' />
        <FaTwitterSquare className='topIcon' />
        <FaTelegram className='topIcon' />
      </div>
      <div className='topCenter'>
        <ul className='topList'>
          <li className='topListItem'>
            <Link className='link' to='/'>
              HOME
            </Link>
          </li>
          <li className='topListItem'>ABOUT</li>
          <li className='topListItem'>CONTACT</li>
          <li className='topListItem'>
            <Link className='link' to='/write'>
              WRITE
            </Link>
          </li>
          {user && (
            <li className='topListItem' onClick={handleLogout}>
              LOGOUT
            </li>
          )}
        </ul>
      </div>
      <div className='topRight'>
        {user ? (
          <Link className='link' to='/settings'>
            <img className='topImg' src={PF + user.profilePic} alt='' />
          </Link>
        ) : (
          <ul className='topList'>
            <li className='topListItem'>
              <Link className='link' to='/login'>
                LOGIN
              </Link>
            </li>
            <li className='topListItem'>
              <Link className='link' to='/register'>
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <FaSearch className='topSearchIcon' />
      </div>
      {prevScrollPos <= 0 && <span className='neonBorder'></span>}
    </div>
  );
};

export default Navbar;
