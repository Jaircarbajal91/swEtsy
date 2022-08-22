
import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const BottomNav = () => {
    return (
        <nav className='nav-container'>
            <ul>
                <li>
                    <NavLink to='/about' exact={true} activeClassName='active'>
                        About
                    </NavLink>
                </li>
                <li>
                    <a href='https://github.com/Jaircarbajal91/swEtsy' exact={true} activeClassName='active'>
                        Github
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default BottomNav;
