import { useState } from 'react'
import { Routes, Route } from "react-router";
import './App.css'
import Register from './component/pages/Register';
import Profile from './component/pages/profile'
import Login from './component/pages/Login';

function App() {
  
  return (
    <>
      <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/Login" element={<Login />} />
    </Routes>

      
    </>
  )
}

export default App
