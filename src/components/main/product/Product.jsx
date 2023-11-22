import { useParams } from "react-router-dom";
import { SimpleHeader } from "../../simpleHeader/SimpleHeader";
import SocialMediaProduct from "./SocialMediaProduct";
import AboutProduct from "./aboutProduct/AboutProduct";
import NameProduct from "./productComponents/NameProduct";
import PriceProduct from "./productComponents/PriceProduct";
import ImagesProduct from "./productComponents/imagesProduct/ImagesProduct";

const Product = () => {

    let params = useParams();
    console.log(params.productId);
    return (
        <div>

            <SimpleHeader />

            <NameProduct />

            <ImagesProduct />

            {/* قیمت، برند، فروشنده، پسندها، بازدیدها، تعداد فروش*/}
            <PriceProduct />

            {/* درباره محصول، مشخصات محصول، مقایسه محصول، نظرات کاربران، */}
            <AboutProduct />

            {/* نمایش محصول در رسانه های اجتماعی */}
            <SocialMediaProduct />

        </div>
    );
}
export default Product;