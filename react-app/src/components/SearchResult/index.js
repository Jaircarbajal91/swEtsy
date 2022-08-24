import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { Modal } from '../../context/Modal';

const SearchResult = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [inputText, setInputText] = useState('');
    const [showFilterModal, setShowFilterModal] = useState(false)
    const [sortBy, setSortBy] = useState('')

    const sessionUser = useSelector(state => state.session.user);
    const products = useSelector(state => state.session.products);

    const sortSelected = async e => {
        e.preventDefault();
        setSortBy(e.target.value);
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
                            <input type='text'></input>
                            <button>clear</button>
                        </fieldset>
                        <br></br>
                        <fieldset>Price
                            <div>
                                <input type="radio" name='price' value={{ 'minPrice': 0, 'maxPrice': 50 }} />{`$0 to $500`} <br></br>
                            </div>
                            <div>
                                <input type="radio" name='price' value={{ 'minPrice': 50, 'maxPrice': 100 }} />{`$50 to $100`} <br></br>
                            </div>
                            <div>
                                <input type="radio" name='price' value={{ 'minPrice': 100, 'maxPrice': 200 }} />{`$100 to $200`} <br></br>
                            </div>
                            <div>
                                <input type="radio" name='price' />{`Custom Price Range`}<br></br>
                            </div>
                            <div>
                                <input type="number" name='min' placeholder='Low' step={1} min={0} /><br></br>
                                <input type="number" name='max' placeholder='High' step={1} min={0} /><br></br>
                            </div>
                        </fieldset>
                        <br></br>
                        <button>Cancel</button>
                        <button>Apply</button>
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
