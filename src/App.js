import React, { useEffect } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import { fetchLoggedInUserInfoAsync } from './features/user/userSlice';
import HomePage from './pages/HomePage';
import AdminHome from './pages/AdminHome';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import SinUpPage from './pages/SinUpPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import AdminProductDetailsPage from './pages/AdminProductDetailsPage';
import Protected from './features/auth/components/Protected';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import Footer from './features/common/Footer';
import OrderPage from './pages/OrderPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserProfilePage from './pages/UserProfilePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProductPage from './pages/ProductPage';
import ProductForm from './features/admin/components/ProductForm';
import AdminOrderPage from './pages/AdminOrderPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: (<HomePage></HomePage>),
  },
  {
    path: "/admin",
    element: <ProtectedAdmin><AdminHome></AdminHome></ProtectedAdmin>,
  },
  {
    path: "/products",
    element: (<ProductPage></ProductPage>),
  },
  {
    path: "/login",
    element: (<LoginPage></LoginPage>),
  },
  {
    path: "/signup",
    element: (<SinUpPage></SinUpPage>),
  },
  {
    path: "/cart",
    element: <Protected><CartPage></CartPage></Protected>,
  },
  {
    path: "/checkout",
    element: <Protected><Checkout></Checkout></Protected>,
  },
  {
    path: "/product-details/:id",
    element: (<ProductDetailsPage></ProductDetailsPage>), 
  },
  {
    path: "/admin/product-details/:id",
    element:<ProtectedAdmin><AdminProductDetailsPage></AdminProductDetailsPage></ProtectedAdmin>,
  },
  {
    path: "/admin/product-form",
    element:<ProtectedAdmin><ProductForm></ProductForm></ProtectedAdmin>,
  },
  {
    path: "/admin/product-form/edit/:id",
    element:<ProtectedAdmin><ProductForm></ProductForm></ProtectedAdmin>,
  },
  {
    path: "/admin/order",
    element:<ProtectedAdmin><AdminOrderPage></AdminOrderPage></ProtectedAdmin>,
  },
  {
    path: "/user-profile",
    element: (<Protected><UserProfilePage></UserProfilePage></Protected>),
  },
  {
    path: "/forgot-password",
    element: (<ForgotPasswordPage></ForgotPasswordPage>),
  },
  {
    path: "/order-success/:id",
    element: (<OrderSuccessPage></OrderSuccessPage>),
  },
  {
    path: "/order",
    element: (<OrderPage></OrderPage>),
  },

]);

function App() {

  // const user = useSelector(selectLoggedInUser);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  // console.log(userInfo);
  const dispatch = useDispatch();
  //jaise hi user login karta hai to fetch kar lenge ki usne kitne items cart me add kiye the aur userki info
  useEffect(()=>{
    if(userInfo){
      dispatch(fetchLoggedInUserInfoAsync(userInfo?.id)); // TODO: referesh karne par user ki info aa rhi hai
      dispatch(fetchItemsByUserIdAsync(userInfo?.id));
    }
  }, [dispatch, userInfo?.id]);

  return (
    <div className="App">
       <RouterProvider router={router} />
       <Footer/>
    </div>
  );
}

export default App;
