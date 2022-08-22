import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import { Modal } from './context/Modal';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const dispatch = useDispatch();
  console.log(showSignup)
  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }
  return (
    <BrowserRouter>
      <NavBar setShowLogin={setShowLogin} setShowSignup={setShowSignup}/>
      <Switch>
        <Route path='/login' exact={true}>
          {showLogin && <Modal onClose={() => setShowLogin(false)}>
            <LoginForm setShowLogin={setShowLogin} />
          </Modal>}
        </Route>
        <Route path='/sign-up' exact={true}>
          {showSignup && <Modal onClose={() => {
            setShowSignup(false)
            console.log(showSignup)
            }}>
            <SignUpForm setShowSignup={setShowSignup} />
          </Modal>}
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
