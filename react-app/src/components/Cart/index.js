import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom"
import { getCartItemsThunk } from "../../store/cart";
import CartItem from "./CartItem";
import CartTotalCard from "./CartTotalCard";


const Cart = ({ cartItems, sessionUser, setShowLogin, cartLoaded, setCartLoaded }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItemsThunk()).then(() => setCartLoaded(true))
  }, [cartItems?.length])

  if (!sessionUser) {
    setShowLogin(true);
    history.push('/login')
  };

  return cartLoaded && (
    <div>
      {cartItems?.length > 0 && cartItems?.map((item, i) =>
        <div>
          <div key={i}>
            <CartItem item={item} />
          </div>
        </div>
      )}
      {cartItems?.length > 0 &&
        <CartTotalCard cartItems={cartItems} />
      }
      {!cartItems?.length &&
        <div>
          <h1>Your cart is empty.</h1>
          <NavLink to='/'>Discover something unique to fill it up</NavLink>
        </div>
      }
    </div>

  )
}

export default Cart
