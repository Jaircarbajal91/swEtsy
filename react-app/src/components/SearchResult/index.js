import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { Modal } from '../../context/Modal';

const SearchResult = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [inputText, setInputText] = useState('');
    const [showModal, setShowModal] = useState(false)

    const sessionUser = useSelector(state => state.session.user);
    const products = useSelector(state => state.session.products);
    return (
        <>
            <button onClick={() => setShowModal(true)}>All Filters</button>
            {showModal &&
                <Modal onClose={() => setShowModal(false)}>
                    <h1>Filters</h1>
                    <div>
                        <div>Keyword Search
                            <br></br>
                            <input></input>
                        </div>
                        <br></br>
                        <div>Price
                            <br></br>
                            <input type="radio" name='range 0 to 50' value={{ 'minPrice': 0, 'maxPrice': 50 }} />{`$0 to $500`} <br></br>
                            <input type="radio" name='range 50 to 100' value={{ 'minPrice': 50, 'maxPrice': 100 }} />{`$50 to $100`} <br></br>
                            <input type="radio" name='range 100 to 200' value={{ 'minPrice': 100, 'maxPrice': 200 }} />{`$100 to $200`} <br></br>
                            <br></br>
                            <div> Custom Price Range
                                <div className='search price title'>Low</div>
                                <input className='search price input' />
                                <div className='search price title'>High</div>
                                <input className='search price input' />
                            </div>
                        </div>
                    </div>
                </Modal>}
        </>
    )
}



export default SearchResult;
