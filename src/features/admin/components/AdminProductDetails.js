import React, { useState, useEffect } from 'react'
import { StarIcon, PlusIcon, MinusIcon } from '@heroicons/react/20/solid';
import {  Disclosure, RadioGroup } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductByIdAsync, selectProductById } from '../../product/productSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { addItem, addToCartAsync, selectCart } from '../../cart/cartSlice';
import { selectLoggedInUser } from '../../auth/authSlice';


// const product = {
//     name: 'Zip Tote Basket',
//     price: '$192',
//     href: '#',
//     breadcrumbs: [
//         { id: 1, name: 'Men', href: '#' },
//         { id: 2, name: 'Clothing', href: '#' },
//     ],
//     images: [
//         {
//             src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
//             alt: 'Two each of gray, white, and black shirts laying flat.',
//         },
//         {
//             src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-02.jpg',
//             alt: 'Model wearing plain black basic tee.',
//         },
//         {
//             src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-03.jpg',
//             alt: 'Model wearing plain gray basic tee.',
//         },
//         {
//             src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-04.jpg',
//             alt: 'Model wearing plain white basic tee.',
//         },
//     ],
//     colors: [
//         { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
//         { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
//         { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
//     ],
//     sizes: [
//         { name: 'XXS', inStock: false },
//         { name: 'XS', inStock: true },
//         { name: 'S', inStock: true },
//         { name: 'M', inStock: true },
//         { name: 'L', inStock: true },
//         { name: 'XL', inStock: true },
//         { name: '2XL', inStock: true },
//         { name: '3XL', inStock: true },
//     ],
//     description: 'The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.',

//     additionalInfo: [
//         {
//             id: 'features',
//             name: 'Features',
//             options: [
//                 { value: '1', label: 'Multiple strap configurations' },
//                 { value: '2', label: 'Spacious interior with top zip' },
//                 { value: '3', label: 'Leather handle and tabs' },
//                 { value: '4', label: 'Interior dividers' },
//                 { value: '5', label: 'Stainless strap loops' },
//                 { value: '6', label: 'Double stitched construction' },
//                 { value: '7', label: 'Water-resistant' }
//             ],
//         },
//         {
//             id: 'care',
//             name: 'Care',
//             options: [
//                 { value: '1', label: 'Spot clean as needed' },
//                 { value: '2', label: 'Hand wash with mild soap' },
//                 { value: '3', label: 'Machine wash interior dividers' },
//                 { value: '4', label: 'Treat handle and tabs with leather conditioner' },
//             ],
//         },
//         {
//             id: 'shipping',
//             name: 'Shipping',
//             options: [
//                 { value: 'l', label: 'Free shipping on orders over $300' },
//                 { value: '2', label: 'International shipping available' },
//                 { value: '3', label: 'Expedited shipping options' },
//                 { value: '4', label: 'Signature required upon delivery' },
//             ],
//         },
//         {
//             id: 'return',
//             name: 'Return',
//             options: [
//                 { value: 'l', label: 'Easy return requests' },
//                 { value: '2', label: 'Pre-paid shipping label included' },
//                 { value: '3', label: '10% restocking fee for returns' },
//                 { value: '4', label: '60 day return window' },
//             ],
//         },
//     ],
//     details: 'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
// };

const colors = [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
];

