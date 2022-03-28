import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchPage from './searchPage.js';

import '../styles/style.scss';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/search' element={<SearchPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
