import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom"
import { editProductThunk, getProductsThunk } from "../../store/products";
import './UpdateProduct.css'

const UpdateProduct = ({ setShowUpdate, product }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const id = product.id;
  const sessionUser = useSelector(state => state.session.user);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState(product.image);
  const [price, setPrice] = useState(product.price);
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const newErrors = [];
    if (!name.length) newErrors.push('Please give your product a name');
    if (!description.length) newErrors.push('Please describe your product!');
    if (!image.length) newErrors.push('Please enter an image URL');
    if (price <= 0 || (price * 100) % 1 !== 0) newErrors.push('Please enter a valid price');
    setErrors(newErrors);
  }, [name, description, image, price]);

  const handleSubmit = async e => {
    e.preventDefault();
    setHasSubmitted(true);

    const payload = {
      id,
      name,
      description,
      image,
      price,
    }

    const product = await dispatch(editProductThunk(payload));
    const allProducts = await dispatch(getProductsThunk());
    setShowUpdate(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="inner-form update">
        <div className="form-errors-container">
          {errors.length > 0 && (<ul className="errors-list">
            {errors.map(error => (
              <li key={error}>{error}</li>
            ))}
          </ul>)}
        </div>
        <div className="form-fields">
          <label>Name</label>
          <input
            className="input-field"
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <label>Description</label>
          <input
            className="input-field"
            type='text'
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
          <label>Image URL</label>
          <input
            className="input-field"
            type='url'
            value={image}
            onChange={e => setImage(e.target.value)}
            required
          />
          <label>Price</label>
          <input
            className="input-field"
            type='number'
            min='0'
            max='1000000'
            step='.01'
            pattern="^\d+(?:\.\d{1,2})?$"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
          />
          <button type='submit' className="edit-prod-submit">Submit Changes</button>
        </div>
      </div>
    </form>
  )
}

export default UpdateProduct
