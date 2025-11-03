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
          <h1>Your cart is empty.</h1>
          <NavLink to='/'>Discover something unique to fill it up</NavLink>
        </div>
      }
    </div>
  )
}

export default Cart
