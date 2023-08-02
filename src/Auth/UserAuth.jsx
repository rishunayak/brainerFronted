import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { loginToken } from '../Redux/User/action.ts'
import { useEffect } from 'react'

const UserAuth = ({children}) => {
    const {isError,isLoading,token,user}=useSelector(store=>store.AuthReducer)
    
    const dispatch=useDispatch()
    
    useEffect(() => {
        dispatch(loginToken())
      }, []);
    
    if(token!="" && token)
    {
        return children
    }
    else
    {
        return <Navigate to="/login"/>
    }
}

export default UserAuth