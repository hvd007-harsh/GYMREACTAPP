import React, { useState } from "react";
import{RiShoppingCart2Fill} from 'react-icons/ri';
import { Link } from "react-router-dom";

import "./Navbar.css";
export const Navbar = () => {

 const [open, setopen] = useState(true);
  return (
    <>
    <nav>
      <div className="navbrand">NAVBRAND</div>
      <div className="navelement"></div>
      <div className="icon">
        <Link to={"cart"}>
        <RiShoppingCart2Fill className="icon_cart"/>
        </Link>
        <hr />
      </div>
      

    
      <div className={open? "cross ham-menu" : "ham-menu"} onClick={()=>{setopen(!open)}}>
        <span className="line line1"/>
        <span className="line line2"/>
        <span className="line line3"/>
     </div>
      <div className="ul burger-open close">
          <div className="li">
           <div className="dropdown">
            <button className="dropbtn">Shop with us</button>
            <div className="dropdown-content">
              <Link to={"/cart"}  >Cart </Link>
              <Link to={"*"}  >Link 2</Link>
              <Link to={"*"}  >Link 3</Link>
            </div>
          </div>
          </div>
          <div className="li"><Link to={"/Contact"}> Contact</Link></div>
          <div className="li"><Link to={"/Membership"}>Membership </Link> </div>
          <div className="li"><Link   to={"/Order"}> TrackOrder </Link></div>
          <div className="li"><Link   to={"/Logout"}> Logout </Link></div>
      </div>

     
      
    </nav>
    {open ?<div className="ul burger-open bg-gray-dark open">
          <div className="li">
           <div className="dropdown">
            <button className="dropbtn">Shop with me </button>
            <div className="dropdown-content">
              <Link to={"/cart"}  >Cart</Link>
              <Link to={"*"}  >Link 2</Link>
              <Link to={"*"}  >Link 3</Link>
            </div>
          </div>
          </div>
          <div className="li"><Link   to={"/Contact"}> Contact</Link></div>
          <div className="li"><Link   to={"/Membership"}>Membership </Link> </div>
          <div className="li"><Link   to={"/Order"}> TrackOrder </Link></div>
          <div className="li"><Link   to={"/Logout"}> Logout </Link></div>
      </div>: <div></div>}

    </>
  );
};
