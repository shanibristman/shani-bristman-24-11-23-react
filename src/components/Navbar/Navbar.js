import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeDarkMode, fetchCurrent, fetchAllWeek, changeKey, changeCity } from '../../reducers/dataSlice';


import './Navbar.css'

export default function Navbar() {

    const dispatch = useDispatch();
    const { darkMode } = useSelector((state) => state.data);

    const changeMode = () => {
        dispatch(changeDarkMode())
    }

    const setDefault = () => {
        dispatch(changeKey("215854"))
        dispatch(changeCity("Tel Aviv"))
        dispatch(fetchCurrent())
        dispatch(fetchAllWeek())
    }


    return (
        <div className={`navbar ${darkMode ? 'dark-navbar' : 'light-navbar'}`}>
            <div className='logo'>
                <div style={{ paddingRight: 20 }} onClick={changeMode}>{!darkMode ? <i className="fa-solid fa-sun size"></i> : <i class="fa-regular fa-moon size"></i>}</div>
                <div>WEATHER APP</div>
            </div>
            <div className='icons'>
                <Link to="/">
                    <div className="icon" onClick={setDefault}>
                        Home
                    </div>
                </Link>
                <Link to="/favorite">
                    <div className="icon">
                        favorite

                    </div>
                </Link>
            </div>
        </div >
    )
}

