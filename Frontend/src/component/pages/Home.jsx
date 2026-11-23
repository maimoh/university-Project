import React from 'react'
import { useNavigate } from 'react-router'
import Register from './Register'

export default function Home() {
    const navigate = useNavigate()
    function nav(){
        navigate('/')
    }
  return (
    <>
      <h1>Home</h1>
      <button className='btn btn-danger' onClick={nav}>Register</button>
    </>
  )
}
