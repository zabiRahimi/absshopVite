
import './imagesProduct.css';
import ImagesMobile from "./ImagesMobile";
import ImagesPc from "./ImagesPc";

const ImagesProduct = () => {


    return (
        <div>
            <div className="imageMobile">

                <ImagesMobile />

            </div>
            <div className="imagePc">

                <ImagesPc />

            </div>
        </div>
    );
}
export default ImagesProduct;