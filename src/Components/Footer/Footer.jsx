import React from 'react';
import {Paper,Button, Alert} from '@mui/material';
import { useCookies } from 'react-cookie';
import {Link} from 'react-router-dom';
import Axios from '../../utils/AxiosInstance';
import { useState } from 'react';

const Footer = () => {
  //eslint-disable-next-line
  const [cookies,setCookies] = useCookies(['isLoggedin']); 
  const [admin ,setadmin] = useState(false);
  const [message,setMessage] = useState();
  const adminmaking= ()=>{
    const response =  Axios.post('/user/makeofgymwebsiteadmin',{ headers : {'authorization': 'Bearer '+cookies.isLoggedin}})
    response.then( value =>{
      setMessage(value.data.message);
      console.log(value);
      setadmin(value.data.admin);
      console.log(admin);
    }) 
    
  }
  return (
    <div className='bottom-0 place-content-end justify-around min-w-full ' >
  { admin? <Alert severity={admin?"success":"error"}>{message}</Alert>: ''}


       <Paper>
        <div className='container bg-beige min-w-full via-Navy text-center text-blue-light'>
            <ul>
            {cookies.isLoggedin? <Button variant="contained" color="primary" onClick={()=>{adminmaking()}}> <li>Become Admin</li> </Button> :''}
           
            {cookies.isLoggedin? <li> <Button variant="contained" color="primary"><Link to={'/admin/dashboard'}>  Admin dashboard </Link></Button> </li>:''}
            </ul>
        </div>
        <h4 className='text-center'>ALL RIGHTS ARE RESERVED TILL 2023-24</h4> 
        </Paper>
    </div>
  )
}

export default Footer