import Slider from "react-slick";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styleSliderHeader from './styleSliderHeader.module.css';

import s1 from "../../../assets/images/sliders/s1.jpg";
import m1 from "../../../assets/images/sliders/m1.jpg";
import l1 from "../../../assets/images/sliders/l1.jpg";
import xl1 from "../../../assets/images/sliders/xl1.jpg";

import s2 from "../../../assets/images/sliders/s2.jpg";
import m2 from "../../../assets/images/sliders/m2.jpg";
import l2 from "../../../assets/images/sliders/l2.jpg";
import xl2 from "../../../assets/images/sliders/xl2.jpg";

import s3 from "../../../assets/images/sliders/s3.jpg";
import m3 from "../../../assets/images/sliders/m3.jpg";
import l3 from "../../../assets/images/sliders/l3.jpg";
import xl3 from "../../../assets/images/sliders/xl3.jpg";

import s4 from "../../../assets/images/sliders/s4.jpg";
import m4 from "../../../assets/images/sliders/m4.jpg";
import l4 from "../../../assets/images/sliders/l4.jpg";
import xl4 from "../../../assets/images/sliders/xl4.jpg";



const SliderHeader = () => {

    const [currentSlide, setCurrentSlide] = useState(0);

    const settings = {
        dots: true,
        arrows: false,
        autoplay: true,
        fade: true,
        lazyLoad: 'progressive',

        beforeChange: (current) => {
            setCurrentSlide(current);
        },
        afterChange: (current) => {
            setCurrentSlide(current);
        },

        pauseOnFocus: true,
        customPaging: i => {
            return (
                <button
                    className={`${styleSliderHeader.slick_dots_header_slider} ${currentSlide === i ? styleSliderHeader.slick_active : ''}`}
                />
            )
        },
        dotsClass: `slick-dots ${styleSliderHeader.slick_dots_header_slider}`,

    }



    return (

        <div className={styleSliderHeader.container}>

            <Slider {...settings} >
                <div>

                    <img
                        src={s1}
                        srcSet={`
                            ${s1} 768w,
                            ${m1} 1024w,
                            ${l1} 2500w ,
                            ${xl1} 2501w
                        `}
                        alt="car1" className={styleSliderHeader.img}
                    />

                </div>

                <div>

                    <img
                        src={s2}
                        srcSet={`
                            ${s2} 768w,
                            ${m2} 1024w, 
                            ${l2} 2500w , 
                            ${xl2} 2501w
                        `}
                        alt="car2"
                        className={styleSliderHeader.img}
                    />

                </div>

                <div>

                    <img
                        src={s3}
                        srcSet={`
                            ${s3} 768w,
                            ${m3} 1024w, 
                            ${l3} 2500w, 
                            ${xl3} 2501w
                        `}
                        alt="car3"
                        className={styleSliderHeader.img}
                    />

                </div>

                <div>

                    <img
                        src={s4}
                        srcSet={`
                            ${s4} 768w,
                            ${m4} 1024w, 
                            ${l4} 2500w, 
                            ${xl4} 2501w
                        `}
                        alt="car4"
                        className={styleSliderHeader.img}
                    />

                </div>

            </Slider>

        </div>

    );

}

export default SliderHeader;