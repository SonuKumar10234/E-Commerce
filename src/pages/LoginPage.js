import React from 'react'
import Navbar from '../features/navbar/Navbar';
import Login from '../features/auth/components/Login';

const LoginPage = () => {
  return (
    <div>
        <Navbar>
        <Login></Login>
        </Navbar>
    </div>
  )
}

export default LoginPage;