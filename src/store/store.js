import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from './createSlice';
import sessionStorage from 'redux-persist/lib/storage/session';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import { persistReducer, persistStore,getStoredState} from "redux-persist";
import thunk from "redux-thunk";


const persistConfig = {
    key:'root',
    storage:sessionStorage,
    stateReconciler: autoMergeLevel1
}

const persistedReducer = persistReducer(persistConfig, tokenReducer);


export const store = configureStore({
    reducer:persistedReducer,
    middleware:[thunk]
});

console.log(store.getState())


 const persistor  = persistStore(store);

 getStoredState(persistConfig).then(data=>{console.log("ll",data)})

 export {persistor};
