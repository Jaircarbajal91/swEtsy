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
    if (name.length > 40 || name.length < 3) newErrors.push('Name must be between 3 and 40 characters');
    if (!description.length) newErrors.push('Please describe your product!');
    if (description.length > 200 || description.length < 1) {
    newErrors.push('Description must between 1 and 200 characters');
    };
    if (!image.length) newErrors.push('Please enter an image URL');
    const regex = /^http[^ \!@\$\^&\(\)\+\=]+(\.png|\.jpeg|\.gif|\.jpg)$/;
    if (!image.match(regex)) {
        newErrors.push('Please enter a valid image address')
        newErrors.push('E.g. "https://example.com/image.jpg"')
    }
    if(image.length > 250){
        newErrors.push('Image link cannot go over than 250 characters.')
    }
    if (price <= 0 || !price.toString().match(/^\d+(?:\.\d{1,2})?$/) || price > 1000000) newErrors.push('Please enter a valid price');
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

    await dispatch(editProductThunk(payload));
    await dispatch(getProductsThunk());
    history.push(`/products/${id}`);
    setShowUpdate(false);
}

return (
    <form onSubmit={handleSubmit}>
    <div className="inner-form-update">
        <h2 className="edit-title">Edit your listing.</h2>
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
        <textarea
            className="input-field"
            id="description-field"
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
            id='price-field'
            type='number'
            min='0'
            max='1000000'
            step='.01'
            pattern="^\d+(?:\.\d{1,2})?$"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
        />
        <button type='submit' disabled={errors.length > 0} className="edit-prod-submit">Submit Changes</button>
        </div>
    </div>
    </form>
)
}

export default UpdateProduct
