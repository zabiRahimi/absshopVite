import { useLoaderData, useParams } from "react-router-dom";
import { SimpleHeader } from "../../simpleHeader/SimpleHeader";
import SocialMediaProduct from "./SocialMediaProduct";
import AboutProduct from "./aboutProduct/AboutProduct";
import NameProduct from "./productComponents/NameProduct";
import PriceProduct from "./productComponents/PriceProduct";
import ImagesProduct from "./productComponents/imagesProduct/ImagesProduct";
import localforage from "localforage";
import "./product.css";

export async function loader({ params }) {
  let proData;

  await localforage.getItem("products").then((value) => {
    proData = value.filter((item) => item.id == params.id);
  });

  return { proData };
}

const Product = () => {
  const { proData } = useLoaderData();

  return (
    <>
      <SimpleHeader />

      <div className="container_Pro">
        <NameProduct name={proData[0].name} brand={proData[0].brand} />

        <ImagesProduct img={proData[0].img} />

        {/* قیمت، برند، فروشنده، پسندها، بازدیدها، تعداد فروش*/}
        <PriceProduct price={proData[0].price} priceOff={proData[0].priceOff} />

        {/* درباره محصول، مشخصات محصول، مقایسه محصول، نظرات کاربران، */}
        <AboutProduct dis={proData[0].dis} />

        {/* نمایش محصول در رسانه های اجتماعی */}
        <SocialMediaProduct />
      </div>
    </>
  );
};
export default Product;
