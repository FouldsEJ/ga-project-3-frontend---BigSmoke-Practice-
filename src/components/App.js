import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchPage from './searchPage.js';

import '../styles/style.scss';
import Home from './Home';
import Navbar from './Navbar';
import Footer from './Footer';

import PlaceShow from './PlaceShow';
import Login from './Login';
import Register from './Register';
import AddPlace from './AddPlace.js';
import MapSearch from './MapSearch.js';
import ProfilePage from './profilePage.js';

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/explore/:id' element={<PlaceShow />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/' element={<Home />} />
      <Route path='/explore' element={<SearchPage />} />
      <Route path='/add-place' element={<AddPlace />} />
      <Route path='/mapexplore' element={<MapSearch />} />
      <Route path='/profile' element={<ProfilePage />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default App;
