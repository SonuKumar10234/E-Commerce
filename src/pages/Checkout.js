import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItemFromCartAsync, selectCart, updateCartAsync } from '../features/cart/cartSlice';
import Navbar from '../features/navbar/Navbar';
import { createOrderAsync, selectCurrentOrder } from '../features/order/orderSlice';
import { selectUserInfo, updateUserAsync } from '../features/user/userSlice';


const products = [
    {
        id: 1,
        name: 'Throwback Hip Bag',
        href: '#',
        color: 'Salmon',
        price: '$90.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
        imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
        id: 2,
        name: 'Medium Stuff Satchel',
        href: '#',
        color: 'Blue',
        price: '$32.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
        imageAlt:
            'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
    // More products...
];
const addresses = [
    {
        name: 'Sonu Kumar',
        email: 'sonu@gmail.com',
        street: 'Gadhha Colony',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110034',
        country: 'India',
        phone: '9976895768'
    },
    {
        name: 'Monu Kumar',
        email: 'monu@gmail.com',
        street: 'Masjid Gali',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110028',
        country: 'India',
        phone: '9372398768'
    },

];

const Checkout = () => {
    const cartItems = useSelector(selectCart);
    const user = useSelector(selectUserInfo);
    const currentOrder = useSelector(selectCurrentOrder);
    const[selectedAddress, setSelectedAddress] = useState({});
    const[PaymentMethod, setPaymentMethod] = useState("cash");
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const subTotal = cartItems.reduce((total, item) => {
        total += item.product.price * item.quantity;
        return total;
    }, 0);

    const handleRemove = (id) => {
        dispatch(deleteItemFromCartAsync(id));
    }

    const handleQuantityChange = (e, itemId) => {
        dispatch(updateCartAsync({ id: itemId, quantity: +e.target.value }))
    }

    const handleAddress=(e)=>{
        setSelectedAddress(user.addresses[e.target.value]);
    }

    const handlePayment=(e)=>{
    //    console.log(e.target.value);
       setPaymentMethod(e.target.value)
    }

    const handleOrder=(e)=>{
         const order = {items:cartItems, totalAmount: subTotal, user: user.id, PaymentMethod, selectedAddress};
         dispatch(createOrderAsync(order));
    }


    return (
        <Navbar>
            {currentOrder && currentOrder.PaymentMethod === 'cash' && (
                <Navigate to={`/order-success/${currentOrder.id}`} replace={true}></Navigate>
            )}
            {currentOrder && currentOrder.PaymentMethod === 'online' && (
                <Navigate to={`/order`} replace={true}></Navigate>
            )}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 mb-8">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                    {/* Delivery Information */}
                    <div className='lg:col-span-3'>
                        <form noValidate className='bg-white px-5' onSubmit={handleSubmit((data) => {
                            dispatch(updateUserAsync({ ...user, addresses: [...user.addresses, data] }));
                            // setUserAddress([{...userAddress, street: data.street, city: data.city, state: data.state, pincode: data.pincode}])
                        })}>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-2xl font-semibold leading-7 text-gray-900">Delivery Address</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Provide the address to receive the order at your home.</p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-4">
                                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Full Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('name', {
                                                        required: 'name is required',
                                                    })}
                                                    id="name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    {...register('email', {
                                                        required: 'email is required',
                                                    })}
                                                    type="email"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                                Phone
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="phone"
                                                    {...register('phone', {
                                                        required: 'phone number is required',
                                                    })}
                                                    type="tel"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                                Street address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('street', {
                                                        required: 'country is required',
                                                    })}
                                                    id="street"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2 sm:col-start-1">
                                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                City
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('city', {
                                                        required: 'city is required',
                                                    })}
                                                    id="city"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                                State
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('state', {
                                                        required: 'state is required',
                                                    })}
                                                    id="region"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                                ZIP / Postal code
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('pincode', {
                                                        required: 'pincode is required',
                                                    })}
                                                    id="pincode"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-x-6">
                                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                        Reset
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Add Address
                                    </button>
                                </div>

                                <div className="border-b border-gray-900/10 pb-6">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Choose from existing address
                                    </p>
                                    <ul role="list">
                                        {user?.addresses?.map((address, index) => (
                                            <li key={index} className="flex justify-between gap-x-6 py-5 my-5 border-solid border border-gray-200 px-4">
                                                <div className="flex min-w-0 gap-x-4">
                                                    <input
                                                        onChange={handleAddress}
                                                        name="address"
                                                        type="radio"
                                                        value={index}
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <div className="min-w-0 flex-auto">

                                                        <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}, {address.city}-{address.pincode}</p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500"> {address.state}, {address.country}</p>
                                                    </div>
                                                </div>
                                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                    <p className="text-sm leading-6 text-gray-500">Email: {address.email}</p>
                                                    <p className="text-sm leading-6 text-gray-500">Phone: {address.phone}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-10 space-y-10">

                                        <fieldset>
                                            <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Methods</legend>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">Choose One</p>
                                            <div className="mt-6 space-y-6">
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="cash"
                                                        name="payments"
                                                        value="cash"
                                                        onChange={handlePayment}
                                                        checked={PaymentMethod === "cash"}
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Cash Payment
                                                    </label>
                                                </div>
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="online"
                                                        name="payments"
                                                        value="online"
                                                        onChange={handlePayment}
                                                        checked={PaymentMethod === "online"}
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="online" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Online Payemt
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>

                    {/* Cart Information*/}
                    <div className='lg:col-span-2'>
                        <div className='mx-auto bg-gray-100 max-w-7xl px-0 sm:px-0 lg:px-0'>

                            <div className="border-t border-gray-200 px-4 py-0 sm:px-6">
                                <h2 className="text-xl sm:text-2xl font-semibold my-5 leading-7 text-gray-900">Cart Items</h2>
                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {cartItems && cartItems.map((item) => (
                                            <li key={item.id} className="flex py-6">
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img
                                                        src={item.product.thumbnail}
                                                        alt={item.product.title}
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>

                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>
                                                                <Link to={`/product-details/${item.product.id}`}>{item.product.title}</Link>
                                                            </h3>
                                                            <p className="ml-4">${item.product.price}</p>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
                                                    </div>
                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                        <div className="text-gray-500">Qty
                                                            <select className='ml-5'
                                                                onChange={(e) => handleQuantityChange(e, item.id)}
                                                                value={item.quantity}
                                                            >
                                                                <option>1</option>
                                                                <option>2</option>
                                                                <option>3</option>
                                                            </select>
                                                        </div>

                                                        <div className="flex" onClick={() => handleRemove(item.id)}>
                                                            <button
                                                                type="button"
                                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>


                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6 mt-12">
                                <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
                                <div className='mt-6 space-y-4 > * + *'>
                                    <div className="flex justify-between items-center text-base font-medium text-gray-900 pt-4 border-t border-t-gray-200">
                                        <span className='text-gray-600 text-sm'>Subtotal</span>
                                        <p className='text-sm text-gray-900 font-medium'>${subTotal}.00</p>
                                    </div>
                                    <div className="flex justify-between items-center text-base font-medium text-gray-900 pt-4 border-t border-t-gray-200">
                                        <span className='text-gray-600 text-sm'>Shipping estimate</span>
                                        <p className='text-sm text-gray-900 font-medium'>$5.00</p>
                                    </div>
                                    <div className="flex justify-between items-center text-base font-medium text-gray-900 pt-4 border-t border-t-gray-200">
                                        <span className='text-gray-600 text-sm'>Tax estimate</span>
                                        <p className='text-sm text-gray-900 font-medium'>$8.32</p>
                                    </div>
                                    <div className="flex justify-between items-center text-base font-medium text-gray-900 pt-4 border-t border-t-gray-200">
                                        <p>Order total</p>
                                        <p>${subTotal}.00</p>
                                    </div>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                <div className="mt-6">
                                    <div
                                        onClick={handleOrder}
                                        className="flex items-center justify-center cursor-pointer rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                    >
                                        Pay Now
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                    <p>
                                        or
                                        <Link to='/'>
                                            <button
                                                type="button"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                Continue Shopping
                                                <span aria-hidden="true"> &rarr;</span>
                                            </button>
                                        </Link>
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Navbar>
    )
}

export default Checkout;