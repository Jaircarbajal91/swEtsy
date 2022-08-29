import React from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar/SearchBar';
import LogoutButton from './auth/LogoutButton';
import CartIcon from './images/CartIcon.svg'
import DownArrow from './images/DownArrow.svg'
import UserIcon from './images/UserIcon.svg'
import ShopIcon from './images/ShopIcon.svg'
import ReviewsIcon from './images/ReviewsIcon.svg'
import './NavBar.css'
import logo from './images/logo.svg'


const NavBar = ({ setShowLogin, setShowSignup, sessionUser, searchWords, setSearchWords }) => {

  const [showDropDown, setShowDropDown] = useState(false)
  const history = useHistory()

  useEffect(() => {
    if (!showDropDown) return;

    const closeMenu = () => {
      setShowDropDown(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showDropDown]);

  const checkSession = () => {
    if (!sessionUser) {
      setShowLogin(true);
      history.push('/')
    } else {
      history.push('/cart')
    }
  }

  return (
  <div className='nav-wrapper'>
    <nav className='nav-container'>
      <NavLink to='/' className='navlink logo' exact={true} activeClassName='active'>
        <img src={logo} alt='logo' />
      </NavLink>
      <SearchBar searchWords={searchWords} setSearchWords={setSearchWords} />
      {/* <NavLink to='/sign-up' onClick={() => setShowSignup(true)} exact={true} activeClassName='active'>
        Sign Up
      </NavLink> */}
        <div className='right-nav-container'>
          {!sessionUser ? (
            <NavLink to='/' className='navlink sign-in' onClick={() => setShowLogin(true)} exact={true} activeClassName='active'>
              Sign in
            </NavLink>
          ) : (
            <div className='user-icon-wrapper' onClose={() => setShowDropDown(false)} onClick={() => setShowDropDown(prev => !prev)}>
              <img className='user-icon' src={UserIcon} alt="user-icon" />
              <img className='down-icon' src={DownArrow} alt="downArrow-icon" />
            </div>
          )}

          {showDropDown && (
            <div className='drop-down-menu-container'>
              <div className='drop-down-item-container user'>
                <img className='user-icon-drop-down' src={UserIcon} alt="reviews-icon" />
                <span className='dropdown text'>Welcome back, {sessionUser.first_name}</span>
              </div>
              <NavLink to='/products/new' className='navlink' activeClassName='active'>
                <div className='create-product drop-down-item'>
                  <img className='new-product-icon' src={ShopIcon} alt="new-product-icon" />
                  <span className='dropdown text'>List A New Product</span>
                </div>
              </NavLink>
              <NavLink to='/myreviews' className='navlink' activeClassName='active'>
                <div className='create-product drop-down-item'>
                  <img className='new-product-icon' src={ReviewsIcon} alt="reviews-icon" />
                  <span className='dropdown text'>See Your Reviews</span>
                </div>
              </NavLink>
              <LogoutButton />
            </div>
          )}
          <div className='cart-icon-container'>
            <div to='/cart' className='navlink' onClick={checkSession}>
              <img className='cart-icon' src={CartIcon} alt="cart-icon" />
            </div>
          </div>
        </div>
        {/* <ul>
        <li>
          <NavLink to='/users' className='navlink' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>

        </li>
      </ul> */}
      </nav >
    </div>
  );
}

export default NavBar;
