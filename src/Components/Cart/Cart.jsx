import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from '../../utils/AxiosInstance';
import {useDispatch} from 'react-redux';
import {useCookies} from 'react-cookie';
import { Card, CardMedia, CardContent,Typography,Button} from '@mui/material';
// import { addTocart } from '../../store/createSlice';
const Cart = () => {
  // const dispatch = useDispatch();



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
    
    // dispatch(addTocart(i));
    Axios.get(`/cart/add_cart?id=${i._id}&title=${i.title}&quantity=1&price=${i.mrp}`,{
      headers:{ 'authorization': "Bearer "+ cookies.isLoggedin }
    }).then(response => {
      console.log(response.data);
    })
  }
  
  return (
    <>
      <div className="container flex-row flex flex-grow-3 justify-between space-x-4">
      {product && product.map((element,index=element._id)=>{
         return <div>
         <Card sx={{ maxWidth: 245 , borderRadius:0 }}>
          <CardMedia
              component="img"
              sx={{
                maxHeight:200,
                maxWidth:150
              }}
              image={process.env.PUBLIC_URL+"/image/"+ element.imgUri}
              alt={element.title}
            />
           {/* <CardMedia component="img"
             height={123}
             className='h-12 w-12 border-Navy '
             image={process.env.PUBLIC_URL+"/image/"+ element.imgUri}
             alt={element.title } />  */}
        
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