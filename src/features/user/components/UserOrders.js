import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline'
import { fetchLoggedInUserOrdersAsync, selectUserOrders } from '../userSlice';
import { selectLoggedInUser } from '../../auth/authSlice';
import OrderTracker from './OrderTracker';

const orders = [
    {
        id: 1,
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg',
        title: 'Zip Tote Basket',
        description: "This durable double-walled insulated tumbler keeps your beverages at the perfect temperature all day long. Hot, cold, or even lukewarm if you're weird like that, this bottle is ready for your next adventure.",
        price: 123,
        color: 'White and black',
        quantity: 2,
        status: 'Pending'

    },
    {
        id: 2,
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-02.jpg',
        title: 'Zip Tote Basket',
        description: "This durable double-walled insulated tumbler keeps your beverages at the perfect temperature all day long. Hot, cold, or even lukewarm if you're weird like that, this bottle is ready for your next adventure.",
        price: 199,
        color: 'White and black',
        quantity: 3,
        status: 'Processing'

    },
    {
        id: 3,
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-03.jpg',
        title: 'Zip Tote Basket',
        description: "This durable double-walled insulated tumbler keeps your beverages at the perfect temperature all day long. Hot, cold, or even lukewarm if you're weird like that, this bottle is ready for your next adventure.",
        price: 145,
        color: 'White and black',
        quantity: 1,
        status: 'Delivered'

    },
    {
        id: 4,
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-04.jpg',
        title: 'Zip Tote Basket',
        description: "This durable double-walled insulated tumbler keeps your beverages at the perfect temperature all day long. Hot, cold, or even lukewarm if you're weird like that, this bottle is ready for your next adventure.",
        price: 549,
        color: 'White and black',
        quantity: 2,
        status: 'Pending'

    },
    {
        id: 5,
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-03.jpg',
        title: 'Zip Tote Basket',
        description: "This durable double-walled insulated tumbler keeps your beverages at the perfect temperature all day long. Hot, cold, or even lukewarm if you're weird like that, this bottle is ready for your next adventure.",
        price: 989,
        color: 'White and black',
        quantity: 1,
        status: 'Delivered'

    },
    {
        id: 6,
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg',
        title: 'Zip Tote Basket',
        description: "This durable double-walled insulated tumbler keeps your beverages at the perfect temperature all day long. Hot, cold, or even lukewarm if you're weird like that, this bottle is ready for your next adventure.",
        price: 899,
        color: 'White and black',
        quantity: 2,
        status: 'Processing'

    }
];

