import { createRef, useEffect, useRef, useState } from "react";
import "./normalShowProduct.css";
import { useNavigate, useParams } from "react-router-dom";

export default function NormalShowProduct({
  title,
  hasMore,
  linkMore,
  bgColor,
  products,
  hasTitle = false,
}) {
  const navigate = useNavigate();

  const containerNSP = useRef(null);
  const containerNSP_products = useRef(null);
  const containerNSP_pro = useRef([]);

  const [endLoad, setEndLoad] = useState(false);
  const [getNumShowPro, setGetNumShowPro] = useState(1);
  const [moreShowPro, setMoreShowPro] = useState(0);

  containerNSP_pro.current = Object.values(products).map(
    (_, i) => containerNSP_pro.current[i] ?? createRef()
  );

  useEffect(() => {
    const handleResize = () => {
      const getNumColumnPro =
        containerNSP_pro.current[0] &&
        Math.floor(
          containerNSP_products.current.offsetWidth /
            Object.values(containerNSP_pro.current[0])[0].offsetWidth
        );

      if (getNumColumnPro) {
        switch (getNumColumnPro) {
          case 1:
            getNumShowPro < 10 && setGetNumShowPro(10);

            setMoreShowPro(5);

            break;

          case 2:
            getNumShowPro < 12
              ? setGetNumShowPro(12)
              : setGetNumShowPro((prev) => prev - (prev % 2));

            setMoreShowPro(6);

            break;
          case 3:
            getNumShowPro < 15
              ? setGetNumShowPro(15)
              : setGetNumShowPro((prev) => prev - (prev % 3));

            setMoreShowPro(6);

            break;
          case 4:
            getNumShowPro < 16
              ? setGetNumShowPro(16)
              : setGetNumShowPro((prev) => prev - (prev % 4));

            setMoreShowPro(8);

            break;
          case 5:
            getNumShowPro < 15
              ? setGetNumShowPro(15)
              : setGetNumShowPro((prev) => prev - (prev % 5));

            setMoreShowPro(10);

            break;
          case 6:
            getNumShowPro < 18
              ? setGetNumShowPro(18)
              : setGetNumShowPro((prev) => prev - (prev % 6));

            setMoreShowPro(12);

            break;
          case 7:
            getNumShowPro < 21
              ? setGetNumShowPro(21)
              : setGetNumShowPro((prev) => prev - (prev % 7));

            setMoreShowPro(14);

            break;
          case 8:
            getNumShowPro < 24
              ? setGetNumShowPro(24)
              : setGetNumShowPro((prev) => prev - (prev % 8));

            setMoreShowPro(16);

            break;
          case 9:
            getNumShowPro < 27
              ? setGetNumShowPro(27)
              : setGetNumShowPro((prev) => prev - (prev % 9));

            setMoreShowPro(18);

            break;
          case 10:
            getNumShowPro < 30
              ? setGetNumShowPro(30)
              : setGetNumShowPro((prev) => prev - (prev % 10));

            setMoreShowPro(20);

            break;

          default:
            setGetNumShowPro(33);
            setMoreShowPro(22);

            break;
        }
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [endLoad]);

  useEffect(() => {
    const handleLoade = () => {
      setEndLoad(true);
    };

    window.addEventListener("load", handleLoade);
    return () => window.removeEventListener("load", handleLoade);
  }, []);

  const elements = Object.values(products).map((pro, i) => {
    if (i < getNumShowPro) {
      return (
        <div
          className="containerNSP_pro"
          ref={containerNSP_pro.current[i]}
          key={i}
          onClick={() => {
            navigate(`product/${pro.id}`);
          }}
        >
          <div className="divImgNSP">
            <img
              className="imgNSP"
              src={`src/assets/images/products/${pro.img}`}
              alt={pro.img}
            />
          </div>

          <div className="nameProNSP">
            <h3>{pro.name}</h3>
          </div>

          <div className={pro.brand ? `brandNSP` : `notBrandNSP`}>
            {pro.brand}
          </div>

          <div className="containerShopNSP">
            <div className="shopNSP"> فروشگاه‌:</div>
            <div className="nameShopNSP"> {pro.shop} </div>
          </div>

          <div className="containerPriceNSP">
            <div className="tomanNSP">تومان</div>

            <div className="priceNSP">
              {Intl.NumberFormat("fa-IR").format(pro.price)}
            </div>

            <div className="percentNSP">
              {pro.priceOff
                ? `${Intl.NumberFormat("fa-IR").format(
                    Math.floor(((pro.price - pro.priceOff) / pro.price) * 100)
                  )}%`
                : ""}
            </div>
          </div>

          <div className="containerOldPriceNSP">
            <div className="spaceLeftNSP"></div>

            <div className="oldPriceNSP">
              {pro.priceOff
                ? Intl.NumberFormat("fa-IR").format(pro.priceOff)
                : ""}
            </div>

            <div className="spaceRightNSP"></div>
          </div>
        </div>
      );
    }
  });

  const showMorePro = () => {
    setGetNumShowPro((perv) => perv + moreShowPro);
  };

  return (
    <div className="containerNSP" ref={containerNSP}>
      {hasTitle && (
        <div className="cotainerTitleNSP">
          <h2 className="titleNSP">{title}</h2>

          {hasMore && (
            <div className="containerShowAllNSP">
              <span>مشاهده همه</span>
              <i className="icofont-swoosh-down" />
            </div>
          )}
        </div>
      )}
      <div className="containerNSP_products" ref={containerNSP_products}>
        {elements}
      </div>

      {Object.values(products).length > getNumShowPro && (
        <div className="containerMoreNSP">
          <button onClick={showMorePro} className="btnMoreNSP">
            {" "}
            <i className="icofont-curved-double-left " /> <span>بیشتر</span>{" "}
          </button>
        </div>
      )}
    </div>
  );
}
