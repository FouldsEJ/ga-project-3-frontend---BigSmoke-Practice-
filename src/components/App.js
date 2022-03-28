import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import '../styles/style.scss';

import PlaceShow from './PlaceShow';
import Login from './Login';
import Register from './Register';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<h1>Hello world</h1>} />
      <Route path='/places/:id' element={<PlaceShow />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  </BrowserRouter>
);

export default App;
