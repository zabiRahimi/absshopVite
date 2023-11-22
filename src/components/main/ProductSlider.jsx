import React from 'react';
import SliderMe from '../sliderMe/SliderMe';
import styleProductSlider from './styleProductSlider.module.css';

/**
 * یک سکو برای ایجاد اسلایدر 
 * این سکو برای نمایش محصولات است، نوع نمایش محصولات نیز در اسلایدر متفاوت است 
 * که با پارامتر typeClass یکی از انواع نمایش انتخاب و اعمال می‌شود
 * به زودی سکوهای دیگری نیز ایجاد می‌شود
 * پارامترهای زیر باید به این کامپوننت ارسال شود که در کامپوننت sliderMe
 * برای هر پارامتر توضیحاتی ارائه شده است 
 * @param {bgColor, className, slides, typeClass, title, symbol} props 
 * bgColor این پارامتر حاوی رنگ پس زمینه سکو است
 * @returns 
 */
const ProductSlider = (props) => {

    return (

        <section className={styleProductSlider.section} style={{ backgroundColor: props.bgColor }}
            id={`productSlider${props.className}`}
        >

            <SliderMe {...props} />

        </section>
    );
};

export default ProductSlider;