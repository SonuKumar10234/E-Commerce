import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedProduct, createProductAsync, fetchProductByIdAsync, selectBrands, selectCategories, selectProductById, updateProductAsync } from '../../product/productSlice';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';

const ProductForm = () => {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
    const categories = useSelector(selectCategories);
    const brands = useSelector(selectBrands);
    const selectedProduct = useSelector(selectProductById);
    const dispatch = useDispatch();
    const params = useParams();

    const handleSubmitProduct = (data) => {
        const product = { ...data };
        product.price = +product.price;
        product.discountPercentage = +product.discountPercentage;
        product.stock = +product.stock;
        product.images = [product.image1, product.image2, product.image3, product.image4];
        
        delete product['image1'];
        delete product['image2'];
        delete product['image3'];
        delete product['image4'];

       if(params.id){
            product.id = params.id;
            product.rating = selectedProduct.rating || 0;
            dispatch(updateProductAsync(product));
       }
       else{
            dispatch(createProductAsync(product));
       }

    }

    useEffect(()=>{
        if(params.id){
            dispatch(fetchProductByIdAsync(params.id));
        }
        else{
            dispatch(clearSelectedProduct());
        }
    }, [params.id]);

    useEffect(()=>{
        if(selectedProduct && params.id){
            setValue('title', selectedProduct.title);
            setValue('description', selectedProduct.description);
            setValue('price', selectedProduct.price);
            setValue('discountPercentage', selectedProduct.discountPercentage);
            setValue('stock', selectedProduct.stock);
            setValue('category', selectedProduct.category);
            setValue('brand', selectedProduct.brand);
            setValue('thumbnail', selectedProduct.thumbnail);
            setValue('image1', selectedProduct.images[0]);
            setValue('image2', selectedProduct.images[1]);
            setValue('image3', selectedProduct.images[2]);
            setValue('image4', selectedProduct.images[3]);
        }
    }, [selectedProduct, params.id, setValue]);

    return (
        <div className="mx-auto max-w-7xl pb-4 px-4 sm:px-6 lg:px-8">
            <form noValidate onSubmit={handleSubmit((data) => {
                handleSubmitProduct(data);
                reset();
            })}>
                <div className="space-y-12 p-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">{params.id ? 'Edit Product': 'Add Product'}</h2>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                    Product Name
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            {...register('title', {
                                                required: 'title is required',
                                            })}
                                            id="title"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-2.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    {errors.title && <span className='text-red-600'>{errors.title.message}</span>}
                                </div>
                            </div>


                            <div className="col-span-full">
                                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                    Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="description"
                                        {...register('description', {
                                            required: 'description is required',
                                        })}
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                    />
                                    {errors.description && <span className='text-red-600'>{errors.description.message}</span>}
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about your Product.</p>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                    Select Brand
                                </label>
                                <div className="mt-2">
                                    <select {...register('category', {
                                        required: 'category is required',
                                    })}>
                                        <option value=''>-- Choose Category --</option>
                                        {
                                            categories.map((category) => (
                                                <option key={category.label} value={category.value}>{category.label}</option>
                                            ))
                                        }

                                    </select>
                                    {errors.category && <span className='ml-4 text-red-600'>{errors.category.message}</span>}
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                                    Select Brand
                                </label>
                                <div className="mt-2">
                                    <select {...register('brand', {
                                        required: 'brand is required',
                                    })}>
                                        <option value=''>-- Choose Brand --</option>
                                        {
                                            brands.map((category) => (
                                                <option key={category.label} value={category.value}>{category.label}</option>
                                            ))
                                        }

                                    </select>
                                    {errors.brand && <span className='ml-4 text-red-600'>{errors.brand.message}</span>}
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                    Price
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="number"
                                            {...register('price', {
                                                required: 'price is required',
                                                min: 1,
                                                max: 30000
                                            })}
                                            id="price"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />

                                    </div>
                                    {errors.price && <span className='text-red-600'>{errors.price.message}</span>}
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="discountPercentage" className="block text-sm font-medium leading-6 text-gray-900">
                                    Discount
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="number"
                                            {...register('discountPercentage', {
                                                required: 'discountPercentage is required',
                                                min: 0,
                                                max: 99
                                            })}
                                            id="discountPercentage"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    {errors.discountPercentage && <span className='text-red-600'>{errors.discountPercentage.message}</span>}
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                                    Stock
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="number"
                                            {...register('stock', {
                                                required: 'stock is required',
                                                min: 0,
                                            })}
                                            id="stock"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />

                                    </div>
                                    {errors.stock && <span className='text-red-600'>{errors.stock.message}</span>}
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
                                    Thumbnail
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            {...register('thumbnail', {
                                                required: 'thumbnail is required',
                                            })}
                                            id="thumbnail"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />

                                    </div>
                                    {errors.thumbnail && <span className='text-red-600'>{errors.thumbnail.message}</span>}
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
                                    Image 1
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            {...register('image1', {
                                                required: 'image1 is required',
                                            })}
                                            id="image1"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />

                                    </div>
                                    {errors.image1 && <span className='text-red-600'>{errors.image1.message}</span>}
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
                                    Image 2
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            {...register('image2', {
                                                required: 'image2 is required',
                                            })}
                                            id="image2"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />

                                    </div>
                                    {errors.image2 && <span className='text-red-600'>{errors.image2.message}</span>}
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
                                    Image 3
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            {...register('image3', {
                                                required: 'image3 is required',
                                            })}
                                            id="image3"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />

                                    </div>
                                    {errors.image3 && <span className='text-red-600'>{errors.image3.message}</span>}
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="image4" className="block text-sm font-medium leading-6 text-gray-900">
                                    Image 4
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            {...register('image4', {
                                                required: 'image4 is required',
                                            })}
                                            id="image4"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />

                                    </div>
                                    {errors.image4 && <span className='text-red-600'>{errors.image4.message}</span>}
                                </div>
                            </div>


                        </div>
                    </div>


                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Extra</h2>

                        <div className="mt-10 space-y-10">
                            <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                                <div className="mt-6 space-y-6">
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="comments"
                                                name="comments"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="comments" className="font-medium text-gray-900">
                                                Comments
                                            </label>
                                            <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                                        </div>
                                    </div>
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="candidates"
                                                name="candidates"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="candidates" className="font-medium text-gray-900">
                                                Candidates
                                            </label>
                                            <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                                        </div>
                                    </div>
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="offers"
                                                name="offers"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="offers" className="font-medium text-gray-900">
                                                Offers
                                            </label>
                                            <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>

                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Link to='/admin' className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        {params.id ? 'Edit Product': 'Add Product'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ProductForm;