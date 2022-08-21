
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import logo from './images/logo.svg'


const NavBar = () => {
  

  return (
    <nav className='nav-container'>
      <NavLink to='/' exact={true} activeClassName='active'>
        <img src={logo} />
      </NavLink>
      <NavLink to='/sign-up' exact={true} activeClassName='active'>
        Sign Up
      </NavLink>
      <ul>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
        </li>
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
