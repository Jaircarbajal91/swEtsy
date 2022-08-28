import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom"
import DeleteProduct from "../DeleteProduct";
import UpdateProduct from "../UpdateProduct";
import { Modal } from "../../context/Modal";
import { getProductsThunk } from "../../store/products";
import { deleteProductThunk } from "../../store/products";
import { addCartItemThunk, getCartItemsThunk } from "../../store/cart";
import Stars from "../Reviews/Stars";
import Reviews from '../Reviews'
import AddAReview from '../CreateReview'

const ProductDetail = () => {
  const { id } = useParams()
  const [showUpdate, setShowUpdate] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [quantity, setQuantity] = useState(1);
  const [deleted, setDeleted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const product = useSelector(state => state.products[id])
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(getProductsThunk()).then(() => setIsLoaded(true))
  }, [dispatch])

  useEffect(() => {
    if (deleted) {
      setIsLoaded(false)
      dispatch(deleteProductThunk(id)).then(() => dispatch(getProductsThunk()).then(() => history.push('/')))
    }
  }, [deleted, dispatch])

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const addToCart = async () => {

    await dispatch(addCartItemThunk(id, { quantity }))
    await dispatch(getCartItemsThunk())
    history.push('/cart')
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
    <div className="product detail container">
      <div className="product detail image">
        <img src={product.image} alt="" />
      </div>
      <div className="product detail name">
        <p>{product.name}</p>
      </div>
      <div className="product detail stars">
        <Stars rating={2.4} />
      </div>
      <div className="product detail description">
        <p>{product.description}</p>
      </div>
      <div className="product detail price">
        <p>{formatter.format(product.price)}</p>
      </div>
      <div className="product detail stars">
        <Stars rating={2.4} />
      </div>
      {product.owner_id === sessionUser?.id && (
        <div>
          <button
            onClick={() => setShowUpdate(true)}>Edit</button>
          <button
            onClick={() => setShowDelete(true)}>Delete</button>
          {showUpdate && (
            <Modal onClose={() => setShowUpdate(false)}>
              <UpdateProduct product={product} setShowUpdate={setShowUpdate} />
            </Modal>
          )}
          {showDelete && (
            <Modal onClose={() => setShowDelete(false)} >
              <DeleteProduct setDeleted={setDeleted} setShowDelete={setShowDelete} />
            </Modal>
          )}
        </div>
      )}
      {sessionUser && (
        <div>
          <select value={quantity} onChange={e => setQuantity(e.target.value)}>
            {options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <div className="button add-to-cart">
            <button onClick={() => addToCart()}>Add to Cart</button>
          </div>

        </div>
      )}
      <Reviews product={product} />
      <AddAReview product={product} />
    </div>
  )
}

export default ProductDetail;
