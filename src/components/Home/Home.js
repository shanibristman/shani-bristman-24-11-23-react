import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Card from '../Card/Card';
import WeatherForFiveDays from '../WeatherForFiveDays/WeatherForFiveDays';
import Search from '../Search/Search';

import './Home.css'

export default function Home() {


    const { statusCurrent, statusAllWeek, statusSearch, errorCurrent, errorAllWeek, errorSearch, darkMode } = useSelector((state) => state.data)

    useEffect(() => {
        statusCurrent === 'failed' && toast.error(errorCurrent, {
            position: toast.POSITION.TOP_RIGHT
        })

        statusAllWeek === 'failed' && toast.error(errorAllWeek, {
            position: toast.POSITION.TOP_RIGHT
        })

        statusSearch === 'failed' && toast.error(errorSearch, {
            position: toast.POSITION.TOP_RIGHT
        })

    }, [statusCurrent, statusAllWeek, statusSearch]);

    useEffect(() => {

        toast.info('For darkened mode click on the sun', {
            position: toast.POSITION.TOP_LEFT
        })
    }, [])

    return (
        <div className={`home ${darkMode ? 'dark-background' : 'light-background'}`}>
            <ToastContainer />

            <div className='padding search'>
                <Search />
            </div>
            <div className='card padding'>
                <Card />
            </div>
            <div className='forecasts padding'>
                <WeatherForFiveDays />
            </div>

        </div>
    )
}