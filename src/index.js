import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import {createStore,combineReducers} from "redux";
// import { Provider } from 'react-redux';

//To use reducer inside the combine Reducer 

// const store = createStore(combineReducers({auth:reducer}));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

