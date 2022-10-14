import { useEffect } from 'react';
import { useNavigate } from  'react-router-dom';
// import { connect } from 'react-redux';
// import {action} from '../Action';

const Protected= (props)=>{
    
    const navigate = useNavigate();
    // props.actionAuth(true); 
    let {Component } = props ;
    // console.log(props.auth);
    useEffect(() => {
         
         let auth = props.auth;
         if(!auth){
           navigate("/login");
         }
    })

    return <Component/>

}
// const mapstateToProps = (state)=>{
//   return {auth:state.auth};
// } connect(mapstateToProps,{actionAuth:action.actionAuth})
export default Protected;
