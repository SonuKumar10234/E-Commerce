import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { XMarkIcon, CheckIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom';
import { selectUserInfo, updateUserAsync } from '../userSlice';
import { useForm } from 'react-hook-form';



function UserProfile() {
  const [selectEditFormByIndex, setSelectEditFormByIndex] = useState(-1);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);


  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectEditFormByIndex(-1);
  }

  const handleUpdate = (e, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  }

  const handleEditForm = (index) => {
    setSelectEditFormByIndex(index);
    const address = user.addresses[index];
    setValue('name', address.name);
    setValue('email', address.email);
    setValue('phone', address.phone);
    setValue('street', address.street);
    setValue('city', address.city);
    setValue('state', address.state);
    setValue('pincode', address.pincode);
  }

  const handleAdd=(newAddress)=>{
    const newUser = { ...user, addresses: [...user.addresses, newAddress] };
    dispatch(updateUserAsync(newUser));
    setShowAddressForm(false);
  }


  return (
    <div className='mx-auto bg-white max-w-7xl px-4 sm:px-6 lg:px-8 border border-gray-800'>

      <div className="px-4 py-6 sm:px-6">
        <UserCircleIcon className='w-20 h-20' />
        <h3 className="text-base pb-4 my-2 font-medium tracking-tight text-gray-900">Name: {user?.role} </h3>
        <h3 className="text-base pb-4 my-2 font-medium tracking-tight text-gray-900">Email: {user?.email}</h3>

      </div>
      

      <div className="px-4 py-6 mb-6 sm:px-6 bg-gray-50 h-fit">
        <div className='flex justify-end'>
          <button
            onClick={()=>{setShowAddressForm(true); setSelectEditFormByIndex(-1)}}
            className='w-full md:w-auto my-6 text-sm text-gray-700 font-medium px-4 py-2 rounded-md bg-white hover:bg-gray-50 shadow-sm flex justify-center items-center border border-gray-300'
          >
            Add New Address
          </button>
        </div>
       {
        showAddressForm && (
          <form noValidate className='px-5 pt-10' onSubmit={handleSubmit((data) => {
            handleAdd(data);
            reset();
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
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Address
                </button>
              </div>
            </div>
          </form>
        )
      } 
        <h2 className="text-lg font-medium text-gray-900">Your Addresses:</h2>

        {
          user?.addresses?.map((address, index) => {
            return (
              <div key={index}>
                {
                  selectEditFormByIndex === index && (
                    <form noValidate className='px-5 pt-10' onSubmit={handleSubmit((data) => {
                      handleEdit(data, index);
                      reset();
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
                          <button
                            onClick={() => setSelectEditFormByIndex(-1)}
                            type="button"
                            className="text-sm font-semibold leading-6 text-gray-900"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Edit Address
                          </button>
                        </div>
                      </div>
                    </form>
                  )
                }
                <div className='flex justify-between flex-col sm:flex-row gap-x-6 px-5 py-6 mt-5 border border-gray-200 '>
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-base font-semibold leading-6 text-gray-900">{address.name}</p>
                      <p className="text-sm leading-6 text-gray-500">{address.street}</p>
                      <p className="mt-1 text-sm leading-5 text-gray-500">{address.city}- {address.pincode} </p>
                      <p className="mt-1 truncate text-sm leading-5 text-gray-500">{address.state}</p>
                      <p className="mt-1 text-sm leading-5 text-gray-500"> Phone : {address.phone}</p>
                      <p className="mt-1 text-sm leading-5 text-gray-500"> Email : {address.email}</p>
                    </div>
                  </div>

                  <div className="shrink-0 sm:flex sm:items-end sm:flex mt-8 md:mt-0 space-y-4 sm:space-x-4 sm:space-y-0 md:space-x-6 lg:space-x-8">
                    <button
                      onClick={() => handleEditForm(index)}
                      className='w-full md:w-auto text-sm text-gray-700 font-medium px-4 py-2 rounded-md bg-white hover:bg-gray-50 shadow-sm flex justify-center items-center border border-gray-300'>Edit</button>
                    <button
                      onClick={(e) => handleUpdate(e, index)}
                      className='w-full md:w-auto text-sm text-gray-700 font-medium px-4 py-2 rounded-md bg-white hover:bg-gray-50 shadow-sm flex justify-center items-center border border-gray-300'>Remove</button>
                  </div>
                </div>
              </div>
            )
          })
        }


      </div>

    </div>
  );
}

export default UserProfile;
