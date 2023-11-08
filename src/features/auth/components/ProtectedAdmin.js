import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUserInfo } from '../../user/userSlice';

const ProtectedAdmin = ({children}) => {
    // const user = useSelector(selectUserInfo);
    const userInfo = JSON.parse( localStorage.getItem("userInfo"));
    // console.log(userInfo);
    if(!userInfo){
        return <Navigate to='/login' replace={true}></Navigate>
    }
    if(userInfo && userInfo.role !== 'admin'){
        return <Navigate to='/admin' replace={true}></Navigate>
    }
    
    return children;

}

export default ProtectedAdmin;