// import Slider from "react-slick";
import styleAside from "./aside.module.css";

const Aside = () => {

    // const [currentSlide, setCurrentSlide] = useState(0);

    // const settings1 = {
    //     dots: true,
    //     arrows: false,
    //     slidesToShow:4,
    //     // autoplay: true,
    //     // fade: true,
    //     lazyLoad: 'progressive',

    //     // beforeChange: (current) => {
    //     //     setCurrentSlide(current);
    //     // },
    //     // afterChange: (current) => {
    //     //     setCurrentSlide(current);
    //     // },

    //     // pauseOnFocus: true,
    //     // customPaging: i => {
    //     //     return (
    //     //         <button
    //     //             className={`${styleSliderHeader.slick_dots_header_slider} ${currentSlide === i ? styleSliderHeader.slick_active : ''}`}
    //     //         />
    //     //     )
    //     // },
    //     // dotsClass: `slick-dots ${styleSliderHeader.slick_dots_header_slider}`,

    // }



    return (

        <div className={styleAside.container} >


            <div className={styleAside.item}>

                <div className={styleAside.item_child_first}>
                    <i className="icofont-business-man-alt-3 "></i>
                </div>
                <div className={styleAside.item_child_second}>فروشنده</div>

            </div>


            <div className={styleAside.item}>

                <div className={styleAside.item_child_first}>
                    <i className="icofont-globe "></i>
                </div>
                <div className={styleAside.item_child_second}>شبکه اجتماعی</div>

            </div>


            <div className={styleAside.item}>

                <div className={styleAside.item_child_first}>
                    <i className="icofont-reply "></i>
                </div>
                <div className={styleAside.item_child_second} >مرجوعی</div>

            </div>


            <div className={styleAside.item}>

                <div className={styleAside.item_child_first}>
                    <i className="icofont-book-alt "></i>
                </div>
                <div className={styleAside.item_child_second}>راهنما</div>

            </div>


            <div className={styleAside.item}>

                <div className={styleAside.item_child_first}>
                    <i className="icofont-sub-listing "></i>
                </div>
                <div className={styleAside.item_child_second}>دسته بندی محصولات</div>

            </div>


            <div className={styleAside.item}>

                <div className={styleAside.item_child_first}>
                    <i className="icofont-users-alt-4 "></i>
                </div>
                <div className={styleAside.item_child_second}>همکاران</div>

            </div>


            <div className={styleAside.item}>

                <div className={styleAside.item_child_first}>
                    <i className="icofont-badge "></i>
                </div>
                <div className={styleAside.item_child_second}>بیشترین فروش</div>

            </div>


            <div className={styleAside.item}>

                <div className={styleAside.item_child_first}>
                    <i className="icofont-tick-mark "></i>
                </div>
                <div className={styleAside.item_child_second}>برترین ها</div>

            </div>


            <div className={styleAside.item}>

                <div className={styleAside.item_child_first}>
                    <i className="icofont-tags "></i>
                </div>
                <div className={styleAside.item_child_second}>پیشنهادات</div>

            </div>



        </div>

    )



}

export default Aside;