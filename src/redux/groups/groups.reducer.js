import { GET_AUTH_GROUPS } from "redux/actionTypes";

const initialState = {
    allAuthGroups: null
}

export default function(state = initialState, action){
    if(action?.type === GET_AUTH_GROUPS){
       return {
           allAuthGroups: action.payload
       }
    }
    return state;
}