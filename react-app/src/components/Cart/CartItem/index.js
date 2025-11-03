import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { editCartItemThunk, getCartItemsThunk, deleteCartItemThunk } from "../../../store/cart";
import '../Cart.css';

export default function CartItem({ item }) {
    const dispatch = useDispatch();
    const history = useHistory()
    const product = item.product_detail;
    const [quantity, setQuantity] = useState(item.quantity);

    const formatter = useMemo(() => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }), []);
    
    const [revenue, setRevenue] = useState(formatter.format(item.quantity * (product?.price || 0)))

    const options = [];
    for (let i = 1; i <= 100; i++) {
        options.push(i);
    }

    useEffect(() => {
        dispatch(editCartItemThunk(item.id, quantity)).then(async () => {
            const allItems = await dispatch(getCartItemsThunk());
            const cartDetails = allItems.cart_details;
            const editedItem = cartDetails.find(editItem => editItem.id === item.id);
            setRevenue(formatter.format(editedItem?.quantity * editedItem?.product_detail.price))
        });
    }, [quantity, item.id, formatter, dispatch]);

    const deleteCartItem = async () => {
        await dispatch(deleteCartItemThunk(item.id));
        await dispatch(getCartItemsThunk());
    }

    return (
        <div className="outmost-div">
            <div className="cart-item-left-section">
                <div className="cart-image-container" onClick={() => history.push(`/products/${product.id}`)}>
                    <img src={product.image} alt='product' />
                </div>
                <div className="cart-product-details">
                    <span className="cart-item name-text" onClick={() => history.push(`/products/${product.id}`)}>{product.name}</span>
                    <div className="product-description">{product.description}</div>
                    <div className='remove-item-button' onClick={() => deleteCartItem()}>Remove</div>
                </div>
            </div>
            <div className="cart-item-right-section">
                <div className="quantity-select-container">
                    <label htmlFor={`quantity-${item.id}`} className="quantity-label">Qty:</label>
                    <select 
                        id={`quantity-${item.id}`}
                        className="cart-quantity-options" 
                        value={quantity} 
                        onChange={e => setQuantity(Number(e.target.value))}
                    >
                        {options.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
                <div className="item-total-container">
                    <p>{revenue}</p>
                    <p>({formatter.format(product?.price || 0)} each)</p>
                </div>
            </div>
        </div>
    );
}
