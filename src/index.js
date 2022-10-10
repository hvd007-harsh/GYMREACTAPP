import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reducer from './Reducer';
import {createStore,combineReducers} from "redux";
import { Provider } from 'react-redux';

//To use reducer inside the combine Reducer 

const store = createStore(combineReducers({auth:reducer}));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  </React.StrictMode>
);

