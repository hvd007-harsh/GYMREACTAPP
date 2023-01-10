import './App.css';
import { Navbar } from './Components/Nav/Navbar';
import Dashboard from './Components/Dashboard/Dashboard';
import Protected from './utils/Protected';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cart from './Components/Cart/Cart';
import Login from './Components/User/Login';
import Register from './Components/User/Register';
import CheckIn from './Components/Cart/CheckIn';
//Redux part
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import {store,persistor} from './store/store';

//Cookies 
import { CookiesProvider } from 'react-cookie';
import Footer from './Components/Footer/Footer';
import { useEffect ,useState} from 'react';
import AdminDashboard from './Components/Admin/AdminDashboard';

// In private route first is children then other is path BASICALLY LIKE ROUTE 
function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
     {loading ? (
        <div className="loader-container">
      	  <div className="spinner"></div>
        </div>
      ): (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <CookiesProvider>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route element={ <Dashboard />} exact path="/" />  
        <Route element={<Protected Component={Cart}/>} path="/cart"/>
        <Route element={<Login/>} path={"/login"}/>
        <Route element={<Register/>} path={"/register"}/>
        <Route element={<Protected Component={AdminDashboard}/>} path={"/admin/dashboard"}/>
        <Route element={<Protected Component={CheckIn}/>} path="/addtocart" />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </CookiesProvider>
    </PersistGate>
    </Provider>
    )}
    
    </>
  );
}

export default App;
