import "./imagesProduct.css";
import ImagesMobile from "./ImagesMobile";
import ImagesPc from "./ImagesPc";

const ImagesProduct = ({ img }) => {
  return (
    <div>
      <div className="imageMobile">
        <ImagesMobile img={img} />
      </div>
      <div className="imagePc">
        <ImagesPc img={img} />
      </div>
    </div>
  );
};
export default ImagesProduct;
