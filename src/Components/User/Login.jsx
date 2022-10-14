import "./User.css";

import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Axios from "../../utils/AxiosInstance";
import { token_add, token_remove } from "../../store/createSlice";
import { useDispatch } from "react-redux";



const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setpassword ] = useState('');
  const submit = ()=>{
    const user = {
       email,
       password
    }
    console.log(user);
  const Response= Axios.post('/user/login',user);
  console.log(Response);
  Response.then((response)=>{
        console.log(response.data.accesstoken);
      if(response.data.accesstoken){
        dispatch(token_add(response.data.accesstoken));
      }
      dispatch(token_remove(''))
    }).catch((err)=>{
      console.log(err);
    })
  }

  return (
    <>
      <section className="h-full gradient-form bg-gray-200 md:h-screen">
        <div className="container py-12 px-6 h-full">
          <div className="flex justify-center flex-wrap h-full g-6 text-gray-800">
            <div className="xl:w-10/12">
              <div className="block bg-gray shadow-lg rounded-lg">
                <div className="lg:flex lg:flex-wrap g-0">
                  <div className="lg:w-6/12 px-4 md:px-0">
                    <div className="text-center">
                      <img
                        className="mx-auto w-48"
                        src="img\travelphotovlog-logo1.png"
                        alt="logo"
                      />
                      <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">
                        We are Gymers and we do gym{" "}
                      </h4>
                    </div>
                    <form>
                      <h3 className="mb-4">Please Login to your account</h3>
                      <div className="mb-4">
                        <input
                          type="text"
                          name="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e)=>{setEmail(e.target.value)}}
                          className="form-control block px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-light bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-gray-light focus:border-blue-600 focus:outline-none"
                        />
                      </div>
                      <div class="mb-4">
                        <input
                          type="password"
                          value={password}
                          onChange={(e)=>{ setpassword(e.target.value)}}
                          className="form-control block px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-light bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-gray-light focus:border-blue-600 focus:outline-none" 
                          placeholder="Password"
                        />
                      </div>
                      <button
                        className="inline-block px-6 py-2 5 text-gray-light font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out lg:w-6/12 mb-3"
                        type="button"
                        data-mdb-ripple={true}
                        data-mdb-ripple-color="light"
                        style={{
                          backgroundImage:
                            "linear-gradient(to right,#07bfed,#e207ed,#07bfed)",
                        }}
                        onClick={submit}
                      >
                        LogIn
                      </button>

                      <div>
                        <Link  className="forget p-1 m-0.5 password lg:w-6/12 bg-gray-light rounded-md hover:bg-opacity-5" to="/forget_password">Forget Password</Link>
                      </div>
                      <br />
                      <div >
                        <Link className="ref p-1 m-0.5 cursor-pointer lg:w-6/12 bg-gray-light rounded-md hover:bg-opacity-5" to="/register">Register</Link>
                      </div>
                      <br />
                      {/* <button
                        type="button"
                        className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                      >
                        Danger
                      </button> */}
                    </form>
                  </div>
                  <div className="lg:w-6/12 flex-wrap items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none"
                     style={{
                          backgroundImage:
                            "linear-gradient(to right,  #ee7724,#d8363a,#dd3675,#b44593)"
                        }}
                  >
                  <div className="text-white px-4 py-6 md:p-12 md:mx-6">
                    <h4 className="text-xl font-bold font-serif   mb-6">
                      We are Gymers we do gym
                    </h4>
                    <p className="text-lg">
                      Hi We have GYM and we do franchise of GYM also and We sell
                      products of Gym and if you like Our Gym . you can come and
                      try 7-day free trial and if you love the gym then take
                      membership of gym as you want
                    </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;

