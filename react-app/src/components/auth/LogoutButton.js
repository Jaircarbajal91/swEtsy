import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import SignOut from '../images/SignOut.svg'
import './Logout.css'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <div className='drop-down-item' onClick={onLogout}>
      <img className='signout-icon' src={SignOut} alt="sign-out-icon" />
      <span className='signout-text'>Sign Out</span>
    </div>
  )
};

export default LogoutButton;
