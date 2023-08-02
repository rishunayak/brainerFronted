import axios from "axios"
import { DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, GET_PRODUCT_FAILURE, GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS, PATCH_PRODUCT_FAILURE, PATCH_PRODUCT_REQUEST, PATCH_PRODUCT_SUCCESS, POST_PRODUCT_FAILURE, POST_PRODUCT_REQUEST, POST_PRODUCT_SUCCESS } from "./actionTypes"

interface ProductData {
    image: string;
    price: number | null;
    name: string;
    quantity: number | null;
    description: string;
    id:string
  }

export const getProductData=(query:{ [key: string]: string })=>dispatch=>
{   


    dispatch({type:GET_PRODUCT_REQUEST})
    return axios.get("https://brainer-y0zt.onrender.com/products",{params:query,headers:{token:localStorage.getItem("token")}} ).then((r)=>{dispatch({type:GET_PRODUCT_SUCCESS,payload:r.data})})
    .catch(e=>{dispatch({type:GET_PRODUCT_FAILURE})})
    
}

export const postProductData=(data:ProductData)=>dispatch=>
{   


    dispatch({type:POST_PRODUCT_REQUEST})
    return axios.post("https://brainer-y0zt.onrender.com/products",data,{headers:{token:localStorage.getItem("token")}}).then(r=>dispatch({type:POST_PRODUCT_SUCCESS,payload:data,message:r.data}))
    .catch(e=>{dispatch({type:POST_PRODUCT_FAILURE})})
    
}


export const patchProductData=(data:ProductData)=>dispatch=>
{
    
    dispatch({type:PATCH_PRODUCT_REQUEST})
    return axios.patch(`https://brainer-y0zt.onrender.com/products/${data.id}`,data,{headers:{token:localStorage.getItem("token")}}).then(r=>dispatch({type:PATCH_PRODUCT_SUCCESS,payload:data,message:r.data}))
    .catch(e=>{dispatch({type:PATCH_PRODUCT_FAILURE})})
}

export const deleteProductData=(id:string)=>dispatch=>
{

    dispatch({type:DELETE_PRODUCT_REQUEST})
    return axios.delete(`https://brainer-y0zt.onrender.com/products/${id}`,{headers:{token:localStorage.getItem("token")}}).then(r=>dispatch({type:DELETE_PRODUCT_SUCCESS,payload:id,message:r.data}))
    .catch(e=>{dispatch({type:DELETE_PRODUCT_FAILURE})})
}