import './App.css';
import { Navbar } from './Components/Nav/Navbar';
import Dashboard from './Components/Dashboard/Dashboard';
import Protected from './utils/Protected';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cart from './Components/Cart/Cart';
import Login from './Components/User/Login';

// In private route first is children then other is path BASICALLY LIKE ROUTE 
function App() {
  return (
    <>
    <Navbar/>
    <BrowserRouter>
      <Routes>
        <Route element={ <Dashboard />} exact path="/" />  
        <Route element={<Protected Component={Cart}/>} path="/cart"/>
        <Route element={<Login/>} path={"/login"}/>
      </Routes>
     
    </BrowserRouter>

    </>
  );
}

export default App;
