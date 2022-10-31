import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import {action} from '../Action';
// import { connect } from 'react-redux';
//Cookies 
import { useCookies } from 'react-cookie';

const Protected = (props) => {
  // const token = useSelector((state) => state.token);
  //eslint-disable-next-line
  const [cookies,setCookies] = useCookies(['isLoggedin'])
  const navigate = useNavigate();
  // props.actionAuth(true); 
  let {Component} = props;
  // console.log(props.auth);
  // console.log(token);
  useEffect(() => {
  //  const Response =  axios.post('/refresh_token')
  //   Response.then((response)=>{
  //      dispatch(token_add(response.data.accesstoken));
  //   })
    if (!cookies.isLoggedin) {
      navigate("/login");
    }
  })

  return <Component / >

}
// const mapstateToProps = (state)=>{
//   return {auth:state.auth};
// } connect(mapstateToProps,{actionAuth:action.actionAuth})
export default Protected;