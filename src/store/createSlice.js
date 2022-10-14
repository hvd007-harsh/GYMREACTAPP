import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name:'auth',
    initialState:'',
    reducers:{
        token_add(state,action){
            return action.payload;
        },
        token_remove(state,action){
             return '';
        }
    }
})

export const {token_add,token_remove} = authSlice.actions;

export default authSlice.reducer;