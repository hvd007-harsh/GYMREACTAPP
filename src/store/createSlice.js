import { createSlice } from "@reduxjs/toolkit";
const initialState = null;

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        token_add(state,action){
            console.log(action,state);
            return state = action.payload;
        },
        token_remove(state,action){
             return null;
        }
    }
})

export const {token_add,token_remove} = authSlice.actions;

export default authSlice.reducer;