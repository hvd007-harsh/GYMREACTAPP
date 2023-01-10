import React,{useState,useEffect} from 'react';
import Axios from '../../utils/AxiosInstance';
import { useCookies } from 'react-cookie';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import {AiFillDelete} from 'react-icons/ai';
import axioInstance from '../../utils/AxiosInstance';

const CheckIn = () => {
    //eslint-disable-next-line
    const [cookies,setCookies] = useCookies(['isLoggedin']);
    const [OrderList,SetOrderList] = useState([]);
    const [amount,setAmount] = useState(null);

    useEffect(()=>{
    const orderlist = Axios.get('/cart/allorder',{headers:{
    "authorization":"Bearer "+ cookies.isLoggedin
   }});
   orderlist.then(data =>{
       console.log(data.data);
       setAmount(data.data.amount);
       SetOrderList(data.data.prod);;
    
   })

 },[])
 const initPayment = (data) => {
		const options = {
			key: 'rzp_test_uKiQQSAOBwN99P',
			amount: amount*100,
			currency: data.currency,
			product: OrderList.prod,
			description: "Test Transaction",
			order_id: data.id,
			handler: async (response) => {
				try {
					const verifyUrl = "http://localhost:4000/order/verify";
					const { data } = await axioInstance.post(verifyUrl, response);
					console.log(data);
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

	const handlePayment = async () => {
		try {
			const orderUrl = "http://localhost:4000/order/order";
			const data = await axioInstance.post(orderUrl, { amount });
			console.log(data);
			initPayment(data.data);
		} catch (error) {
			console.log(error);
		}
	};
  return (
    <div>
       <h3>Check In</h3>
       <div>
       <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Item </TableCell>
            <TableCell align="right">Item Name </TableCell>
            <TableCell align="right">Item Quantity</TableCell>
            <TableCell align="right">Item Image </TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {OrderList && OrderList.map((row) => (
            <TableRow
              key={row.productId.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.productId.title}
              </TableCell>
              <TableCell align="right">{row.productId.author}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.productId.imgUri}</TableCell>
              <TableCell align="right">
                  <Button>
                     <AiFillDelete>

                     </AiFillDelete>
                  </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h3>Amount:{amount}</h3>
      <Button className='flex float-right right-0 margin-auto' color='error' onClick={handlePayment}>
        Buy Now
    </Button>
    </TableContainer>
       </div>
    </div>
  )
}

export default CheckIn