const UserOrders = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);
    const userOrders = useSelector(selectUserOrders);

    useEffect(() => {
        dispatch(fetchLoggedInUserOrdersAsync(user.id));
    }, [dispatch, user.id]);


    return (
        <>
            <div className='bg-white'>
                <div className='max-w-6xl mx-auto my-10 py-10 sm:px-6 '>
                    {/* Header Part */}
                    <div className='px-4 sm:px-0'>
                        <h1 className="text-gray-900 font-bold tracking-tight text-2xl">My Orders</h1>
                        <p className="text-sm mt-2 text-gray-500">Check the status of recent orders, manage returns, and download invoices.</p>
                    </div>

                    {/* Order Details */}
                    {
                        userOrders.map((order) => (
                            <div key={order.id} className='border border-gray-300 mt-16'>
                                <div className='' >
                                    <div className='p-4 sm:p-0'>
                                        {/* Order 1*/}
                                        <div>
                                            {/* Order Header */}
                                            <div className='py-6 px-4 bg-gray-100 text-gray-50 sm:p-6 sm:rounded-lg md:flex md:justify-between md:items-center'>
                                                <div className='text-gray-600 text-sm flex-auto md:grid md:grid-cols-3 md:gap-x-6 divide-opacity-100 divide-y space-y-4 md:divide-y-0 md:space-y-0 lg:gap-x-10 lg:flex-none'>

                                                    {/* order number */}
                                                    <div className='flex justify-between md:block'>
                                                        <div className='font-medium text-gray-900'>Order Number</div>
                                                        <div className='m-0 md:mt-1'>{order.id}</div>
                                                    </div>
                                                    <div className='flex justify-between md:block pt-4 md:pt-0 '>
                                                        <div className='font-medium text-gray-900'>Order Placed</div>
                                                        <div className='m-0'>January 22, 2021</div>
                                                    </div>
                                                    <div className='flex justify-between font-medium pt-4 md:pt-0 md:block text-gray-900'>
                                                        <div className='font-medium text-gray-900'>Total Amount</div>
                                                        <div className='m-0 md:mt-1'>${order.totalAmount}</div>
                                                    </div>


                                                </div>
                                                <div className='sm:flex mt-6 md:mt-0 space-y-4 sm:space-x-4 sm:space-y-0 md:space-x-6 lg:space-x-8'>
                                                    { order.status === 'Delivered' && <button className='w-full md:w-auto  text-sm text-gray-700 font-medium px-4 py-2 rounded-md bg-white hover:bg-gray-50 shadow-sm flex justify-center items-center border border-gray-300'>Return</button>}
                                                    {order.status !== 'Delivered' && <button className='w-full md:w-auto  text-sm text-gray-700 font-medium px-4 py-2 rounded-md bg-white hover:bg-gray-50 shadow-sm flex justify-center items-center border border-gray-300' href='#'>Cancel</button>}
                                                    <button className='w-full md:w-auto  text-sm text-gray-700 font-medium px-4 py-2 rounded-md bg-white hover:bg-gray-50 shadow-sm flex justify-center items-center border border-gray-300' href='#'>View Invoice</button>
                                                </div>
                                            </div>


                                            {/* Order Items*/}
                                            <div className='px-4 sm:px-0 mt-6 sm:mt-10 flow-root'>
                                                <div className='pb-5'>
                                                <OrderTracker status={order.status}/>
                                                </div>
                                                <div className=''>

                                                    {
                                                        order.items.map((item) => (
                                                            <div className='py-6 sm:py-10 flex border-b border-b-gray-200' key={item.product.id}>
                                                                <div className='min-w-0 flex-1'>
                                                                    <div className='sm:pr-4'>
                                                                        <div className='sm:flex sm:justify-between'>
                                                                            <div>
                                                                                <h4 className="text-gray-900 font-medium">{item.product.title}</h4>
                                                                                <p className="hidden sm:block text-sm text-gray-500 mt-2">{item.product.brand}</p>
                                                                                <p className="hidden sm:block text-sm text-gray-500 mt-2">Quantity : {item.quantity}</p>
                                                                            </div>
                                                                            <p className="text-gray-900 font-medium mt-1 sm:mt-0 sm:ml-6">${item.product.price}.00</p>
                                                                        </div>
                                                                        <div className='text-sm font-medium flex mt-2 sm:mt-4 '>
                                                                            <a href="#" className="text-indigo-600">View Product</a>
                                                                            <div className="pl-4 sm:pl-6 ml-4 sm:ml-6 border-l border-l-gray-200">
                                                                                <a href="#" className="text-indigo-600">Buy Again</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='font-medium mt-6'>
                                                                        {
                                                                            order.status === 'Delivered' ? (
                                                                                <div className='flex'>
                                                                                    <CheckIcon className='w-6 h-6 text-green-500 flex-none mr-1' /> <p>{order.status}</p>
                                                                                </div>
                                                                            )
                                                                                :
                                                                                (
                                                                                    <div className='flex'>
                                                                                        <p>{order.status}</p>
                                                                                    </div>
                                                                                )
                                                                        }


                                                                    </div>
                                                                </div>
                                                                <div className='shrink-0 ml-4 sm:ml-6 sm:m-0 sm:mr-6 sm:order-first'>
                                                                    <img src={item.product.thumbnail} className='w-20 sm:w-40 h-20 sm:h-40 rounded-lg object-center object-cover col-start-2 sm:col-start-1 sm:row-span-2 sm:row-start-1' />
                                                                </div>
                                                            </div>
                                                        ))
                                                    }

                                                </div>
                                            </div>
                                        </div>

                                        {/* Order 2*/}
                                        {/* <div></div> */}
                                    </div>
                                </div>

                                {/* Payment Details */}
                                <div className='mt-20 p-4 sm:p-0'>
                                    <div className='py-6 px-6 bg-gray-50 rounded-lg lg:py-8 lg:px-0 lg:grid lg:grid-cols-12 lg:gap-x-8 '>
                                        <div className='text-sm grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-x-8 lg:pl-8 lg:col-span-7'>
                                            <div>
                                                <div className='text-gray-900 font-medium'>Shipping Address</div>
                                                <div className='mt-3 text-gray-500'>
                                                    <span className='block'>{order.selectedAddress.street}</span>
                                                    <span className='block'>{order.selectedAddress.city}</span>
                                                    <span className='block'>{order.selectedAddress.state} - {order.selectedAddress.pincode}, India</span>
                                                </div>
                                            </div>

                                            <div>
                                                <div className='text-gray-900 font-medium'>Payment Information</div>
                                                <div className='mt-3'>
                                                    <p className='text-gray-900'>Payment : {order.PaymentMethod}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='text-sm mt-8 divide-opacity-100 divide-y lg:mt-0 lg:pr-8 lg:col-span-5'>
                                            <div className='flex justify-between items-center pb-4'>
                                                <div className='text-gray-600'>Subtotal</div>
                                                <div className='text-gray-900 font-medium'>${order.totalAmount}</div>
                                            </div>
                                            <div className='flex justify-between items-center py-4'>
                                                <div className='text-gray-600'>Subtotal</div>
                                                <div className='text-gray-900 font-medium'>$5.00</div>
                                            </div>
                                            <div className='flex justify-between items-center py-4'>
                                                <div className='text-gray-600'>Subtotal</div>
                                                <div className='text-gray-900 font-medium'>$7.50</div>
                                            </div>
                                            <div className='flex justify-between items-center pt-4'>
                                                <div className='text-gray-900 font-medium'>Order Total</div>
                                                <div className='text-indigo-600 font-medium'>${order.totalAmount}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))

                    }



                </div>
            </div>
        </>
    )
}

export default UserOrders;