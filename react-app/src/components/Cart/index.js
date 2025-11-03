import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom"
import { getCartItemsThunk } from "../../store/cart";
import CartItem from "./CartItem";
import CartTotalCard from "./CartTotalCard";
import './Cart.css';

const Cart = ({ cartItems, sessionUser, setShowLogin, cartLoaded, setCartLoaded }) => {
  const dispatch = useDispatch();
  const hasFetched = useRef(false);
  
  let initialSubtotal = 0;
  if (cartItems) {
    for (let item of cartItems) {
      initialSubtotal += item.quantity * item.product_detail.price;
    };
  }

  useEffect(() => {
    if (sessionUser && !hasFetched.current) {
      hasFetched.current = true;
      dispatch(getCartItemsThunk()).then(() => setCartLoaded(true))
    }
  }, [dispatch, sessionUser, setCartLoaded])

  if (!sessionUser) {
    setShowLogin(true)
    return <Redirect to='/' />
  }

  const totalItems = cartItems ? cartItems.reduce((total, item) => total + (item.quantity || 0), 0) : 0;

  return cartLoaded && (
    <div className="cart-master-div">
      {cartItems?.length > 0 && <div className="cart-left">
        {cartItems?.length > 0 && <h2 className="num-items-in-cart">{totalItems}&nbsp;items in your cart</h2>}
        {cartItems?.length > 0 && cartItems?.map((item, i) =>
          <CartItem key={i} item={item} />
        )}
      </div>}
      {cartItems?.length > 0 &&
        <CartTotalCard
          cartItems={cartItems}
          initialSubtotal={initialSubtotal}
        />
      }
      {!cartItems?.length &&
        <div className="cart-empty-message">
          <div className="cart-empty-icon">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 4H20L18 15H7L5 2H2" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="20" r="1.5" stroke="#cbd5e1" strokeWidth="1.5" fill="none"/>
              <circle cx="18" cy="20" r="1.5" stroke="#cbd5e1" strokeWidth="1.5" fill="none"/>
            </svg>
          </div>
          <h2 className="cart-empty-title">Your cart is empty</h2>
          <p className="cart-empty-subtitle">Discover something unique to fill it up</p>
          <NavLink to='/' className="cart-empty-button">
            Start Shopping
          </NavLink>
        </div>
      }
    </div>
  )
}

export default Cart
