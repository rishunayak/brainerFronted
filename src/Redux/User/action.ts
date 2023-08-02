
import axios from "axios"
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from "./actionTypes"

export const userRegister=(register:{ [key: string]: string })=>dispatch=>
{   


    dispatch({type:REGISTER_USER_REQUEST})
    return axios.post("https://brainer-y0zt.onrender.com/users/register",register)
    .then(r=>dispatch({type:REGISTER_USER_SUCCESS,payload:r.data}))
    .catch(e=>{dispatch({type:REGISTER_USER_FAILURE})})
    
}

export const userLogin=(payload:{ [key: string]: string })=>dispatch=>
{
    dispatch({type:LOGIN_USER_REQUEST})
    return axios.post("https://brainer-y0zt.onrender.com/users/login",payload).then(r=>dispatch({type:LOGIN_USER_SUCCESS,payload:r.data}))
    .catch(e=>{dispatch({type:LOGIN_USER_FAILURE})})
}


export const loginToken=()=>dispatch=>
{
    dispatch({type:LOGIN_USER_REQUEST})
    return axios.get("https://brainer-y0zt.onrender.com/users",{headers:{token:localStorage.getItem("token")}})
    .then(r=>dispatch({type:LOGIN_USER_SUCCESS,payload:r.data}))
    .catch(r=>dispatch({type:LOGIN_USER_FAILURE}))
}