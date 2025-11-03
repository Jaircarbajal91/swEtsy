import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './SearchBar/SearchBar';
import LogoutButton from './auth/LogoutButton';
import CartIcon from './images/CartIcon.svg'
import DownArrow from './images/DownArrow.svg'
import UserIcon from './images/UserIcon.svg'
import ShopIcon from './images/ShopIcon.svg'
import ReviewsIcon from './images/ReviewsIcon.svg'
import './NavBar.css'
import logo from './images/logo.svg'


const NavBar = ({ setShowLogin, setShowSignup, sessionUser, searchWords, setSearchWords, cartItems }) => {

  const [showDropDown, setShowDropDown] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 })
  const userIconRef = useRef(null)
  const history = useHistory()

  useEffect(() => {
    if (!showDropDown || !userIconRef.current) return;

    const updatePosition = () => {
      const rect = userIconRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        right: window.innerWidth - rect.right - 16
      });
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);

    const closeMenu = () => {
      setShowDropDown(false);
    };

    document.addEventListener('click', closeMenu);

    return () => {
      document.removeEventListener("click", closeMenu);
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
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
            <div 
              ref={userIconRef}
              className='user-icon-wrapper' 
              onClose={() => setShowDropDown(false)} 
              onClick={(e) => {
                e.stopPropagation();
                setShowDropDown(prev => !prev);
              }}
            >
              <img className='user-icon' src={UserIcon} alt="user-icon" />
              <img className='down-icon' src={DownArrow} alt="downArrow-icon" />
            </div>
          )}
          {sessionUser && (
            <div className='cart-icon-container'>
              <div to='/cart' className='navlink' onClick={checkSession}>
                <img className='cart-icon' src={CartIcon} alt="cart-icon" />
                {cartItems && cartItems.length > 0 && (
                  <span className='cart-badge'>
                    {cartItems.reduce((total, item) => total + (item.quantity || 0), 0)}
                  </span>
                )}
              </div>
            </div>
          )}
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
      {showDropDown && sessionUser && ReactDOM.createPortal(
        <div 
          className='drop-down-menu-container' 
          style={{
            position: 'fixed',
            top: `${dropdownPosition.top}px`,
            right: `${dropdownPosition.right}px`,
            zIndex: 99999
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className='drop-down-item-container user'>
            <img className='user-icon-drop-down' src={UserIcon} alt="reviews-icon" />
            <span className='dropdown text'>Welcome back, {sessionUser.first_name}</span>
          </div>
          <NavLink 
            to='/products/new' 
            className='navlink' 
            activeClassName='active'
            onClick={() => setShowDropDown(false)}
          >
            <div className='create-product drop-down-item'>
              <img className='new-product-icon' src={ShopIcon} alt="new-product-icon" />
              <span className='dropdown text'>List A New Product</span>
            </div>
          </NavLink>
          <NavLink 
            to='/myreviews' 
            className='navlink' 
            activeClassName='active'
            onClick={() => setShowDropDown(false)}
          >
            <div className='create-product drop-down-item'>
              <img className='new-product-icon' src={ReviewsIcon} alt="reviews-icon" />
              <span className='dropdown text'>See Your Reviews</span>
            </div>
          </NavLink>
          <LogoutButton setShowDropDown={setShowDropDown} />
        </div>,
        document.body
      )}
    </div>
  );
}

export default NavBar;
