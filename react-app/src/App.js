import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import { Modal } from './context/Modal';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import Products from './components/Products';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import { getProductsThunk } from './store/products';
import ProductDetail from './components/ProductDetail';
import CreateProductPage from './components/CreateProductPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const products = useSelector(state => state.products.productsList)
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(getProductsThunk());
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
          {showSignup && <Modal onClose={() => setShowSignup(false)}>
            <SignUpForm setShowSignup={setShowSignup} />
          </Modal>}
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <Products products={products} />
        </Route>
        <Route path='/products/:id' exact={true} >
          <ProductDetail  products={products}/>
        </Route>
        <Route path='/products/new' exact={true}>
          <CreateProductPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
