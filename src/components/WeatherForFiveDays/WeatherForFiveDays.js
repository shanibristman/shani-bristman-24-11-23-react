import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllWeek } from '../../reducers/dataSlice';

import './WeatherForFiveDays.css';

export default function WeatherForFiveDays() {

    const dispatch = useDispatch();
    const weather = useSelector((state) => state.data.allWeek);
    const status = useSelector((state) => state.data.statusAllWeek);
    const error = useSelector((state) => state.data.errorAllWeek)

    const { darkMode } = useSelector((state) => state.data);

    const selectLogo = (code) => {

        if (code === 1 || code === 2 || code === 3 || code === 5 || code === 30) {
            return <i className="fa-solid fa-sun sun size"></i>
        }
        else if (code === 4 || code === 6 || code === 20 || code === 21) {

            return <i className="fa-solid fa-cloud-sun cloud_sun size"></i>
        }
        else if (code === 7 || code === 8 || code === 9 || code === 10 || code === 11 || code === 31 || (code >= 35 && code <= 38)) {
            return <i className="fa-solid fa-cloud cloud_rain size"></i>

        }

        else if (code === 12 || code === 15 || code === 18 || code === 22 || code === 24 || (code >= 25 && code <= 29) || (code >= 39 && code <= 44)) {
            return <i className="fa-solid fa-cloud-rain cloud_rain size"></i>

        }
        else if (code === 13 || code === 14 || code === 16 | code === 17 | code === 23) {
            return <i className="fa-solid fa-cloud-sun-rain cloud_sun size"></i>
        }
        else {
            return <i className="fa-solid fa-moon cloud_rain size"></i>

        }
    }


    useEffect(() => {
        dispatch(fetchAllWeek());
    }, [dispatch]);

    return (
        <div className={`forecastsDetails ${darkMode ? 'dark-container' : 'light-container'}`}>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>{error}</p>}
            {status === 'succeeded'
                && (
                    weather.DailyForecasts.map((item) => (
                        <div key={item.Date} className='day'>
                            {selectLogo(item.Day.Icon)}
                            <div>{new Date(item.Date).toLocaleDateString('en-US', {
                                weekday: 'long'
                            })}</div>
                            <div>
                                {parseInt(item.Temperature.Minimum.Value)}°{item.Temperature.Minimum.Unit} -
                                {parseInt(item.Temperature.Maximum.Value)}°{item.Temperature.Maximum.Unit}
                            </div>
                        </div>
                    )
                    )
                )}
        </div>
    )
}
