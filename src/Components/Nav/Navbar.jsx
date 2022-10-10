import React, { useState } from "react";
import{RiShoppingCart2Fill} from 'react-icons/ri';
import "./Navbar.css";
export const Navbar = () => {

 const [open, setopen] = useState(true);
  return (
    <>
    <nav>
      <div className="navbrand">NAVBRAND</div>
      <div className="navelement"></div>
      <div className="icon">
        <a href="/cart">
        <RiShoppingCart2Fill className="icon_cart"/>
        </a>
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
              <a href="/cart_list" className="anchor">Cart </a>
              <a href="*" className="anchor">Link 2</a>
              <a href="*" className="anchor">Link 3</a>
            </div>
          </div>
          </div>
          <div className="li"><a className="anchor" href="/Contact"> Contact</a></div>
          <div className="li"><a className="anchor" href="/Membership">Membership </a> </div>
          <div className="li"><a className="anchor" href="/Order"> TrackOrder </a></div>
      </div>

     
      
    </nav>
    {open ?<div className="ul burger-open open">
          <div className="li">
           <div className="dropdown">
            <button className="dropbtn">Shop with me </button>
            <div className="dropdown-content">
              <a href="cart_list" className="anchor">Cart</a>
              <a href="*" className="anchor">Link 2</a>
              <a href="*" className="anchor">Link 3</a>
            </div>
          </div>
          </div>
          <div className="li"><a className="anchor" href="/Contact"> Contact</a></div>
          <div className="li"><a className="anchor" href="/Membership">Membership </a> </div>
          <div className="li"><a className="anchor" href="/Order"> TrackOrder </a></div>
      </div>: <div></div>}

    </>
  );
};
