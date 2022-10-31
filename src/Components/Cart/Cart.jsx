import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from '../../utils/AxiosInstance';
import {useCookies} from 'react-cookie';
import { Card, CardMedia, CardContent,CardActionArea,Typography,Button} from '@mui/material';
const Cart = () => {
   //eslint-disable-next-line
  const [cookies,setCookies] = useCookies(['isLoggedin']);
  const [product, setproduct] = useState([]);
  useEffect(() => {
   const data_product =  Axios.get('/product/product/all',{headers:{
    "authorization":"Bearer "+ cookies.isLoggedin
   }})
    data_product.then(data => {
      setproduct(data.data);
    })
     //eslint-disable-next-line
  },[]);

  const submit = (i)=>{
    Axios.post('/')
  }
  
  return (
    <>
      <div className="container flex-row flex flex-grow-3 justify-between space-x-4">
      {product.map((element,index=element._id)=>{
         return <div>
          <Card sx={{maxWidth:345}}>
          <CardActionArea>
           <CardMedia component="img"
          height="140"
          image={process.env.PUBLIC_URL+"/image/"+ element.imgUri}
          alt={element.title } /> 
        
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" className="title">{element.title}</Typography>
            <Typography  className="size">{element.size}</Typography>
            <Typography  className="size">{element.mrp}₹</Typography>
            <Typography  className="discription">{element.discription}</Typography>
            <Typography className="author">{element.author}</Typography>
            <Typography variant="body2" color="text.secondary">
              {element.description}
          </Typography>
          </CardContent>
          </CardActionArea>
          <Button sx={{ backgroundColor:'blue', minWidth:'100%', color:'white' , ":hover":{ color: 'blue'} }} onClick ={()=>{submit(product[index])}}> Add To Cart</Button>
          
          </Card>
          </div>
      })
      }
      </div>
    </>
  )
}

export default Cart;