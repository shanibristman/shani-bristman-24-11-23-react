import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Favorites from './Favorites/Favorites';


export default function Navigation() {
    return (
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/favorite' element={<Favorites />} />
        </Routes>
    )
}
