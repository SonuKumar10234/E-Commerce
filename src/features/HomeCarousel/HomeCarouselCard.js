import React from 'react'
import { StarIcon, ArrowLeftIcon, ArrowRightIcon} from '@heroicons/react/20/solid';




const HomeCarouselCard = ({item}) => {
    return (
        <div className='px-4 lg:px-8'>

            <div className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-70">
                    <img
                        src={item.thumbnail}
                        alt={item.imageAlt}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                </div>
                <div className="mt-4 flex justify-between">
                    <div>
                        <h3 className="text-sm text-gray-700">

                            <span aria-hidden="true" className="absolute inset-0" />
                            {item.title}

                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            <StarIcon className='w-6 h-6 inline'></StarIcon>
                            <span className='align-bottom'>{item.rating}</span>
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-400">${item.price}</p>
                        <p className="text-sm font-medium text-gray-900 line-through">${Math.round(item.price * (1 - item.discountPercentage / 100))}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HomeCarouselCard;