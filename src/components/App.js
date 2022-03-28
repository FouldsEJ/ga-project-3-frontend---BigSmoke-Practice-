import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchPage from './searchPage.js';

import '../styles/style.scss';
import Home from './Home';
import Navbar from './Navbar';
import Footer from './Footer';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default App;
