import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchData, fetchCurrent, fetchAllWeek, changeKey, changeCity } from '../../reducers/dataSlice';

import './Search.css'

export default function Search() {

    const dispatch = useDispatch();
    const { darkMode } = useSelector((state) => state.data)
    const searchResults = useSelector((state) => state.data.search);
    const status = useSelector((state) => state.data.statusSearch);
    const error = useSelector((state) => state.data.errorSearch);
    const [searchText, setSearchText] = useState("");
    const [showList, SetShowList] = useState(false)

    const submitSearch = () => {
        dispatch(fetchSearchData(searchText));
        SetShowList(!showList)
    }

    const selectLocation = (key, city) => {
        SetShowList(!showList)
        dispatch(changeKey(key))
        dispatch(changeCity(city))
        dispatch(fetchCurrent())
        dispatch(fetchAllWeek())
        setSearchText("")
    }

    useEffect(() => {
        dispatch(fetchSearchData(searchText));
    }, [dispatch]);


    return (
        <div className={`all_search ${darkMode ? 'dark-search' : 'light-search'}`}>
            <div className="searchArea">
                <input className={`${darkMode ? 'input-dark' : 'input'}`} placeholder="type.." value={searchText} onChange={(e) => setSearchText(e.target.value.toLowerCase())} />                {/* <img src={require('../Assets/search.png')} onClick={submitSearch} /> */}
                <i className={`fa-solid fa-magnifying-glass ${darkMode ? 'i-dark' : 'i'}`} onClick={submitSearch}></i>
            </div>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>{error}</p>}
            {status === 'succeeded'
                && showList &&
                (<div className={`list ${darkMode ? 'dark-container' : 'list-color-light'}`}>
                    {searchResults.map(item => (
                        <div key={item.Key} onClick={() => selectLocation(item.Key, item.LocalizedName)}>{item.LocalizedName}</div>
                    ))}
                </div>)
            }
        </div>
    )
}
