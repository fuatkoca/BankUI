import React from 'react'
import { Carousel, CarouselIndicators, CarouselItem, CarouselCaption, CarouselControl } from "reactstrap";
import mainbanner from "../images/mainbanner.jpg";
const Slider = () => {
    return (
        <div>
            <img src={mainbanner} style={{ width: '100%', height: 500 }} />
        </div>
    )
}
export default Slider