import React from 'react'
import Navbar from '../features/navbar/Navbar';
import SignUp from '../features/auth/components/SignUp'
const SinUpPage = () => {
  return (
    <div>
        <Navbar>
        <SignUp></SignUp>
        </Navbar>
    </div>
  )
}

export default SinUpPage