import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css';

const LoginForm = ({ setShowLogin, setShowSignup }) => {
  const history = useHistory()
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);
    
    try {
      const data = await dispatch(login(email, password));
      if (data) {
        setErrors(data);
      } else {
        setShowLogin(false)
        history.push('/')
      }
    } catch (error) {
      setErrors(['An unexpected error occurred. Please try again.']);
    } finally {
      setIsLoading(false);
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
    setIsLoading(true);
    setErrors([]);
    
    try {
      const data = await dispatch(login('demo@swetsy.com', 'password'));
      if (data) {
        setErrors(data)
      } else {
        setShowLogin(false)
        history.push('/')
      }
    } catch (error) {
      setErrors(['Demo login failed. Please try again.']);
    } finally {
      setIsLoading(false);
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
    <div className="login-container">
      <form className='login-modal' onSubmit={onLogin}>
        <div className="login-header">
          <div className="header-tabs">
            <div className="tab active">Sign In</div>
            <div className="tab" onClick={registerNewUser}>Register</div>
          </div>
          <h2>Welcome Back</h2>
          <p>Sign in to your account</p>
        </div>
        
        {errors.length > 0 && (
          <div className="error-container">
            {errors.map((error, ind) => (
              <div className='auth-validate-error' key={ind}>{error}</div>
            ))}
          </div>
        )}
        
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
            disabled={isLoading}
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
            disabled={isLoading}
          />
        </div>
        
        <div className='signin-button-container'>
          <button 
            className='signin-button primary' 
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
          
          <div className="divider">
            <span>or</span>
          </div>
          
          <button 
            className='signin-button demo' 
            onClick={demoLogin}
            disabled={isLoading}
            type="button"
          >
            {isLoading ? 'Loading...' : 'Try Demo Account'}
          </button>
        </div>
        
        <div className="login-footer">
          <p>Don't have an account? 
            <span className="register-link" onClick={registerNewUser}>
              Sign up here
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;