import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, StaticRouter, useHistory, useLocation } from 'react-router-dom'
import { Modal } from '../../context/Modal';
import { getSearchThunk } from "../../store/search";
import Product from '../Products/Product';
import './searchResult.css';


const SearchResult = ({ searchWords, setSearchWords }) => {
    const { search } = useLocation()
    let query = new URLSearchParams(search)

    const dispatch = useDispatch();
    const history = useHistory();
    const sanitizedKey = query.get('keyword') ? query.get('keyword').replaceAll(/[^A-Za-z0-9 +\-]/g, '') : ''
    const [keyword, setKeyWord] = useState(sanitizedKey || searchWords)
    const [minPrice, setMinPrice] = useState(query.get('minPrice') || '')
    const [maxPrice, setMaxPrice] = useState(query.get('maxPrice') || '')
    const [ownerId, setOwnerId] = useState(query.get('ownerId') || '')
    const [customPrice, setCustomPrice] = useState(true)
    const [showFilterModal, setShowFilterModal] = useState(false)
    const [order, setOrder] = useState(query.get('order') || '');
    const [radioMin, setRadioMin] = useState(minPrice)
    const [radioMax, setRadioMax] = useState(maxPrice)
    const [rangeArray, setRangeArray] = useState([minPrice, maxPrice])
    const sessionUser = useSelector(state => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false);
    const searchProducts = useSelector(state => state.search.products);
    const searchResultCount = useSelector(state => state.search.size)



    useEffect(() => {
        setKeyWord(searchWords)
    }, [searchWords])

    let filtered = []
    const data = { keyword, minPrice, maxPrice, ownerId, order }
    for (let key in data) {
        if (data[key]) {
            filtered.push(`${key}=${data[key]}`)
        }
    }

    let filterstring = filtered.join("&")
    // console.log('filterstring: ', filterstring)
    // console.log('search:', search)
    // console.log(('?'+filterstring) === search)

    // console.log('it is -=-------', data)
    // console.log('it is -=-------', filtered)
    // console.log('it is -=-------', filterstring)


    useEffect(() => {
        let filterInClick = []
        // console.log(search)
        let query = new URLSearchParams(search)
        data.keyword = query.get('keyword')
        for (let key in data) {
            if (data[key]) {
                filterInClick.push(`${key}=${data[key]}`)
            }
        }
        let filterStringInClick = filterInClick.join("&")
        // console.log('filterStringInClick:', filterStringInClick)
        dispatch(getSearchThunk(filterStringInClick)).then(() => setIsLoaded(true))
        // history.push(`/search?${filterstring}`)
    }, [dispatch, filterstring, query.get('keyword')])

    const sortSelected = e => {
        e.preventDefault();
        setOrder(prev => {

            if (e.target.value) {
                data.order = e.target.value === 'none' ? undefined : e.target.value
            }
            let filterInSort = []
            // console.log('-' * 30)
            // console.log(data)
            for (let key in data) {
                if (data[key]) {
                    filterInSort.push(`${key}=${data[key]}`)
                }
            }
            let filterStringWithOrder = filterInSort.join('&');
            setShowFilterModal(false)
            history.push(`/search?${filterStringWithOrder}`)
            return e.target.value
        });
    }

    const handleSearch = async e => {
        e.preventDefault();

        setRangeArray(prev => {
            let range = [];
            let filterForApply = []
            let priceFilter = [parseInt(radioMin), parseInt(radioMax)]
            // console.log(priceFilter)
            if (priceFilter[1] || priceFilter[1] === 0) {
                setMinPrice(Math.min(...priceFilter).toString())
                setMaxPrice(Math.max(...priceFilter).toString())
                range[0] = Math.min(...priceFilter).toString();
                range[1] = Math.max(...priceFilter).toString();
            } else {
                setMinPrice(priceFilter[0].toString())
                setMaxPrice('')
                range[0] = (priceFilter[0].toString())
                range[1] = '';
            }
            data.minPrice = range[0]
            data.maxPrice = range[1]
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
            // console.log('fsfa:', filterStringForApply)
            filterstring = filterStringForApply
            history.push(`/search?${filterStringForApply}`)
            return range
        })
        // })
    }

    const handleCancel = async e => {
        e.preventDefault();
        // setKeyWord('')
        setMinPrice('')
        setMaxPrice('')
        setRadioMin('')
        setRadioMax('')
        setOwnerId('')
        setCustomPrice(true)
        setShowFilterModal(false)
        history.push(`/search?keyword=${keyword}`)
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
            ) : (
                <div className='empty-search-container'>
                    <h1>We couldn't find any results for</h1>
                    <h1>{sanitizedKey}</h1>
                    <p>Try searching something else instead?</p>
                </div>
            )}

        </div>
    )

    return isLoaded && (
        <>
            {showFilterModal &&
                <Modal onClose={() => setShowFilterModal(false)}>
                    <div className='filter-slide-bar'>
                        <h1 className='filter-title'>Filters</h1>
                        {/* <fieldset> Keyword Search
                            <br></br>
                            <input
                                type='text'
                                placeholder="search for anything"
                                value={keyword}
                                onChange={e => setKeyWord(e.target.value)}
                            ></input>
                            <button onClick={e => setKeyWord('')}>clear</button>
                        </fieldset> */}
                        <br></br>
                        <fieldset className='filter-price-field'><span className='filter-price-field-title'>Price ($)</span>
                            <div className='filter-price-0 filter-price-radio'>
                                <input
                                    type="radio"
                                    name='price'
                                    onClick={e => {
                                        setRadioMin(range.min1)
                                        setRadioMax(range.min2)
                                        setCustomPrice(true)
                                    }}

                                    checked={radioMin === range.min1 && customPrice}
                                /><span>
                                    {`$0 to $50`}
                                </span><br></br>
                            </div>
                            <div className='filter-price-50 filter-price-radio'>
                                <input
                                    type="radio"
                                    name='price'
                                    onClick={e => {
                                        setRadioMin(range.min2)
                                        setRadioMax(range.min3)
                                        setCustomPrice(true)
                                    }}

                                    checked={radioMin === range.min2 && customPrice}

                                /><span>
                                {`$50 to $100`}
                            </span><br></br>
                            </div>
                            <div className='filter-price-100 filter-price-radio'>
                                <input
                                    type="radio"
                                    name='price'
                                    value={{ 'minPrice': 100 }}
                                    onClick={e => {
                                        setRadioMin(range.min3)
                                        setRadioMax('')
                                        setCustomPrice(true)
                                    }}

                                    checked={radioMin === range.min3 && customPrice}

                                /><span>
                                {`over $100`}
                            </span><br></br>
                            </div>
                            <div className='filter-price-custom filter-price-radio'>
                                <input
                                    type="radio"
                                    name='price'
                                    onClick={() => {
                                        setCustomPrice(false)
                                        // setMinPrice(0)
                                        // setMaxPrice(0)
                                    }}
                                    checked={!customPrice}
                                /><span>
                                {`Custom Price Range`}
                            </span><br></br>
                            </div>
                            <div className='filter-price-custom-container'>
                                <input
                                    className='filter-price-low filter-price-input'
                                    type="number"
                                    name='min'
                                    placeholder='Low'
                                    step={1}
                                    min={0}
                                    value={radioMin}
                                    onChange={e => setRadioMin(e.target.value)}
                                    disabled={customPrice}
                                />
                                <p className='filter-price-custom-to'>
                                    to
                                </p>
                                <input
                                    className='filter-price-high filter-price-input'
                                    type="number"
                                    name='max'
                                    placeholder='High'
                                    step={1}
                                    min={0}
                                    value={radioMax}
                                    onChange={e => setRadioMax(e.target.value)}
                                    disabled={customPrice}
                                /><br></br>
                            </div>
                        </fieldset>
                        <br></br>
                        <div className='filter-button-container'>
                            <button className='filter-button filter-clear-button' onClick={handleCancel}>Clear</button>
                            <button className='filter-button filter-apply-button' onClick={handleSearch}>Apply</button>
                        </div>
                    </div>
                </Modal>}
                <div className='search-rule-container'>
                    <div className='search-rule-left'>
                        <button className='search-products-filter-button' onClick={() => setShowFilterModal(true)}>All Filters</button>
                    </div>
                    <div className='search-rule-right'>
                        {
                        searchResultCount ? (
                        <p className='search-products-count'>{searchResultCount ? searchResultCount : '0'} results, without ads</p>
                    ) : (<p></p>)}
                        <select className='search-sort' onChange={sortSelected} value={order}>
                            <option className='search-sort-selection search-sort-default' value='none' selected>Default</option>
                            <option className='search-sort-selection search-sort-ascPrice' value='ascPrice' >Lowest Price</option>
                            <option className='search-sort-selection search-sort-descPrice' value='descPrice' >Highest Price</option>
                            {/* <option value='descReview'>Top Customer Reviews</option> */}
                            <option className='search-sort-selection search-sort-descCreate' value='descCreate' >Most Recent</option>
                        </select>
                    </div>
                </div>
            {productPage}
        </>
    )
}



export default SearchResult;
