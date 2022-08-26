import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { Modal } from '../../context/Modal';
import { getSearchThunk } from "../../store/search";


const SearchResult = () => {
    const { search } = useLocation()
    // useMemo(() => {
    let query = new URLSearchParams(search)
    // }, [search])
    console.log('what would it be??', query)
    console.log('what would keyword be??', query.get('keyword'))
    console.log('what would minPrice be??', query.get('minPrice'))
    const dispatch = useDispatch();
    const history = useHistory();
    const [keyword, setKeyWord] = useState(query.get('keyword'))
    const [minPrice, setMinPrice] = useState(query.get('minPrice'))
    const [maxPrice, setMaxPrice] = useState(query.get('maxPrice'))
    const [ownerId, setOwnerId] = useState(query.get('ownerId'))
    const [showFilterModal, setShowFilterModal] = useState(false)
    const [sortBy, setSortBy] = useState()
    const sessionUser = useSelector(state => state.session.user);
    const products = useSelector(state => state.session.products);

    let filtered = []
    const data = { keyword, minPrice, maxPrice, ownerId }
    for (let key in data) {
        if (data[key] !== undefined) {
            filtered.push(`${key}=${data[key]}`)
        }
    }
    let filterstring = filtered.join("&")

    useEffect(() => {
        dispatch(getSearchThunk(filterstring))
    }, [dispatch, filterstring])

    const sortSelected = async e => {
        e.preventDefault();
        setSortBy(e.target.value);
    }

    const handleSearch = async e => {
        e.preventDefault();
        dispatch(getSearchThunk(filterstring))
            .then((res) => {
                history.push(`/search?${filtered.join("&")}`)
                // should we redirect??
            })
    }

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
                                onChange={e => setKeyWord(e.target.valye)}
                            ></input>
                            <button onClick={e => setKeyWord('')}>clear</button>
                        </fieldset>
                        <br></br>
                        <fieldset>Price
                            <div>
                                <input
                                    type="radio"
                                    name='price'
                                    value={{ 'minPrice': 0, 'maxPrice': 50 }}
                                    onClick={e => {
                                        setMinPrice(e.target.value.minPrice)
                                        setMaxPrice(e.target.value.minPrice)
                                    }}
                                />{`$0 to $50`} <br></br>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name='price'
                                    value={{ 'minPrice': 50, 'maxPrice': 100 }}
                                    onClick={e => {
                                        setMinPrice(e.target.value.minPrice)
                                        setMaxPrice(e.target.value.minPrice)
                                    }}
                                />{`$50 to $100`} <br></br>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name='price'
                                    value={{ 'minPrice': 100 }}
                                    onClick={e => {
                                        setMinPrice(e.target.value.minPrice)
                                    }}
                                />{`over $100`} <br></br>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name='price'
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
                                /><br></br>
                            </div>
                        </fieldset>
                        <br></br>
                        <button onClick={() => setShowFilterModal(false)}>Cancel</button>
                        <button onClick={handleSearch}>Apply</button>
                    </div>
                </Modal>}
            <select className='search sort' onChange={sortSelected} value={sortBy}>
                <option value='' selected disabled> Sort by</option>
                <option value='lowest'>Lowest Price</option>
                <option value='highest'>Highest Price</option>
                <option value='topreview'>Top Customer Reviews</option>
                <option value='mostrecent'>Most Recent</option>
            </select>
        </>
    )
}



export default SearchResult;
