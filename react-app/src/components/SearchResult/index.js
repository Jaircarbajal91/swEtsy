import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { Modal } from '../../context/Modal';
import { getSearchThunk } from "../../store/search";
import Product from '../Products/Product';


const SearchResult = () => {
    const { search } = useLocation()
    // useMemo(() => {
    let query = new URLSearchParams(search)
    // }, [search])
    // console.log('what would it be??', query)
    // console.log('what would keyword be??', query.get('keyword'))
    // console.log('what would minPrice be??', query.get('minPrice'))
    const dispatch = useDispatch();
    const history = useHistory();
    const [keyword, setKeyWord] = useState(query.get('keyword'))
    const [minPrice, setMinPrice] = useState(query.get('minPrice'))
    const [maxPrice, setMaxPrice] = useState(query.get('maxPrice'))
    const [ownerId, setOwnerId] = useState(query.get('ownerId'))
    const [customPrice, setCustomPrice] = useState(false)
    const [showFilterModal, setShowFilterModal] = useState(false)
    const [order, setOrder] = useState(query.get('order'));
    const sessionUser = useSelector(state => state.session.user);
    const searchProducts = useSelector(state => state.search.products);

    let filtered = []
    const data = { keyword, minPrice, maxPrice, ownerId, order }
    for (let key in data) {
        if (data[key]) {
            filtered.push(`${key}=${data[key]}`)
        }
    }


    let filterstring = filtered.join("&")


    // console.log('it is -=-------', data)
    // console.log('it is -=-------', filtered)
    // console.log('it is -=-------', filterstring)

    useEffect(() => {
        dispatch(getSearchThunk(filterstring))
    }, [dispatch, filterstring])

    const sortSelected = e => {
        e.preventDefault();
        setOrder(prev => {
            // console.log(prev);
            // console.log(e.target.value)
            if(e.target.value){
                data.order = e.target.value === 'none'?undefined:e.target.value
            }
            let filterInSort = []
            console.log('-'*30)
            console.log(data)
            for (let key in data) {
                if (data[key]) {
                    filterInSort.push(`${key}=${data[key]}`)
                }
            }
            let filterStringWithOrder = filterInSort.join('&');
            setShowFilterModal(false)
            // setKeyWord('')
            // setMinPrice('')
            // setMaxPrice('')
            // setOwnerId('')
            // setCustomPrice('')
            history.push(`/search?${filterStringWithOrder}`)
            return e.target.value
        });
    }

    const handleSearch = async e => {
        e.preventDefault();
        // dispatch(getSearchThunk(filterstring))
            // .then((res) => {
        let filterForApply = []
        for (let key in data) {
            if (data[key]) {
                filterForApply.push(`${key}=${data[key]}`)
            }
        }
        let filterStringForApply = filterForApply.join('&');
        setShowFilterModal(false)
        // setKeyWord('')
        // setMinPrice('')
        // setMaxPrice('')
        // setOwnerId('')
        // setCustomPrice('')
        history.push(`/search?${filterStringForApply}`)
            // })
    }

    const handleCancel = async e => {
        e.preventDefault();
        setKeyWord('')
        setMinPrice('')
        setMaxPrice('')
        setOwnerId('')
        setCustomPrice('')
        setShowFilterModal(false)
    }

    let range = { min1: '0', min2: '50', min3: '100' }

    let productPage = (
        <div className='search-container'>
            {searchProducts && searchProducts.length ? (
                <div className='products container search-products-container'>
                    {searchProducts.map(product => (
                        <Product key={product.id} product={product} />
                    ))}
                </div>
            ):(
                <div className='empty-search-container'>
                    <h1>No Search Results!</h1>
                </div>
            )}
        </div>
    )

    return (
        <>
            <button onClick={() => setShowFilterModal(true)}>All Filters</button>
            {showFilterModal &&
                <Modal onClose={() => setShowFilterModal(false)}>
                    <div>
                        <h1>Filters</h1>
                        <fieldset> Keyword Search
                            <br></br>
                            <input
                                type='text'
                                placeholder="search for anything"
                                value={keyword}
                                onChange={e => setKeyWord(e.target.value)}
                            ></input>
                            <button onClick={e => setKeyWord('')}>clear</button>
                        </fieldset>
                        <br></br>
                        <fieldset>Price
                            <div>
                                <input
                                    type="radio"
                                    name='price'
                                    onClick={e => {
                                        setMinPrice(range.min1)
                                        setMaxPrice(range.min2)
                                        setCustomPrice(true)
                                    }}
                                    checked={minPrice===range.min1 && customPrice}
                                />{`$0 to $50`} <br></br>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name='price'
                                    onClick={e => {
                                        setMinPrice(range.min2)
                                        setMaxPrice(range.min3)
                                        setCustomPrice(true)
                                    }}
                                    checked={minPrice===range.min2 && customPrice}
                                />{`$50 to $100`} <br></br>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name='price'
                                    value={{ 'minPrice': 100 }}
                                    onClick={e => {
                                        setMinPrice(range.min3)
                                        setMaxPrice('')
                                        setCustomPrice(true)
                                    }}
                                    checked={minPrice===range.min3 && customPrice}
                                />{`over $100`} <br></br>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name='price'
                                    onClick={() => {
                                        setCustomPrice(false)
                                        // setMinPrice(0)
                                        // setMaxPrice(0)
                                    }}
                                    checked={!customPrice}
                                />{`Custom Price Range`}<br></br>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    name='min'
                                    placeholder='Low'
                                    step={1}
                                    min={0}
                                    value={minPrice}
                                    onChange={e => setMinPrice(e.target.value)}
                                    disabled={customPrice}
                                />
                                to
                                <input
                                    type="number"
                                    name='max'
                                    placeholder='High'
                                    step={1}
                                    min={0}
                                    value={maxPrice}
                                    onChange={e => setMaxPrice(e.target.value)}
                                    disabled={customPrice}
                                /><br></br>
                            </div>
                        </fieldset>
                        <br></br>
                        <button onClick={handleCancel}>Clear</button>
                        <button onClick={handleSearch}>Apply</button>
                    </div>
                </Modal>}
            <select className='search sort' onChange={sortSelected} value={order}>
                <option value='none' selected>Default</option>
                <option value='ascPrice' >Lowest Price</option>
                <option value='descPrice' >Highest Price</option>
                {/* <option value='descReview'>Top Customer Reviews</option> */}
                <option value='descCreate' >Most Recent</option>
            </select>
            {productPage}
        </>
    )
}



export default SearchResult;
