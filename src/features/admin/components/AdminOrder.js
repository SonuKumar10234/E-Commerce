import React, { useEffect, useState } from 'react'
import { EyeIcon, PencilIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrdersAsync, selectOrders, selectTotalOrders, updateOrderAsync } from '../../order/orderSlice';
import { ITEMS_PER_PAGE } from '../../../app/constants';
import Pagination from '../../common/Pagination';

const order = [
    { id: 'ASDE100', title: 'iPhone X', price: '$199', quantity: 2, totalAmount: '$1599', address: '11th Main Street, Delhi, India' },
    { id: 'ASDE200', title: 'MacBook Laptop', price: '$199', quantity: 1, totalAmount: '$3499', address: '12th Main Street, Delhi, India' },
    { id: 'ASDE300', title: 'iPhone X', price: '$199', quantity: 1, totalAmount: '$1199', address: '13th Main Street, Delhi, India' },
    { id: 'ASDE400', title: 'iPhone X', price: '$199', quantity: 2, totalAmount: '$599', address: '14th Main Street, Delhi, India' },
    { id: 'ASDE500', title: 'iPhone X', price: '$199', quantity: 3, totalAmount: '$1399', address: '15th Main Street, Delhi, India' },
]

const AdminOrder = () => {
    const [page, setPage] = useState(1);
    const[sort, setSort] = useState({});
    const [editableOrderId, setEditableOrderId] = useState(-1);
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);
    const totalOrders = useSelector(selectTotalOrders);

    const handleEdit = (orderId) => {
        if(editableOrderId === orderId){
            setEditableOrderId(-1);
        }
        else{
            setEditableOrderId(orderId);
            
        }
    }

    const handleUpdateStatus = (e, order) => {
        const updatedOrder = { ...order, status: e.target.value };
        dispatch(updateOrderAsync(updatedOrder));
        setEditableOrderId(-1);
    }

    const handlePage=(page)=>{
        setPage(page);
    }

    const handleSort = (field) => {
        const sort = { _sort: field.sort, _order: field.order };
        setSort(sort);
    }

    const chooseColor = (orderStatus) => {
        switch (orderStatus) {
            case 'Pending':
                return 'bg-purple-200 text-purple-900';
            case 'Shipped':
                return 'bg-indigo-200 text-indigo-900';
            case 'Dispatched':
                return 'bg-yellow-200 text-yellow-900';
            case 'Delivered':
                return 'bg-green-200 text-green-900';
            case 'Cancelled':
                return 'bg-red-200 text-red-900';
            default:
                return 'bg-purple-200 text-purple-900';
        }
    }

    useEffect(() => {
        const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
        console.log(sort)
        dispatch(fetchAllOrdersAsync({ sort, pagination }));
      }, [dispatch, page, sort]);

    useEffect(() => {
        setPage(1);
    }, [totalOrders]);
    

    return (
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <div>
                    <h2 className="text-2xl font-semibold leading-tight">Orders</h2>
                </div>
                <div className="my-2 flex sm:flex-row flex-col">
                    {/* <div className="flex flex-row mb-1 sm:mb-0">
        <div className="relative">
          <select className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
                     </div> */}
                    <div className="block relative">
                        <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                            <svg
                                viewBox="0 0 24 24"
                                className="h-4 w-4 fill-current text-gray-500"
                            >
                                <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                            </svg>
                        </span>
                        <input
                            placeholder="Search by Order Id"
                            className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                        />
                    </div>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th 
                                    onClick={(e) =>
                                        handleSort({
                                          sort: 'id',
                                          order: sort?._order === 'asc' ? 'desc' : 'asc',
                                        })
                                      }
                                    className="cursor-pointer px-5 py-5 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Order Id {' '}
                                        {
                                            sort._sort === 'id' && (
                                                sort._order === 'asc' ? <ArrowDownIcon className='w-4 h-4 inline'/> : <ArrowUpIcon className='w-4 h-4 inline'/>
                                            )
                                        }
                                    </th>
                                    <th className="px-5 py-5 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Items
                                    </th>
                                    <th 
                                    onClick={(e) =>
                                        handleSort({
                                          sort: 'totalAmount',
                                          order: sort?._order === 'asc' ? 'desc' : 'asc',
                                        })
                                      }
                                    className="cursor-pointer px-5 py-5 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Total Amount {' '}
                                        {
                                            sort._sort === 'totalAmount' && (
                                                sort._order === 'asc' ? <ArrowDownIcon className='w-4 h-4 inline'/> : <ArrowUpIcon className='w-4 h-4 inline'/>
                                            )
                                        }
                                    </th>
                                    <th className="px-5 py-5 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Shipping Address
                                    </th>
                                    <th className="px-5 py-5 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-5 py-5 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{order.id}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {
                                                order.items.map((item) => (

                                                    <div className="flex items-center" key={item.id}>
                                                        <div className="flex-shrink-0 w-10 h-10">
                                                            <img
                                                                className="w-full h-full rounded-full"
                                                                src={item.product.thumbnail}
                                                                alt={item.product.title}
                                                            />
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {item.product.title}, ${item.product.price}
                                                            </p>
                                                            <span className="text-gray-900 whitespace-no-wrap">Qty: #{item.quantity}</span>

                                                        </div>
                                                    </div>

                                                ))
                                            }
                                        </td>

                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">${order.totalAmount}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 text-sm font-medium">{order.selectedAddress.name}</p>
                                            <p className="text-gray-900 whitespace-no-wrap">{order.selectedAddress.street}, {order.selectedAddress.city},</p>
                                            <p className="text-gray-900 whitespace-no-wrap">{order.selectedAddress.state} - {order.selectedAddress.pincode}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">

                                            {editableOrderId === order.id ? <select onChange={(e) => handleUpdateStatus(e, order)}>
                                                <option value='Pending'>Pending</option>
                                                <option value='Shipped'>Shipped</option>
                                                <option value='Dispatched'>Dispatched</option>
                                                <option value='Delivered'>Delivered</option>
                                                <option value='Cancelled'>Cancelled</option>
                                            </select>
                                                :
                                                <span className={` ${chooseColor(order.status)} rounded-full inline-block px-3 py-2 font-semibold leading-tight`}>
                                                    {order.status}
                                                </span>
                                            }
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className='flex '>
                                                <div className="cursor-pointer text-gray-600 hover:text-gray-400 mr-2">
                                                    <EyeIcon className="w-5 h-5 text-base" />
                                                </div>
                                                <div className="cursor-pointer text-gray-600 hover:text-gray-400 mx-2">
                                                    <PencilIcon className="w-5 h-5 text-base" onClick={() => handleEdit(order.id)} />
                                                </div>
                                            </div>
                                        </td>


                                    </tr>
                                ))}

                            </tbody>
                        </table>

                        {/* <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                            <span className="text-xs xs:text-sm text-gray-900">
                                Showing 1 to 4 of 50 Entries
                            </span>
                            <div className="inline-flex mt-2 xs:mt-0">
                                <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                                    Prev
                                </button>
                                <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                                    Next
                                </button>
                            </div>
                        </div> */}
                        <Pagination
                            page={page}
                            setPage={setPage}
                            handlePage={handlePage}
                            totalItems={totalOrders}>
                        </Pagination>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AdminOrder