import React, { useState } from 'react'
import { Carousel, CarouselControl, CarouselItem, Container } from 'reactstrap'

import banner1 from "../images/banner/banner1.jpg";
import banner2 from "../images/banner/banner2.jpg";
import banner3 from "../images/banner/banner3.jpg";

//getting the images in the form of Array Object
const items = [
    {
        src: banner1,
        id: 1
    },
    {
        src: banner2,
        id: 2
    },
    {
        src: banner3,
        id: 3
    },
]

const Banner = () => {
    //state that handles the active slider
    const [activeIndex, setActiveIndex] = useState(0);

    //state that handles the animation
    const [animating, setAnimating] = useState(false);

    //next function for handling the next arrow
    const next = () => {
        if (animating)
            return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    //previous function for handling the previous arrow
    const previous = () => {
        if (animating)
            return;
        const previousIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(previousIndex);
    }

    //here we are rendering the slider images
    const slides = items.map((item) => {
        return (
            <CarouselItem>
                <img src={item.src} className="img-fluid" />
            </CarouselItem>
        )
    })
    return (

        <Carousel activeIndex={activeIndex} next={next} previous={previous}>
            {slides}
            <CarouselControl direction="prev" directionIndex="" onClickHandler={previous} />
            <CarouselControl direction="next" directionIndex="" onClickHandler={next} />
        </Carousel>

    )
}

export default Banner