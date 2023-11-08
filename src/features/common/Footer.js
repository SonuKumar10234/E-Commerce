import React from 'react'

const Footer = () => {
    return (
        <footer className='bg-gray-900'>
            <div className='max-w-7xl mx-auto text-white px-4 sm:px-6'>

                <div className='py-16'>
                    <div className='grid grid-cols-1 md:grid-cols-12 md:gap-y-12 md:gap-x-8 md:auto-rows-min md:grid-flow-col '>
                        {/* logo */}
                        <div className='col-span-1 md:col-span-2 lg:col-start-1 lg:row-start-1'>
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt="Your Company"
                            />
                        </div>

                        {/* main content */}
                        <div className='mt-10 md:mt-0 grid grid-cols-2 sm:grid-cols-3 col-span-6 md:col-span-12 gap-8 md:col-start-3 md:row-start-1 lg:col-span-6 lg:col-start-2'>
                            <div className='gap-y-12 sm:gap-x-8 grid grid-cols-1 sm:grid-cols-2 sm:col-span-2'>
                                <div>
                                    <h3 className="text-base text-white font-medium">Products</h3>
                                    <ul role="list" className="mt-6 space-y-4">
                                        <li className="text-base">
                                            <a href="#" className="text-gray-500 hover:text-gray-400">Bags</a>
                                        </li>
                                        <li className="text-base">
                                            <a href="#" className="text-gray-500 hover:text-gray-400">Tees</a>
                                        </li>
                                        <li className="text-base">
                                            <a href="#" className="text-gray-500 hover:text-gray-400">Objects</a>
                                        </li>
                                        <li className="text-base">
                                            <a href="#" className="text-gray-500 hover:text-gray-400">Home Goods</a>
                                        </li>
                                        <li className="text-base">
                                            <a href="#" className="text-gray-500 hover:text-gray-400">Accessories</a>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-base text-white font-medium">Company</h3>
                                    <ul role="list" className="mt-6 space-y-4">
                                        <li className="text-base">
                                            <a href="#" className="text-gray-500 hover:text-gray-400">Who we are</a>
                                        </li>
                                        <li className="text-base">
                                            <a href="#" className="text-gray-500 hover:text-gray-400">Tees</a>
                                        </li>
                                        <li className="text-base">
                                            <a href="#" className="text-gray-500 hover:text-gray-400">Careers</a>
                                        </li>
                                        <li className="text-base">
                                            <a href="#" className="text-gray-500 hover:text-gray-400">Terms & Conditions</a>
                                        </li>
                                        <li className="text-base">
                                            <a href="#" className="text-gray-500 hover:text-gray-400">Privacy</a>
                                        </li>
                                    </ul>
                                </div>

                            </div>

                            <div>
                                <h3 className='text-base text-white font-medium '>Customer Service</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li className="text-base">
                                        <a href="#" className="text-gray-500 hover:text-gray-400">Contact</a>
                                    </li>
                                    <li className="text-base">
                                        <a href="#" className="text-gray-500 hover:text-gray-400">Shipping</a>
                                    </li>
                                    <li className="text-base">
                                        <a href="#" className="text-gray-500 hover:text-gray-400">Returns</a>
                                    </li>
                                    <li className="text-base">
                                        <a href="#" className="text-gray-500 hover:text-gray-400">Warranty</a>
                                    </li>
                                    <li className="text-base">
                                        <a href="#" className="text-gray-500 hover:text-gray-400">Secure Payments</a>
                                    </li>
                                    <li className="text-base">
                                        <a href="#" className="text-gray-500 hover:text-gray-400">FAQ</a>
                                    </li>
                                </ul>
                            </div>

                        </div>

                        {/* newslater */}
                        <div className='mt-12 md:mt-0  md:col-span-12 md:row-start-2 md:col-start-3 lg:col-span-4 lg:row-start-1 lg:col-start-9'>
                            <h3 className="text-base text-white font-medium">Sign up for our newsletter</h3>
                            <p className="text-base text-gray-500 mt-6">The latest deals and savings, sent to your inbox weekly.</p>
                            <form className='sm:max-w-lg flex mt-2'>

                                <input
                                    required
                                    type="email"
                                    placeholder='Email Address'
                                    className="w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-400 dark:focus:border-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-indigo-300"
                                />

                                <div className='shrink-0 ml-4'>
                                    <button
                                        type="submit"
                                        className="rounded-md bg-gray-700 px-4 py-2.5 tracking-wider text-sm font-medium text-white transition-colors duration-300 shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                       Subscribe
                                    </button>
                                    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className='py-10 text-center border-t border-gray-500'>
                    <p className="text-base text-white">© {new Date().getFullYear()} E-Commerce Company. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;