import { Routes, Route } from 'react-router-dom';
import './App.css';
import { About } from './components/About';
import { Home } from './components/Home';
import { Stock } from './components/Stock';
import React from 'react';
import { Contact } from './components/Contact';
// import {SearchBar} from './components/SearchBar';
function App() {  
  
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/stock/*' element={<Stock/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
    </Routes>
  );
} 

export default App;