import React from 'react'
import Navbar from '../features/navbar/Navbar';
import AdminProductDetails from '../features/admin/components/AdminProductDetails';

const AdminProductDetailsPage = () => {
  return (
    <div>
        <Navbar>
         <AdminProductDetails></AdminProductDetails>
        </Navbar>
    </div>
  )
}

export default AdminProductDetailsPage;