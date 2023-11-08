import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItemFromCartAsync, selectCart, updateCartAsync } from './cartSlice';
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, CheckIcon , PlusCircleIcon, MinusCircleIcon} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom';
import Modal from '../common/Modal';

const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-item.product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-item.product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  // More item.products...
]

function Cart() {
  const [open, setOpen] = useState(true);
  const [showModal, setShowModal] = useState(null);
  const cartItems = useSelector(selectCart);
  const dispatch = useDispatch();
  // console.log(cartItems);

  const subTotal = cartItems.reduce((total, item) => {
    total += item.product.price * item.quantity;
    return total;
  }, 0);

  const handleRemove = (id) => {
    // dispatch(removeItem(id));
    dispatch(deleteItemFromCartAsync(id));
  }

  const handleQuantityChange = (item, type) => {
    //  const quantity = e.target.value;
    //  dispatch(updateQuantity({quantity, item.productId}));
    // console.log({id: itemId, quantity: +e.target.value});
    //previous
    // dispatch(updateCartAsync({ id: itemId, quantity: +e.target.value }))
    //new
    var quantity = item.quantity;
     if(type === 'inc'){
          quantity += 1;
          dispatch(updateCartAsync({ id: item.id, quantity: quantity }));
     }
     else{
        if(quantity > 1){
          quantity -= 1;
          dispatch(updateCartAsync({ id: item.id, quantity: quantity }));
        }
     }
  }



  return (
    <div className='mx-auto pb-8 max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-x-8 gap-y-10 grid-cols-1 md:grid-cols-10 md:gap-x-8'>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6 md:col-span-6">
        <h3 className="text-2xl sm:text-3xl pb-4 my-5 font-medium tracking-tight text-gray-900 border-b border-b-gray-200">Cart Items</h3>
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
                  <div className="flex flex-1 items-end justify-between text-sm mt-2">
                    <div className="text-gray-500 flex items-center">Qty
                      {/* <select className='ml-5 rounded-md text-sm text-gray-700 font-medium border border-gray-300'
                        onChange={(e) => handleQuantityChange(e, item.id)}
                        value={item.quantity}
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                      </select> */}
                      <button
                        onClick={() => handleQuantityChange(item, 'inc')}
                        type="button"
                        className="font-medium text-gray-600 hover:text-gray-400 mx-2 transition-colors duration-300"
                      >
                        <PlusCircleIcon className='w-5 h-5'/>
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item, 'dec')}
                        type="button"
                        className="font-medium text-gray-600 hover:text-gray-400 ml-2 transition-colors duration-300"
                      >
                        <MinusCircleIcon className='w-5 h-5'/>
                      </button>
                    </div>

                    <div className="flex">
                      <Modal
                        title={`Delete ${item.product.title}`}
                        message='Are you sure you want to delete this item from your cart?'
                        dangerOption='Delete'
                        cancelOption='Cancel'
                        dangerAction={() => handleRemove(item.id)}
                        cancelAction={() => setShowModal(-1)}
                        showModal={showModal === item.id}
                      >
                      </Modal>
                      <button
                        onClick={() => setShowModal(item.id)}
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  {item.product.stock >= 1 && <p className='flex items-center text-sm mt-4 text-gray-700'>
                    <CheckIcon className='w-5 h-4 text-green-500' />
                    <span>In stock</span>
                  </p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className='mt-8'>
        <p className='text-base font-medium pb-3'>Apply Coupon Code</p>
        <div className='flex flex-wrap gap-4 rounded-md border border-gray-200 py-6 px-4'>
          <input
            type="text"
            id="coupon"
            placeholder='Enter Coupon Code'
            className="block sm:w-3/6 lg:w-3/4 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Apply Coupon
          </button>
        </div>
        </div>
      </div>


      <div className="border-t border-gray-200 px-4 py-6 sm:px-6 bg-gray-100 mt-12 md:col-span-4 h-fit">
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
          <Link
            to="/checkout"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or
            <Link to='/'>
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={() => setOpen(false)}
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
}

export default Cart;
