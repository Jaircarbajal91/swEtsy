import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory, Redirect } from "react-router-dom"
import { getCartItemsThunk } from "../../store/cart";
import CartItem from "./CartItem";
import CartTotalCard from "./CartTotalCard";
import './Cart.css';

const Cart = ({ cartItems, sessionUser, setShowLogin, cartLoaded, setCartLoaded }) => {
  //   const history = useHistory();
  const dispatch = useDispatch();
  let initialSubtotal = 0;
  if (cartItems) {
    for (let item of cartItems) {
      initialSubtotal += item.quantity * item.product_detail.price;
    };
  }

  //   const [subtotal, setSubtotal] = useState(initialSubtotal);
  //   const [discount, setDiscount] = useState(initialSubtotal * 0.2);
  //   const [total, setTotal] = useState(initialSubtotal - discount);

  useEffect(() => {
    if (sessionUser) {
      dispatch(getCartItemsThunk()).then(() => setCartLoaded(true))
    }
  }, [cartItems?.length])

  // if (!sessionUser) {
  //   history.push('/')
  //   setShowLogin(true);
  // };

  if (!sessionUser) {
    setShowLogin(true)
    return <Redirect to='/' />
  }

  return cartLoaded && (
    <div className="cart-master-div">
      {cartItems?.length > 0 && <div className="cart-left">
        {cartItems?.length > 0 && <h2 className="num-items-in-cart">{cartItems.length}&nbsp;items in your cart</h2>}
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
          <NavLink style={{
            color: 'black'
          }} to='/'>Discover something unique to fill it up</NavLink>
        </div>
      }
    </div>
  )
}

export default Cart
