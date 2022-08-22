import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createProductThunk } from '../../store/products';

export default function CreateProductPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState(0);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const sessionUser = useSelector(state => state.session.user);

    const handleSubmit = async e => {
        e.preventDefault();
        setHasSubmitted(true);
        if (errors.length) return;

        const payload = {
            name,
            description,
            owner_id: sessionUser.id,
            image,
            price,
        };

        const newProduct = await dispatch(createProductThunk(payload));
        history.push(`/products/${newProduct.id}`);
    }

    // If user not logged in, then return user to homepage
    if (!sessionUser) history.push('/')

    return (
        <form onSubmit={handleSubmit}>
            <div className='inner-form'>
                <label>Name</label>
                <input
                    placeholder='What are you selling?'
                    className='input-field'
                    type='text'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
                <label>Description</label>
                <input
                    placeholder='Tell us about your product!'
                    className='input-field'
                    type='text'
                    value={description}
                    onChange={e => setName(e.target.value)}
                    required
                />
                <label>Image URL</label>
                <input
                    placeholder='Please upload an image'
                    className='input-field'
                    type='text'
                    value={image}
                    onChange={e => setName(e.target.value)}
                    required
                />
                <label>Price</label>
                <input
                    placeholder='How much do you want to charge?'
                    className='input-field'
                    type='number'
                    value={price}
                    onChange={e => setName(e.target.value)}
                    required
                />
                <button className='submit-button' type='submit'>List Product</button>
            </div>
        </form>
    );
};
