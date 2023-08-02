import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from "./actionTypes"


interface AuthState {
    isLoading: boolean;
    isError: boolean;
    token: string;
  }

const initalValue:AuthState=
{
    isLoading:false,
    isError:false,
    token:localStorage.getItem("token") || "",
}

export const AuthReducer=(state=initalValue,action:any)=>
{
    switch(action.type)
    {
        case REGISTER_USER_REQUEST : return {...state,isLoading:true};
        case REGISTER_USER_SUCCESS : return {...state,isLoading:false,msg:action.payload}
        case REGISTER_USER_FAILURE : return {...state,isLoading:false,isError:true}

        case LOGIN_USER_REQUEST : return {...state,isLoading:true};
        case LOGIN_USER_SUCCESS : 
         if(action.payload.token!="")
         {
            localStorage.setItem("token",action.payload.token)
            return {...state,isLoading:false,token:action.payload.token}
         }
         else
         {
            localStorage.removeItem("token")
            return {...state,isLoading:false,token:""}
         }
         
        
        case LOGIN_USER_FAILURE : return {...state,isLoading:false,isError:true}
        
        case GET_USER_REQUEST : return {...state,isLoading:true};
        case GET_USER_SUCCESS : return {...state,isLoading:false,user:action.payload}
        case GET_USER_FAILURE : return {...state,isLoading:false,isError:true}
        
        default : return state
    }
}