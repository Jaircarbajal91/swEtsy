
import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';
import LogoutButton from './auth/LogoutButton';
import CartIcon from './images/CartIcon.svg'
import './NavBar.css'
import logo from './images/logo.svg'


const NavBar = ({ setShowLogin, setShowSignup, sessionUser }) => {



  return (
    <nav className='nav-container'>
      <NavLink to='/' className='navlink logo' exact={true} activeClassName='active'>
        <img src={logo} alt='logo' />
      </NavLink>
      <SearchBar />
      {/* <NavLink to='/sign-up' onClick={() => setShowSignup(true)} exact={true} activeClassName='active'>
        Sign Up
      </NavLink> */}
      <div className='right-nav-container'>
        <NavLink to='/login' className='navlink sign-in' onClick={() => setShowLogin(true)} exact={true} activeClassName='active'>
          Sign in
        </NavLink>
        <div className='cart-icon-container'>
          <NavLink to='/cart' className='navlink' activeClassName='active'>
            <img className='cart-icon' src={CartIcon} alt="cart-icon" />
          </NavLink>
        </div>
      </div>
      {/* <ul>
        <li>
          <NavLink to='/users' className='navlink' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul> */}
    </nav >
  );
}

export default NavBar;
