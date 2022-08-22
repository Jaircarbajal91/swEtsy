
import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import logo from './images/logo.svg'


const NavBar = ({ setShowLogin, setShowSignup }) => {

  return (
    <nav className='nav-container'>
      <NavLink to='/' exact={true} activeClassName='active'>
        <img src={logo} />
        <SearchBar />
      </NavLink>
      <NavLink to='/sign-up' onClick={() => setShowSignup(true)} exact={true} activeClassName='active'>
        Sign Up
      </NavLink>
      <NavLink to='/login' onClick={() => setShowLogin(true)} exact={true} activeClassName='active'>
        Sign in
      </NavLink>
      <ul>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
