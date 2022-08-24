import { NavLink, useHistory } from "react-router-dom"
import CartItem from "./CartItem";
import CartTotalCard from "./CartTotalCard";


const Cart = ({ cartItems, sessionUser, setShowLogin }) => {
  const history = useHistory();

  if (!sessionUser) {
    setShowLogin(true);
    history.push('/login')
  };

  return (
    <div>
      {cartItems.length > 0 && cartItems.map((item, i) =>
        <div>
          <div key={i}>
            <CartItem item={item} />
          </div>
        </div>
      )}
      {cartItems.length > 0 &&
        <CartTotalCard cartItems={cartItems} />
      }
      {!cartItems.length &&
        <div>
          <h1>Your cart is empty.</h1>
          <NavLink to='/'>Discover something unique to fill it up</NavLink>
        </div>
      }
    </div>

  )
}

export default Cart
