import React from 'react'
import './App.css'
import Home from './components/Home'
import Profile from './components/Profile'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import VerifyPhone from './components/VerifyPhone';
import VerifyEmail from './components/VerifyEmail';

export default function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/verifyPhone' element={<VerifyPhone />} />
          <Route exact path='/verifyEmail' element={<VerifyEmail />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  )
}
