import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getMyReviewThunk, createReviewThunk, editReviewThunk, deleteReviewThunk } from "../../store/review";

export default function AddAReview() {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);

    return (
        <form>
            create review form
        </form>
    )
}
