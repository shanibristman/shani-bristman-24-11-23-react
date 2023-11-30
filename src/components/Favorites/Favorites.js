import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrent, fetchAllWeek, changeKey, changeCity } from '../../reducers/dataSlice';

import { useNavigate } from 'react-router-dom';
import './Favorites.css'

export default function Favorites() {

    const favoritesCart = JSON.parse(localStorage.getItem('favorites'))

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { darkMode } = useSelector((state) => state.data)

    const goToHomePage = (key, city) => {
        dispatch(changeKey(key))
        dispatch(changeCity(city))
        dispatch(fetchCurrent())
        dispatch(fetchAllWeek())
        navigate('/');
    }

    return (
        <div className={`all_cart ${darkMode ? 'dark-background' : 'light-background'}`}>
            <div className={`${darkMode ? 'color-d' : 'color-l'}`}>MT FAVORITES :</div>
            <div className='fav-list'>
                {favoritesCart && favoritesCart.map(item => (
                    <div key={item.id} className={`ticket ${darkMode ? 'dark-container' : 'light-container'}`} onClick={() => goToHomePage(item.id, item.city)}>
                        <i className="fa-regular fa-bookmark saved"></i>
                        <div>{item.city}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