const additionalInfo = [
    {
        id: 'features',
        name: 'Features',
        options: [
            { value: '1', label: 'Multiple strap configurations' },
            { value: '2', label: 'Spacious interior with top zip' },
            { value: '3', label: 'Leather handle and tabs' },
            { value: '4', label: 'Interior dividers' },
            { value: '5', label: 'Stainless strap loops' },
            { value: '6', label: 'Double stitched construction' },
            { value: '7', label: 'Water-resistant' }
        ],
    },
    {
        id: 'care',
        name: 'Care',
        options: [
            { value: '1', label: 'Spot clean as needed' },
            { value: '2', label: 'Hand wash with mild soap' },
            { value: '3', label: 'Machine wash interior dividers' },
            { value: '4', label: 'Treat handle and tabs with leather conditioner' },
        ],
    },
    {
        id: 'shipping',
        name: 'Shipping',
        options: [
            { value: 'l', label: 'Free shipping on orders over $300' },
            { value: '2', label: 'International shipping available' },
            { value: '3', label: 'Expedited shipping options' },
            { value: '4', label: 'Signature required upon delivery' },
        ],
    },
    {
        id: 'return',
        name: 'Return',
        options: [
            { value: 'l', label: 'Easy return requests' },
            { value: '2', label: 'Pre-paid shipping label included' },
            { value: '3', label: '10% restocking fee for returns' },
            { value: '4', label: '60 day return window' },
        ],
    },
]
const simproducts = [
    {
        id: 1,
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg',
        title: 'Zip Tote Basket',
        color: 'White and black'

    },
    {
        id: 2,
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-02.jpg',
        title: 'Zip Tote Basket',
        color: 'White and black'

    },
    {
        id: 3,
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-03.jpg',
        title: 'Zip Tote Basket',
        color: 'White and black'

    },
    {
        id: 4,
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-04.jpg',
        title: 'Zip Tote Basket',
        color: 'White and black'

    },
    {
        id: 5,
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-03.jpg',
        title: 'Zip Tote Basket',
        color: 'White and black'

    },
    {
        id: 6,
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg',
        title: 'Zip Tote Basket',
        color: 'White and black'

    }
];

