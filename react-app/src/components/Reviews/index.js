import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { Modal } from '../../context/Modal';
import { getReviewsThunk, getMyReviewThunk, createReviewThunk, editReviewThunk, deleteReviewThunk } from "../../store/search";

const Review = () => {
    return (
        <h1>product reviews!!</h1>
    )
}
