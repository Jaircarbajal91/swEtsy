import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = ({ setShowLogin, setShowSignup }) => {
  const history = useHistory()
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      setShowLogin(false)
      history.push('/')
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoLogin = async e => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data) {
      setErrors(data)
    } else {
      setShowLogin(false)
      history.push('/')
    }
  }

  const registerNewUser = e => {
    e.preventDefault();
    setShowLogin(false);
    setShowSignup(true);
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <div className='register-button' onClick={registerNewUser}>Register</div>
      <form className='login-modal' onSubmit={onLogin}>
        <h2>Sign In</h2>
        <div>
          {errors.map((error, ind) => (
            <div className='auth-validate-error' key={ind}>{error}</div>
          ))}
        </div>
        <label className='signin-label' htmlFor='email'>  Email</label>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
          className='signin-input'
          required={true}
        />
        <label className='signin-label' htmlFor='password'>  Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
          className='signin-input'
          required={true}
        />
        <div className='signin-buttom-container'>
          <button className='singin-button' type='submit'>Login</button>
          <button className='singin-button' onClick={demoLogin}>Demo User</button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
