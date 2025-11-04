import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './LoginForm.css';

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
    <div className="login-container">
      <form className='login-modal' onSubmit={onSignUp}>
        <div className="login-header">
          <div className="header-tabs">
            <div className="tab" onClick={backToLogin}>Sign In</div>
            <div className="tab active">Register</div>
          </div>
          <h2>Create Account</h2>
          <p>Sign up for your account</p>
        </div>
        
        {errors.length > 0 && (
          <div className="error-container">
            {errors.map((error, ind) => (
              <div className='auth-validate-error' key={ind}>{error}</div>
            ))}
          </div>
        )}
        
        <div className="form-group">
          <label className='signin-label' htmlFor='username'>User Name</label>
          <input
            name='username'
            type='text'
            placeholder='Enter your username'
            value={username}
            onChange={updateUsername}
            className='signin-input'
            required={true}
          />
        </div>
        
        <div className="form-group">
          <label className='signin-label' htmlFor='firstname'>First Name</label>
          <input
            name='firstname'
            type='text'
            placeholder='Enter your first name'
            value={firstname}
            onChange={e => setFirstname(e.target.value)}
            className='signin-input'
            required={true}
          />
        </div>
        
        <div className="form-group">
          <label className='signin-label' htmlFor='lastname'>Last Name</label>
          <input
            name='lastname'
            type='text'
            placeholder='Enter your last name'
            value={lastname}
            onChange={e => setLastname(e.target.value)}
            className='signin-input'
            required={true}
          />
        </div>
        
        <div className="form-group">
          <label className='signin-label' htmlFor='email'>Email</label>
          <input
            name='email'
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={updateEmail}
            className='signin-input'
            required={true}
          />
        </div>
        
        <div className="form-group">
          <label className='signin-label' htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={updatePassword}
            className='signin-input'
            required={true}
          />
        </div>
        
        <div className="form-group">
          <label className='signin-label' htmlFor='repeat_password'>Repeat Password</label>
          <input
            name='repeat_password'
            type='password'
            placeholder='Repeat your password'
            value={repeatPassword}
            onChange={updateRepeatPassword}
            className='signin-input'
            required={true}
          />
        </div>
        
        <div className='signin-button-container'>
          <button 
            className='signin-button primary' 
            type='submit'
          >
            Sign Up
          </button>
        </div>
        
        <div className="login-footer">
          <p>Already have an account? 
            <span className="register-link" onClick={backToLogin}>
              Sign in here
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
