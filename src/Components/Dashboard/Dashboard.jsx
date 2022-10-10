import React from 'react'
import {BsSearch} from 'react-icons/bs';
// import Product from '../Product/Product';
import './Dashboard.css';


const Search_btn  = ()=>{
  return<button type="submit" className='btn-bs'>
           <BsSearch/>
        </button>

}
const Video_container = ()=>{
  return<div className="video-container">
        <video
         poster='/img/poster.png'
         id='video'
         playsInline
         muted
         loop
         autoPlay>
         {/* production ID_4761426.mp4 production ID_4367580.mp4 */}
                <source src='/video/production ID_4761426.mp4' type='video/mp4'/>
         </video>
         </div>
}



const Dashboard = () => {
  return (
    <div>
      <h1>NAVGYM</h1>
      <div className="search">
      <form>
        <input type="search" class="search" name="search" id="search" placeholder="search"/>
        <Search_btn/>
      </form>
      </div>
       {/* // Video Container */}
   
        <Video_container/>

        {/* <Product/> */}
    </div>
  )
}

export default Dashboard