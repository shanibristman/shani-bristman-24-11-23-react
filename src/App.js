import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation';
import Navbar from './components/Navbar/Navbar';
import { Provider } from 'react-redux';
import store from './store';

import './App.css'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Navigation />
      </Router>
    </Provider>
  );
}

export default App;
