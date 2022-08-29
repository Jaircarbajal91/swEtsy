import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './Signup.css';

const SignUpForm = ({ setShowSignup, setShowLogin }) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, firstname, lastname, email, password));
      if (data) {
        setErrors(data)
      } else {
        setShowSignup(false)
      }
    } else {
      setErrors(['Your password is not match the repeat password!'])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  const backToLogin = () => {
    setShowSignup(false)
    setShowLogin(true)
  }

  return (
    <form onSubmit={onSignUp} className='register-modal'>
      <h2>Register</h2>
      {errors.map((error, ind) => (
        <div className='auth-validate-error' key={ind}>{error}</div>
      ))}
      <label className='register-label'>User Name</label>
      <input
        type='text'
        name='username'
        onChange={updateUsername}
        value={username}
        className='register-input'
        required={true}
      ></input>
      <label className='register-label'>First Name</label>
      <input
        type='text'
        name='firstname'
        onChange={e => setFirstname(e.target.value)}
        value={firstname}
        className='register-input'
        required={true}
      ></input>
      <label className='register-label'>Last Name</label>
      <input
        type='text'
        name='lastname'
        onChange={e => setLastname(e.target.value)}
        value={lastname}
        className='register-input'
        required={true}
      ></input>
      <label className='register-label'>Email</label>
      <input
        type='email'
        name='email'
        onChange={updateEmail}
        value={email}
        className='register-input'
        required={true}
      ></input>
      <label className='register-label'>Password</label>
      <input
        type='password'
        name='password'
        onChange={updatePassword}
        value={password}
        className='register-input'
        required={true}
      ></input>
      <label className='register-label'>Repeat Password</label>
      <input
        type='password'
        name='repeat_password'
        onChange={updateRepeatPassword}
        value={repeatPassword}
        required={true}
        className='register-input'
      ></input>
      <button type='submit'>Sign Up</button>
      <span className='login-redirect'> Already registered?</span>
      <br></br>
      <span className='login-button' onClick={backToLogin}>Log in</span>
    </form>
  );
};

export default SignUpForm;
