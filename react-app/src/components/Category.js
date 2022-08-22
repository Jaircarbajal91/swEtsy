
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const Category = () => {
  return (
    <nav className='nav-container'>
      <ul>
        <li>
          <NavLink to='/apparel' exact={true} activeClassName='active'>
            Apparel
          </NavLink>
        </li>
        <li>
          <NavLink to='/accessories' exact={true} activeClassName='active'>
            Accessories
          </NavLink>
        </li>
        <li>
          <NavLink to='/equipment' exact={true} activeClassName='active'>
            Equipment
          </NavLink>
        </li>
        <li>
          <NavLink to='/outdoor' exact={true} activeClassName='active'>
            Outdoor
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Category;
