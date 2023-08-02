import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Product from './Product'
import UserAuth from '../Auth/UserAuth'

const AllRoute = () => {
  return (
     <>
       <Routes>
         <Route path='/login' element={<Login/>}/>
         <Route path='/register' element={<Register/>}/>
         <Route path='/' element={<UserAuth><Home/></UserAuth>}/>
         <Route path='/products' element={<UserAuth><Product/></UserAuth>}/>
       </Routes>
     </>
  )
}

export default AllRoute
