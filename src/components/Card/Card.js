import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrent } from '../../reducers/dataSlice';

import './Card.css'

export default function Card() {

    const dispatch = useDispatch();
    const currentWeather = useSelector((state) => state.data.current[0]);
    const status = useSelector((state) => state.data.statusCurrent);
    const error = useSelector((state) => state.data.errorCurrent)
    const city = useSelector((state) => state.data.currentCity)
    const cityKey = useSelector((state) => state.data.currentKey)

    const { darkMode } = useSelector((state) => state.data);


    const [favoritesCart, setFavoriteCart] = useState(JSON.parse(localStorage.getItem('favorites')))
    const [isFavoriteCity, setIsFavoriteCity] = useState();
    const [celsius, setCelsius] = useState(true)


    const changeUnit = () => {
        setCelsius(!celsius)
    }
    const checkIsFavorite = () => {
        if (favoritesCart) {
            let res = favoritesCart.find(item => item.id === cityKey)
            if (res) {
                return true
            }
        }
        return false
    }


    const saveFavorite = () => {
        if (favoritesCart) {
            localStorage.setItem('favorites', JSON.stringify([...favoritesCart, { id: cityKey, city: city }]));
        }
        else {
            localStorage.setItem('favorites', JSON.stringify([{ id: cityKey, city: city }]))
        }

        setFavoriteCart(JSON.parse(localStorage.getItem('favorites')))
        setIsFavoriteCity(checkIsFavorite())

    }

    const deleteFavorite = () => {
        let updateFavorites = favoritesCart ? favoritesCart.filter(item => item.id !== cityKey) : []
        localStorage.setItem('favorites', JSON.stringify(updateFavorites))

        setFavoriteCart(JSON.parse(localStorage.getItem('favorites')))
        setIsFavoriteCity(checkIsFavorite())

    }

    useEffect(() => {
        setIsFavoriteCity(checkIsFavorite())
    }, [favoritesCart, city]);

    useEffect(() => {
        dispatch(fetchCurrent());
        setFavoriteCart(JSON.parse(localStorage.getItem('favorites')))
        setIsFavoriteCity(checkIsFavorite())
    }, [dispatch]);

    return (
        <div>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>{error}</p>}
            {status === 'succeeded'
                && (
                    <div className={`cardDetails ${darkMode ? 'dark-container' : 'light-container'}`}>
                        <div className='header'>

                            {!isFavoriteCity ?
                                <i className="fa-regular fa-heart heart" onClick={saveFavorite}></i>
                                : <i className="fa-solid fa-heart heart" onClick={deleteFavorite}></i>}

                            {celsius ? <div onClick={changeUnit}>Fahrenheit</div> : <div onClick={changeUnit}>Celsius</div>}

                        </div>
                        <div className="WeatherDetails">
                            <div>{city}</div>
                            {celsius ?
                                <div>{currentWeather.Temperature.Metric.Value}° {currentWeather.Temperature.Metric.Unit}</div> :
                                <div>{currentWeather.Temperature.Imperial.Value}° {currentWeather.Temperature.Imperial.Unit}</div>
                            }
                            <div>{currentWeather.WeatherText}</div>
                        </div>


                    </div>
                )}

        </div>
    )
}

