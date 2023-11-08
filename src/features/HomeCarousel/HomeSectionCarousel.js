import React, { useState } from 'react'
import HomeCarouselCard from './HomeCarouselCard';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/20/solid'

const HomeSectionCarousel = ({products, sectionHeading}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const responsive = {
        0: { items: 1 },
        720: { items: 3 },
        1024: { items: 4 },
    };

    const items = products.map((item) => <HomeCarouselCard item={item} />);

    const slidePrev = () => setActiveIndex( activeIndex - 1 );
    const slideNext = () => setActiveIndex( activeIndex + 1 );

    const syncActiveIndex = ({ item }) => setActiveIndex(item);
    return (
        <div>
            <h2 className='text-xl text-gray-600 font-medium pb-4'>{sectionHeading}</h2>
        <div className='relative border border-gray-300 py-4'>
            <AliceCarousel
                items={items}
                disableButtonsControls
                disableDotsControls
                responsive={responsive}
                onSlideChanged={syncActiveIndex}
                activeIndex={activeIndex}
                controlsStrategy="alternate" />

            {activeIndex !== 0 && <button className='absolute top-2/4 -left-6 hover:z-50' onClick={slidePrev}><ArrowLeftCircleIcon className='w-10 h-10 text-indigo-500 z-50' /></button>}
            {activeIndex !== items.length-5 && <button className='absolute top-2/4 -right-6 hover:z-50' onClick={slideNext}><ArrowRightCircleIcon className='w-10 h-10 text-indigo-500 z-50' /></button>}

        </div>
        </div>
    )
}

export default HomeSectionCarousel;