const reviews = { href: '#', average: 4, totalCount: 117 }
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const AdminProductDetails = () => {
    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const product = useSelector(selectProductById);
    // const user = useSelector(selectLoggedInUser);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const cartItems = useSelector(selectCart);
    const [selectedImage, setSelectedImage] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    // console.log(selectedImage);
    // console.log(cartItems);

    const handleCart = (e) => {
        e.preventDefault();
        //    dispatch(addItem(item));
        if (!userInfo) {
            navigate('/login');
        }
        else {
            if(cartItems.findIndex((item)=>item.product.id === product.id ) < 0){
                const newItem = { product: product.id, quantity: 1, user: userInfo?.id };
                dispatch(addToCartAsync(newItem));
                alert('Item added to cart');
            }
            else{
                alert('Item added already');
            }
        }
    }

    useEffect(() => {
        dispatch(fetchProductByIdAsync(params.id));
    }, [dispatch, params.id]);


    return (
        <main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white'>
            <div className='py-4'>

                {/* Product Information */}
                {
                    product && (
                        <div className='md:grid md:grid-cols-2 md:items-start md:gap-8'>
                            <div className='sm:flex sm:flex-col-reverse'>
                                <div className='mx-auto max-w-2xl lg:max-w-none mt-6 w-full hidden sm:block'> {/* md:hidden */}
                                    <div className='grid grid-cols-4 gap-6 '>
                                        {
                                            product.images && product.images.map((image, index) => {
                                                return (
                                                    <button
                                                        onClick={() => setSelectedImage(image)}
                                                        key={index}
                                                        className='flex justify-center items-center h-24 rounded-md relative cursor-pointer text-sm font-medium bg-white text-gray-900 uppercase' >
                                                        <span className='absolute rounded-md overflow-hidden inset-0'>
                                                            <img src={image} className='w-full h-full object-cover object-center' alt={product.title} />
                                                        </span>
                                                    </button>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className='w-full relative aspect-h-1 aspect-w-1'>
                                    <div className='absolute w-full h-full left-0 right-0 bottom-0 top-0 '>
                                        <img src={selectedImage?selectedImage: product.images[0]} className='w-full h-full object-cover object-center rounded-lg' />
                                    </div>
                                </div>
                            </div>



                            <div className='px-px mt-10 lg:mt-0 sm:px-0 sm:mt-16'>
                                <h1 className='text-3xl font-bold tracking-tight text-gray-900'>{product.title}</h1>
                                <div className='mt-3'>
                                    <h2 className="absolute overflow-hidden w-px h-px p-0 -m-px whitespace-nowrap border-0">Product information</h2>
                                    <p className="text-3xl tracking-tight text-gray-900">${product.price}</p>
                                </div>

                                {/* <div className='mt-3'>
                            <h2 className="absolute overflow-hidden w-px h-px p-0 -m-px whitespace-nowrap border-0">Reviews</h2>
                            <div className='flex items-center'>
                                <div className='flex items-center'>
                                    <StarIcon />
                                </div>
                            </div>
                        </div> */}

                                {/* Reviews */}
                                <div className="mt-6">
                                    <h3 className="sr-only">Reviews</h3>
                                    <div className="flex items-center">
                                        <div className="flex items-center">
                                            {[0, 1, 2, 3, 4].map((rating) => (
                                                <StarIcon
                                                    key={rating}
                                                    className={classNames(
                                                        reviews.average > rating ? 'text-indigo-600' : 'text-gray-200',
                                                        'h-5 w-5 flex-shrink-0'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            ))}
                                        </div>
                                        <p className="sr-only">{reviews.average} out of 5 stars</p>
                                        <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                            {reviews.totalCount} reviews
                                        </a>
                                    </div>
                                </div>

                                {/* Colors */}
                                <div className='mt-6'>
                                    <h3 className="text-sm font-medium text-gray-900">Color</h3>

                                    <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                                        <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                                        <div className="flex items-center space-x-3">
                                            {colors.map((color) => (
                                                <RadioGroup.Option
                                                    key={color.name}
                                                    value={color}
                                                    className={({ active, checked }) =>
                                                        classNames(
                                                            color.selectedClass,
                                                            active && checked ? 'ring ring-offset-1' : '',
                                                            !active && checked ? 'ring-2' : '',
                                                            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                                                        )
                                                    }
                                                >
                                                    <RadioGroup.Label as="span" className="sr-only">
                                                        {color.name}
                                                    </RadioGroup.Label>
                                                    <span
                                                        aria-hidden="true"
                                                        className={classNames(
                                                            color.class,
                                                            'h-8 w-8 rounded-full border border-black border-opacity-10'
                                                        )}
                                                    />
                                                </RadioGroup.Option>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                </div>

                                {/* Description */}
                                <div className='mt-5'>
                                    <h3 className="absolute overflow-hidden w-px h-px p-0 -m-px whitespace-nowrap border-0">Description</h3>
                                    <div className='text-base text-slate-700'>
                                        <p>{product.description}</p>
                                    </div>
                                </div>

                                <div className='mt-5'>
                                    {/* <button className='text-base font-medium bg-indigo-600 hover:bg-indigo-700 text-white w-full py-3 px-8 rounded-md'>Add to Cart</button> */}
                                    <button
                                        onClick={handleCart}
                                        type="submit"
                                        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Add to bag
                                    </button>
                                </div>

                                {/* Additional Information*/}
                                <form className="mt-4 border-t border-gray-200">

                                    {additionalInfo.map((addInfo) => (
                                        <Disclosure as="div" key={addInfo.id} className="border-t border-gray-200 px-4 py-6">
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-mx-2 -my-3 flow-root">
                                                        <Disclosure.Button className="flex w-full items-center justify-between px-2 py-3 text-gray-400 hover:text-gray-500">
                                                            <span className="font-medium text-gray-900">{addInfo.name}</span>
                                                            <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                                ) : (
                                                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                                )}
                                                            </span>
                                                        </Disclosure.Button>
                                                    </h3>
                                                    <Disclosure.Panel className="pt-6">
                                                        {/* <h3 className="text-sm font-medium text-gray-900">Highlights</h3> */}

                                                        <div className="mt-4">
                                                            <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                                                {addInfo.options.map((highlight) => (
                                                                    <li key={highlight.value} className="text-gray-400">
                                                                        <span className="text-gray-600">{highlight.label}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    ))}
                                </form>
                            </div>
                        </div>
                    )
                }



                {/* Similar Products */}
                <div className='px-4 py-16 sm:px-0 mt-10 border-t border-gray-200 '>
                    <h2 className='text-xl font-bold text-gray-900'>Similar Products</h2>
                    <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-12 sm:gap-6'>
                        {
                            simproducts.map((product) => {
                                return (
                                    <div key={product.id}>
                                        <div className='relative'>
                                            <div className='rounded-lg overflow-hidden w-full h-72 relative'>
                                                <img src={product.src} className='w-full h-full object-cover object-center' />
                                            </div>
                                            <div className='mt-4 relative'>
                                                <h3 className='text-sm font-medium text-gray-900'>{product.title}</h3>
                                                <p className='text-sm text-gray-500 mt-1'>{product.color}</p>
                                            </div>
                                        </div>
                                        <div className='mt-6 text-sm font-medium text-gray-900 py-2 px-8 border border-transparent rounded-md bg-gray-100 hover:bg-gray-200 flex justify-center items-center cursor-pointer'>
                                            <p>Add to Cart</p>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        </main >
    )
}

export default AdminProductDetails;