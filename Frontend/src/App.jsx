import { useState } from 'react'
import { Routes, Route } from "react-router";
import './App.css'
import Register from './component/pages/Register';
import Home from './component/pages/Home'
import Login from './component/pages/Login';

function App() {
  
  return (
    <>
      <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Login" element={<Login />} />
    </Routes>

      
    </>
  )
}

export default App
