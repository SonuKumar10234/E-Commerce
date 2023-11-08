import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { mainCarouselData } from './MainCarouselData';
import { useNavigate } from 'react-router-dom';

const MainCarousel = () => {
    const navigate = useNavigate()
    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3 },
    };
    const items = mainCarouselData.map((item)=> <img className='cursor-pointer' src={item.image} alt='' onClick={()=>navigate(`${item.path}`)}/> );

  return (

        <AliceCarousel
        mouseTracking
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={2000}
        infinite
        // responsive={responsive}
        controlsStrategy="alternate" />

  )
}

export default MainCarousel;
