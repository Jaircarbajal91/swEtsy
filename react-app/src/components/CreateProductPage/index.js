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
    const [page, setPage] = useState(1);
    const [nameErrors, setNameErrors] = useState([]);
    const [descriptionErrors, setDescriptionErrors] = useState([]);
    const [imageErrors, setImageErrors] = useState([]);
    const [priceErrors, setPriceErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    const sessionUser = useSelector(state => state.session.user);
    
    useEffect(() => {
        if (page === 1) {
            const newNameErrors = [];
            if (!name.length) {
                newNameErrors.push('Please give your product a name');
            }
            setNameErrors(newNameErrors);
            if (!nameErrors.length) setIsDisabled(false);
            else setIsDisabled(true);
        }
    }, [name, nameErrors.length, page]);

    useEffect(() => {
        if (page === 2) {
            const newDescriptionErrors = [];
            if (!description.length) {
                newDescriptionErrors.push('Please describe your product!');
            }
            setDescriptionErrors(newDescriptionErrors);
            if (!descriptionErrors.length) setIsDisabled(false);
            else setIsDisabled(true);
        }
    }, [description, descriptionErrors.length, page]);

    useEffect(() => {
        if (page === 3) {
            const newImageErrors = [];
            if (!image.length) {
                newImageErrors.push('Please enter an image URL');
            }
            setImageErrors(newImageErrors);
            if (!imageErrors.length) setIsDisabled(false);
            else setIsDisabled(true);
        }
    }, [image, imageErrors.length, page]);

    useEffect(() => {
        if (page === 4) {
            const newPriceErrors = [];
            if (price <= 0 || (price * 100) % 1 !== 0) newPriceErrors.push('Please enter a valid price');
            setPriceErrors(newPriceErrors);
            if (!priceErrors.length) setIsDisabled(false);
            else setIsDisabled(true);
        }
    }, [price, priceErrors.length, page]);

    const handleSubmit = async e => {
        e.preventDefault();
        setHasSubmitted(true);
        if (
            nameErrors.length ||
            descriptionErrors.length ||
            imageErrors.length ||
            priceErrors.length
        ) return;

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
            {page === 1 &&
                <input
                    placeholder='What are you selling?'
                    className='input-field'
                    type='text'
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            }
            {page === 2 &&
                <input
                    placeholder='Tell us about your product!'
                    className='input-field'
                    type='text'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            }
            {page === 3 &&
                <input
                    placeholder='Please upload an image'
                    className='input-field'
                    type='text'
                    value={image}
                    onChange={e => setImage(e.target.value)}
                />
            }
            {page === 4 &&
                <input
                    placeholder='How much do you want to charge?'
                    className='input-field'
                    type='number'
                    min='0'
                    step='.01'
                    pattern="^\d+(?:\.\d{1,2})?$"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    required
                />
            }
            {page > 1 && <button className='back button' onClick={() => setPage(currPage => currPage - 1)}>Back</button>}
            {page < 4 && <button disabled={isDisabled} className='next button' onClick={() => setPage(currPage => currPage + 1)}>Next</button>}
            {page === 4 && <button disabled={isDisabled} className='submit button' type='submit'>List Product</button>}
            </div>
        </form>
    );
};
