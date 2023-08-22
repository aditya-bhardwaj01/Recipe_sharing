import React from 'react'
import './App.css'
import Home from './components/Home'
import Profile from './components/Profile'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Item from './components/Item';

export default function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/profile/:username" element={<Profile />} />
          <Route exact path='/item/:item_id' element={<Item />}  />
        </Routes>
      </Router>
    </div>
  )
}
