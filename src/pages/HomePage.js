import React, { useEffect } from 'react'
import Navbar from '../features/navbar/Navbar';
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon, ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFiltersAsync, selectAllProducts } from '../features/product/productSlice';
import { Link } from 'react-router-dom';
import MainCarousel from '../features/HomeCarousel/MainCarousel';
import HomeSectionCarousel from '../features/HomeCarousel/HomeSectionCarousel';

const oldProducts = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    thumbnail: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '65',
    color: 'Black',
    rating: 4.4,
    discountPercentage: 20,
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    thumbnail: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '85',
    color: 'Black',
    rating: 4.4,
    discountPercentage: 20,
  },
  {
    id: 3,
    name: 'Basic Tee',
    href: '#',
    thumbnail: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '95',
    color: 'Black',
    rating: 4.4,
    discountPercentage: 20,
  },
  {
    id: 4,
    name: 'Basic Tee',
    href: '#',
    thumbnail: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '55',
    color: 'Black',
    rating: 4.4,
    discountPercentage: 20,
  }
];

const HomePage = () => {
  const products = useSelector(selectAllProducts);
  const dispatch = useDispatch();
  const laptops = products.filter((product) => product.category === 'laptops');
  const mobile = products.filter((product) => product.category === 'smartphones');


  useEffect(() => {
    // const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchProductsByFiltersAsync({}));
  }, [dispatch]);


  return (
    <div>
      <Navbar>
        <MainCarousel />

        <div className='space-y-10 py-10 px-5 lg:px-10'>
          <HomeSectionCarousel products={laptops} sectionHeading='Laptop'/>
          <HomeSectionCarousel products={mobile} sectionHeading='Mobile'/>
          {/* <HomeSectionCarousel /> */}
        </div>


      </Navbar>
    </div>
  )
}

export default HomePage;


/**
 * <Navbar>
        
        <div className="py-6">
          <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">

             <p className='text-lg text-gray-900 font-medium'>Laptops</p>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {laptops.splice(0,4).map((product) => (
                <div key={product.id}>
                  <Link to={`/product-details/${product.id}`} >
                    <div key={product.id} className="group relative">
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">

                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.title}

                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            <StarIcon className='w-6 h-6 inline'></StarIcon>
                            <span className='align-bottom'>{product.rating}</span>
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-400">${product.price}</p>
                          <p className="text-sm font-medium text-gray-900 line-through">${Math.round(product.price * (1 - product.discountPercentage / 100))}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>


          </div>
        </div>

        <div className="py-6">
          <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">

             <p className='text-lg text-gray-900 font-medium'>Smartphone</p>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {mobile.splice(0,4).map((product) => (
                <div key={product.id}>
                  <Link to={`/product-details/${product.id}`} >
                    <div key={product.id} className="group relative">
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">

                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.title}

                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            <StarIcon className='w-6 h-6 inline'></StarIcon>
                            <span className='align-bottom'>{product.rating}</span>
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-400">${product.price}</p>
                          <p className="text-sm font-medium text-gray-900 line-through">${Math.round(product.price * (1 - product.discountPercentage / 100))}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>


          </div>
        </div>

        <div className="py-6">
          <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">

             <p className='text-lg text-gray-900 font-medium'>T Shirt</p>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {oldProducts.map((product) => (
                <div key={product.id}>
                  <Link to={`/product-details/${product.id}`} >
                    <div key={product.id} className="group relative">
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <img
                          src={product.thumbnail}
                          alt={product.imageAlt}
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">

                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}

                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            <StarIcon className='w-6 h-6 inline'></StarIcon>
                            <span className='align-bottom'>{product.rating}</span>
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-400">${product.price}</p>
                          <p className="text-sm font-medium text-gray-900 line-through">${Math.round(product.price * (1 - product.discountPercentage / 100))}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>


          </div>
        </div>

        <div className='py-20 bg-gray-50 text-center'>
          <p className='text-2xl font-medium text-gray-700'>Shop By Category</p>
        </div>
      </Navbar>
 */