import { DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, GET_PRODUCT_FAILURE, GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS, PATCH_PRODUCT_FAILURE, PATCH_PRODUCT_REQUEST, PATCH_PRODUCT_SUCCESS, POST_PRODUCT_FAILURE, POST_PRODUCT_REQUEST, POST_PRODUCT_SUCCESS } from "./actionTypes";


interface ProductState {
    isLoading: boolean;
    isError: boolean;
    product: {
      products: any[]; 
    };
  }

  
const initalValue :ProductState=
{
    isLoading:false,
    isError:false,
    product:{
        products:[]
    }
}

  const ProductReducer=(state=initalValue,action)=>
{

    switch(action.type)
    {
        case GET_PRODUCT_REQUEST : return {...state,isLoading:true};
        case GET_PRODUCT_SUCCESS : return {...state,isLoading:false,product:action.payload.data}
        case GET_PRODUCT_FAILURE : return {...state,isLoading:false,isError:true}

        case POST_PRODUCT_REQUEST : return {...state,isLoading:true};
        case POST_PRODUCT_SUCCESS : {
            let data=[...state.product.products,action.payload]
            state.product.products=data
            return {...state,isLoading:false}};
        case POST_PRODUCT_FAILURE : return {...state,isLoading:false,isError:true}
        
        case PATCH_PRODUCT_REQUEST : return {...state,isLoading:true};
        case PATCH_PRODUCT_SUCCESS : {
          
           let data=state.product.products.map((ele)=> {
             
             if(ele._id==action.payload.id)
             {
                return action.payload
             }
             else
             {
                return ele
             }
        })
        
        state.product.products=[...data]
        return {...state,isLoading:false};
        };
        case PATCH_PRODUCT_FAILURE: return {...state,isLoading:false,isError:true};

        case DELETE_PRODUCT_REQUEST: return {...state,isLoading:true};
        case DELETE_PRODUCT_SUCCESS: {
            let data=state.product.products.filter((ele)=>ele._id!=action.payload)
            state.product.products=data
            return {...state,isLoading:false}
        };
        case DELETE_PRODUCT_FAILURE : return {...state,isLoading:false,isError:true};
        default : return state
    }
}

export default ProductReducer