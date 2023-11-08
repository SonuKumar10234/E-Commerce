import React from 'react'
import Navbar from '../features/navbar/Navbar';
import ForgotPassword from '../features/auth/components/ForgotPassword';

const ForgotPasswordPage = () => {
    return (
        <div>
            <Navbar>
                <ForgotPassword></ForgotPassword>
            </Navbar>
        </div>
    )
}

export default ForgotPasswordPage