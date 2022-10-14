import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from './createSlice';

const store = configureStore({
    reducer:{
        token: tokenReducer
    }
})

export default store;