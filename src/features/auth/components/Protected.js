import React from 'react'
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../authSlice';
import { Navigate } from 'react-router-dom';

const Protected = ({children}) => {
    // const user = useSelector(selectLoggedInUser);
    const userInfo = localStorage.getItem("userInfo");
    if(!userInfo){
        return <Navigate to='/login' replace={true}></Navigate>
    }
    else{
        return children;
    }
}

export default Protected;