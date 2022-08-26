import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import { Modal } from './context/Modal';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import Products from './components/Products';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Reviews from './components/Reviews';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import { getProductsThunk } from './store/products';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import CreateProductPage from './components/CreateProductPage';
import Header from './components/Header';
import { getCartItemsThunk } from './store/cart';
import SearchResult from './components/SearchResult';


function App() {


  const [loaded, setLoaded] = useState(false);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(true);
  const [searchWords, setSearchWords] = useState('');
  const products = useSelector(state => state.products.productsList);
  const cartItems = useSelector(state => state.cart.cartItemsList);
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(getProductsThunk());
      if (sessionUser) {
        await dispatch(getCartItemsThunk());
        setCartLoaded(true)
      }
      setLoaded(true);
    })();
  }, [dispatch, cartItems?.length]);

  if (!loaded) {
    return null;
  }
  return (
    <BrowserRouter>
      <div className='content container'>
        <NavBar setShowLogin={setShowLogin} setShowSignup={setShowSignup} sessionUser={sessionUser}
                searchWords={searchWords} setSearchWords={setSearchWords}/>
        <Switch>
          <Route path='/login' exact={true}>
            {showLogin && <Modal onClose={() => { setShowLogin(false) }}>
              <LoginForm setShowLogin={setShowLogin} setShowSignup={setShowSignup} />
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
          <Products sessionUser={sessionUser} products={products} />
          </Route>
          <Route path='/products/new' exact={true}>
            <CreateProductPage />
          </Route>
          <Route path='/products/:id' exact={true} >
            <ProductDetail />
          </Route>
          <Route path='/cart' exact={true} >
            <Cart cartLoaded={cartLoaded} setCartLoaded={setCartLoaded} cartItems={cartItems} sessionUser={sessionUser} setShowLogin={setShowLogin} />
          </Route>
          <Route path='/reviews' exact={true} >
            <Reviews />
          </Route>
          <Route path='/search'>
            <SearchResult searchWords={searchWords} setSearchWords={setSearchWords} />
          </Route>
          <Route path='*' >
            <h1>Page not found</h1>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
