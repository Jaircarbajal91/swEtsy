import { useHistory } from "react-router-dom"
import CartItem from "./CartItem";



const Cart = ({ cartItems, sessionUser, setShowLogin }) => {
  const history = useHistory();

  if (!sessionUser) {
    setShowLogin(true);
    history.push('/login')
  };

  return (
    <div>
      {cartItems.map((item, i) => (
        <div key={i}>
          <CartItem item={item} />
        </div>
      ))}
    </div>

  )
}

export default Cart
