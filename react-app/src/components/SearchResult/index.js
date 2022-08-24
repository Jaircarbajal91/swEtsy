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
                <Modal onClose={() => setShowModal(false)}>Modal Filter</Modal>}
        </>
    )
}



export default SearchResult;
