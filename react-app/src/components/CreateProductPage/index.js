import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createProductThunk } from '../../store/products';
import './createProduct.css';
import background from './bg.jpg';

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
    // const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        if (page === 1) {
            const newNameErrors = [];
            if (!name.length) {
                newNameErrors.push('Please give your product a name');
            }
            if (name.length > 40 || name.length < 3) {
                newNameErrors.push('Name must be between 3 and 40 characters');
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
            if (description.length > 200 || description.length < 1) {
                newDescriptionErrors.push('Description must between 1 and 200 characters');
            }
            setDescriptionErrors(newDescriptionErrors);
            if (!descriptionErrors.length) setIsDisabled(false);
            else setIsDisabled(true);
        }
    }, [description, descriptionErrors.length, page]);

    useEffect(() => {
        if (page === 3) {
            const newImageErrors = [];
            const regex = /^http[^ \!@\$\^&\(\)\+\=]+(\.png|\.jpeg|\.gif|\.jpg)$/;

            if (!image.match(regex)) {
                newImageErrors.push('Please enter a valid image address')
                newImageErrors.push('E.g. "https://example.com/image.jpg"')
            }
            if(image.length > 250){
                newImageErrors.push('Image link cannot go over than 250 characters.')
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
            if (price > 1000000) newPriceErrors.push('Price is capped at $1,000,000');
            setPriceErrors(newPriceErrors);
            if (!priceErrors.length) setIsDisabled(false);
            else setIsDisabled(true);
        }
    }, [price, priceErrors.length, page]);

    const handleSubmit = async e => {
        e.preventDefault();
        // setHasSubmitted(true);
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
            price: Number(price),
        };

        const newProduct = await dispatch(createProductThunk(payload));
        history.push(`/products/${newProduct.id}`);
    }

    // If user not logged in, then return user to homepage
    if (!sessionUser) history.push('/')


    const handleFormPress = e => {
        if (e.keyCode === 13) {
            e.preventDefault()
        }
    }
    return (
        <form className='newproduct-form' onSubmit={handleSubmit} onKeyDown={handleFormPress}>
            <img className='newproduct-background' src={background} alt='background'></img>
            <div className='inner-form'>
                <h2 className='newproduct-title'>Millions of shoppers cannot wait to see what you have in store</h2>
                <h3 className='newproduct-title'>List your product now</h3>
                {page === 1 &&
                    <div className='form name container'>
                        <div className='product-form-errors-container'>
                            <h3 className='newproduct-title-sub'>Name your product :</h3>
                            {nameErrors.length > 0 && (
                                <ul className='form-errors-name'>
                                    {nameErrors.map(error => (
                                        <li key={error}>{error}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <input
                            placeholder='What are you selling?'
                            className='newproduct-input-field'
                            type='text'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                }
                {page === 2 &&
                    <div className='form description container'>
                        <div className='product-form-errors-container'>
                            <h3 className='newproduct-title-sub'>Describe your product :</h3>
                            {descriptionErrors.length > 0 && (
                                <ul className='form errors description'>
                                    {descriptionErrors.map(error => (
                                        <li key={error}>{error}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <input
                            placeholder='Tell us about your product!'
                            className='newproduct-input-field'
                            type='text'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                }
                {page === 3 &&
                    <div className='form image container'>
                        <div className='product-form-errors-container'>
                            <h3 className='newproduct-title-sub'>Post product image :</h3>
                            {imageErrors.length > 0 && (
                                <ul className='form errors image'>
                                    {imageErrors.map(error => (
                                        <li key={error}>{error}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <input
                            placeholder='Please upload an image'
                            className='newproduct-input-field'
                            type='url'
                            value={image}
                            onChange={e => setImage(e.target.value)}
                        />
                    </div>
                }
                {page === 4 &&
                    <div className='form price container'>
                        <div className='product-form-errors-container'>
                            <h3 className='newproduct-title-sub'>Add product price :</h3>
                            {priceErrors.length > 0 && (
                                <ul className='form errors price'>
                                    {priceErrors.map(error => (
                                        <li key={error}>{error}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <input
                            placeholder='How much do you want to charge?'
                            className='newproduct-input-field'
                            type='number'
                            min='0'
                            max='1000000'
                            step='.01'
                            pattern="^\d+(?:\.\d{1,2})?$"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            required
                        />
                    </div>
                }
                <div className='newproduct-buttons-container'>
                    {page < 4 && <button disabled={isDisabled} className='next-button' onClick={(e) => {
                        e.preventDefault()
                        setPage(currPage => currPage + 1)
                    }}>Next</button>}
                    {page === 4 && <button disabled={isDisabled} className='submit-button' type='button' onClick={handleSubmit}>List Product</button>}
                    {page > 1 && <button className='back-button' onClick={(e) => {
                        e.preventDefault()
                        setPage(currPage => currPage - 1)
                    }}>Back</button>}
                </div>
            </div>
        </form>
    );
};
