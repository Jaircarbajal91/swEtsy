import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom"
import DeleteProduct from "../DeleteProduct";
import UpdateProduct from "../UpdateProduct";
import { Modal } from "../../context/Modal";
import { getProductsThunk } from "../../store/products";
import { deleteProductThunk } from "../../store/products";
import { addCartItemThunk, getCartItemsThunk } from "../../store/cart";
import Stars from "../Reviews/Stars";
import Reviews from '../Reviews'
import './ProductDetail.css'
import AddAReview from '../CreateReview'

const ProductDetail = () => {
    const { id } = useParams()
    const [showUpdate, setShowUpdate] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [quantity, setQuantity] = useState(1);
    const [isLoaded, setIsLoaded] = useState(false);
    const product = useSelector(state => state.products[id]);
    const rating = product?.avgScore;
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getProductsThunk()).then(() => setIsLoaded(true));
    }, [dispatch]);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const addToCart = async () => {
        await dispatch(addCartItemThunk(id, { quantity }));
        await dispatch(getCartItemsThunk());
        history.push('/cart');
    }

    const options = [];
    for (let i = 1; i <= 100; i++) {
        options.push(i);
    }

    if (!product) {
      return (
        <h1>404 Page not found</h1>
      )
    }

    return isLoaded && (
        <div className="center-the-page">
        <div className="product-detail-container">
            <div className="product-detail-left">
                <div className="product-image-container">
                    <img className="product-image" src={product.image} alt="" />
                </div>
                <div className="reviews">
                    <Reviews product={product} isLoaded={isLoaded} />
                </div>
            </div>
            <div className="product-detail-right">
                <div className="product-detail-name">
                    <p>{product.name}</p>
                </div>
                <div className="product-detail-stars">
                    <Stars rating={rating} />
                </div>
                <div className="product-detail-price">
                    <p>{formatter.format(product.price)}</p>
                </div>
                {product.owner_id === sessionUser?.id && (
                <div>
                    <div className="edit-delete">
                        <button
                            id="edit-button"
                            className="button"
                            onClick={() => setShowUpdate(true)}>Edit</button>
                        <button
                            id='delete-button'
                            className="button"
                            onClick={() => setShowDelete(true)}>Delete</button>
                    </div>
                    {showUpdate && (
                    <Modal onClose={() => setShowUpdate(false)}>
                        <UpdateProduct product={product} setShowUpdate={setShowUpdate} />
                    </Modal>
                    )}
                    {showDelete && (
                    <Modal onClose={() => setShowDelete(false)} >
                        <DeleteProduct id={id} setShowDelete={setShowDelete} />
                    </Modal>
                    )}
                </div>
                )}
                {sessionUser && (
                <div>
                    <label id="quantity-label">
                        <p>How many do you wish to purchase?</p>
                    </label>
                    <div className="custom-select">
                        <select id='quantity' value={quantity} onChange={e => setQuantity(e.target.value)}>
                        {options.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                        </select>
                    </div>
                    <div className="button add-to-cart">
                        <button className="button" id='add-button' onClick={() => addToCart()}>Add to Cart</button>
                    </div>
                </div>
                )}
                <div className="add-review-container">
                    <AddAReview product={product} />
                </div>
                <h4 id='description-heading'>Description</h4>
                <div className="product-detail-description">
                    <p>{product.description}</p>
                </div>
            </div>
        </div>
        </div>
        )
    }


export default ProductDetail;
