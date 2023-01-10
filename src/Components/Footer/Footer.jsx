import React from "react";
import { Paper, Button, Alert } from "@mui/material";
import { BsCart } from "react-icons/bs";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import Axios from "../../utils/AxiosInstance";
import { useState, useEffect } from "react";

const Footer = () => {
  //eslint-disable-next-line
  const [cookies, setCookies] = useCookies(["isLoggedin"]);
  const [admin, setadmin] = useState(false);
  const [itemLength, setItemLength] = useState(0);
  const [message, setMessage] = useState();
  const adminmaking = () => {
    console.log(cookies.isLoggedin);
    const cookie = "Bearer " + cookies.isLoggedin;
    const response = Axios.post(
      "/user/makeofgymwebsiteadmin",
      {},
      {
        headers: {
          authorization: cookie,
        },
      }
    );
    response.then((value) => {
      setMessage(value.data.message);
      console.log(value);
      setadmin(value.data.admin);
      console.log(admin);
    });
  };

  useEffect(() => {
    const data_product = Axios.get("/cart/quantity/", {
      headers: {
        authorization: "Bearer " + cookies.isLoggedin,
      },
    });
    data_product.then((data) => {
      setItemLength(data.data);
    });
    //eslint-disable-next-line
  }, []);
  return (
    <footer className="text-center min-w-full fixed mt-10 inset-x-0 bottom-0 footer">
         <Link to={"/addtocart"}>
      <Button
        sx={{
          color: "orange",
          fontWeight: 400,
          border: "2px Solid Orange",
          textAlign: "left",
          display: "flex",
          justifyContent: "start",
        }}
      >
   
        <BsCart />
        <div className="text-orange pt-4">{itemLength}</div>
     
      </Button>
      </Link>
      <div className="justify-center min-w-full ">
        {admin ? (
          <Alert severity={admin ? "success" : "error"}>{message}</Alert>
        ) : (
          ""
        )}

        <div className="container bg-beige min-w-full via-Navy text-center text-blue-light">
          <ul>
            {cookies.isLoggedin ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  adminmaking();
                }}
              >
                {" "}
                <li>Become Admin</li>{" "}
              </Button>
            ) : (
              ""
            )}

            {cookies.isLoggedin ? (
              <li>
                {" "}
                <Button variant="contained" color="primary">
                  <Link to={"/admin/dashboard"}> Admin dashboard </Link>
                </Button>{" "}
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
        <h4 className="text-center">ALL RIGHTS ARE RESERVED TILL 2023-24</h4>
      </div>
    </footer>
  );
};

export default Footer;
