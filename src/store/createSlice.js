import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState:null,
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
const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cart:[],
    },
    reducers:{
        addTocart: (state,action)=>{
          const itemCart = state.cart.find(item => item.id === action.payload._id);
          if(itemCart){
             itemCart.quantity++;
          }else{
              state.push(action.payload);
              return state;
          }

        },
        incrementQuantity:(state,action)=>{
          const item = state.cart.find(item => item.id === action.payload);
          item.quantity++;
        },
        decrementQuantity:(state,action)=>{
            const item = state.cart.find(item=> item.id === action.payload._id);
            item.quantity--;
        },
        removeItem: (state,action)=>{
         const removeItem = state.cart.filter(item =>item.id !== action.payload._id);
         state.cart = removeItem; 
        }
    }
})
export const {token_add,token_remove} = authSlice.actions;
export const {addTocart,incrementQuantity,decrementQuantity,removeItem} = cartSlice.actions; 

export const cartReducer = cartSlice.reducer;
export const authReducer = authSlice.reducer;