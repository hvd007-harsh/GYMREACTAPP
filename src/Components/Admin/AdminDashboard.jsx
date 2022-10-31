import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { RiDashboard2Line, RiLogoutCircleFill } from "react-icons/ri";
import { BsCart, BsCheckAll, BsFillCartFill } from "react-icons/bs";
import { Button } from "@mui/material";
import Axios from "../../utils/AxiosInstance";
import { useCookies } from "react-cookie";
import { useState } from "react";
import Table from "./Table";
import Product_Submitting from "./Product_Submitting";
import MyProduct from "./MyProduct";

const AdminDashboard = () => {
 const [cookies ]= useCookies(['isLoggedin']);
 const [product, setProduct] = useState([]);
 const [i, setI] = useState(0);


useEffect(() => {
  const response =  Axios.get('/product/product/all',{headers:{"authorization":"Bearer "+ cookies.isLoggedin}});
  response.then(value =>{
     console.log(value);
      setProduct(value.data);
  })
  //eslint-disable-next-line
}, [])


  return (
    <>
      <div className="flex flex-row">
        <aside className="w-64" aria-label="sidebar">
          <div className="overflow-y-auto py-4 px-3 bg-gray-dark rounded dark:bg-gray">
            <ul className="space-y-2">
              <li>
                <Link className="flex items-center p-2 text-base font-normal text-gray rounded-lg dark:text-gray dark:group-hover:text-white">
                  <RiDashboard2Line />
                  <Button onClick={()=>{setI(0)}} className="hover:border-gray hover:border-2">
                    Dashboard
                  </Button>
                </Link>
              </li>
              <li>
                <Link className="flex items-center p-2 text-base font-normal text-gray rounded-lg dark:text-gray dark:group-hover:text-white">
                  <BsFillCartFill />
                  <Button onClick={()=>{setI(1)}} className="hover:border-gray hover:border-2 ">
                    Product Submitting
                  </Button>
                </Link>
              </li>
              <li>
                <Link className="flex items-center p-2 text-base font-normal text-gray  rounded-lg dark:text-gray dark:group-hover:text-white">
                  <BsCart />
                  <Button onClick={()=>{setI(2)}} className="hover:border-gray hover:border-2 ">
                    My Products
                  </Button>
                </Link>
              </li>
              <li>
                <Link className="flex items-center p-2 text-base font-normal text-gray rounded-lg dark:text-gray dark:group-hover:text-white">
                  <RiLogoutCircleFill />
                  <Button className=" hover:border-gray hover:border-2 ">
                    Logout as Admin
                  </Button>
                </Link>
              </li>
              <li>
                <Link className="flex items-center p-2 text-base font-normal text-gray rounded-lg dark:text-gray-900 dark:group-hover:text-white">
                  <BsCheckAll />
                  <Button className="hover:border-gray hover:border-2">
                    Check the orders
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
        <div className="bg-yellow relative w-full">
         
        {(() => {
        switch (i) {
          case 0:
            return <Table product={product} />
          case 1: 
           //eslint-disable-next-line
            return <Product_Submitting />
          case 2: 
                return <MyProduct/>
          default:
            return null
        }
      })()}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
