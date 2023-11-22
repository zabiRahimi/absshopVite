import { useEffect, useRef, useState } from "react";
import "./sliderMe.css";

/**
 * اسلایدر
 * لازم است که پارامترهای زیر به اسلایدر ارسال شود
 * @param {className, slides, typeClass, title, symbol} param0
 * className اختصاص یک کلاس منحصربفرد برای هر اسلایدر، در ضمن
 * از این کلاس برای ایجاد id برخی از المانها نیز استفاده می‌شود
 * slides آبجکتی از محصولات که قرار است با اسلایدر نمایش داده شوند
 * typeClass از این کلاس برای نوع نمایش اسلایدها استفاده می‌شود، فعلا نوع normal
 * ایجاد شده است به زودی باید انواع نمایش دیگر نیز ایجاد شود
 * title دربردارنده موضوع و عنوان اسلایدر
 * symbol عکس مربوط به عنوان و موضوع اسلایدر
 * @returns
 */
const SliderMe = ({ className, slides, typeClass, title, symbol }) => {
  const bodySlider = useRef(null);
  const sliderMe = useRef(null);
  /**
   * چک می‌کند کاربر روی اسلایدر کلیک کرده و آن را برای کشیدن نگه داشته
   */
  const [isMouseDown, setIsMouseDown] = useState(false);

  /**
   * ذخیره موقعیت اولیه انگشت در حالت لمسی و کلیک در حالت موسی
   */
  const [startX, setStartX] = useState(0);

  /**
   * ذخیره مقدار کشیده شدن اسلایدر
   */
  const [keeperMove, setKeeperMove] = useState(null);

  /**
   * ذخیره موقعیت نهایی موس یا انگشت
   */
  const [keeperEndX, setKeeperEndX] = useState(null);

  /**
   * ذخیره مقدار آخرین جابجایی
   */
  const [lastMoveValue, setLastMoveValue] = useState(0);

  /*
   * ذخیره مقداری که باید اسلایدها جابجا شوند هنگامی که کاربر مبادرت
   *به جابجایی اسلایدر با دکمه های ناوبری می کند
   * این مقدار در واقع پهنای یک اسلاید است که بصورت پویا در useEffect دریافت می شود
   */
  const [valueTranslate, setValueTranslate] = useState(null);

  /*
   * هنگامی که کاربر می خواهد آخرین اسلاید از سمت چپ را با انتخاب دکمه ناوبری
   * مشاهده کند اعمال می شود، تا آخرین اسلاید بطور مطلوبی نمایش داده شود
   */
  const valueTranslateLast = valueTranslate - 6;

  // ذخیره محدوده جابجایی اسلایدها، این مقدار از کسر مجموع پهنای اسلایدها از پهنای بدنه اسلایدر بدست می‌آید
  const [controlLimit, setControlLimit] = useState(null);

  /**
   *  ذخیره مقدار جابجای اسلایدر برای نمایش بهینه title هنگامی که کاربر
   *  با لمس و کشیدن اسلایدر به انتهای سمت راست می‌رسد
   *  این مقدار به صورت پویا ذخیره می‌شود
   */
  const [showTitle, setShowTitle] = useState(0);

  /**
   *  ذخیره مقدار جابجایی اسلایدر برای نمایش بهینه more هنگامی که کاربر
   *  با لمس و کشیدن اسلایدر به انتهای سمت چپ می‌رسد
   *  این مقدار بصورت پویا بدست می‌آید
   */
  const [showMore, setShowMore] = useState(0);

  // هنگامی که محتوای اسلایدر برابر یا کوچکتر از پهنای پدر خود باشد این استیت در
  // useEffect به false تغییر می کند که در این صورت همه رویدادهای تاچ و موس اسلایدر
  // غیر فعال میشوند
  const [isActiveEvent, setIsActiveEvent] = useState(true);

  const [image, setImage] = useState();

  useEffect(() => {
    setImage("/src/assets/images/products/normal1.jpg");
  }, []);

  useEffect(() => {
    /**
     * متد زیرا یک بار هنگام بارگذاری صفحه و همچنین
     *  با هر بار تغغیر  viewport فراخوانی می شود
     *  این متد  بررسی می کند که آیا نیاز به فعال کردن رویدادهای لمس و موس
     * و نمایش دکمه های ناوبری هست یا خیر
     *
     */
    const handleResize = () => {
      const widthBodySlider = bodySlider.current.offsetWidth;
      const widthSliderMe = document.getElementById(`sliderMe`).offsetWidth;

      if (widthSliderMe > widthBodySlider) {
        const btnElements = Array.from(
          document.getElementsByClassName("divBtnMe")
        );
        btnElements.forEach((btn) => {
          /**
           * نمایش یا عدم نمایش دکمه‌های ناوبری بسته به شرط
           * بصورت دیفالت دکمه‌ها غیر فعال هستند
           */
          btn.classList.toggle("notShowDivBtnMe", window.innerWidth <= 769);
        });

        setIsActiveEvent(true);
      } else {
        setIsActiveEvent(false);
      }
    };

    /**
     * فراخوانی متد هنگام بارگذاری صفحه
     */
    handleResize();

    /**
     * فراخوانی متد با گوش دادن به تغییر سایز viewport
     */
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    /**
     * دریافت مقدار جابجایی هر اسلاید هنگامی که کاربر از دکمه‌های ناوبری استفاده می‌کند
     * این مقدار برابر با اندازه یک اسلاید در نظر گرفته شده است
     */
    setValueTranslate(
      bodySlider.current.querySelector(`.${className}`).offsetWidth
    );

    /**
     * نمایش صحیح دکمه‌های ناوبری به صورت پویا
     * چند کد زیر دکمه‌ها را به صورت عمودی در وسط اسلایدر قرار می‌دهد
     */
    const height = bodySlider.current.offsetHeight;

    const elements = Array.from(
      bodySlider.current.getElementsByClassName("divBtnMe")
    );

    elements.forEach((element) => {
      element.style.top = `${height / 2}px`;
    });
  }, []);

  useEffect(() => {
    /**
     * این هوک برای اعمال startX بصورت real-time است
     * همچنین بررسی می‌کند که آیا قابلیت لمس وجود دارد یا خیر تا
     * متد handleMove را بصورت مطلوب فراخوانی کند
     */
    const isTouchDevice = "ontouchstart" in window;

    if (isTouchDevice) {
      if (startX !== null) {
        handleMove(null, startX, true);
      }
    } else {
      if (startX !== null) {
        handleMove(null, startX, false);
      }
    }
  }, [startX]);

  useEffect(() => {
    const handleResize = () => {
      const product = document.getElementById(`productSlider${className}`);
      const widthSlider = bodySlider.current.offsetWidth;
      const slide = sliderMe.current.querySelector(
        `.container_${typeClass}_me`
      );
      const title = sliderMe.current.querySelector(`.title_${typeClass}_me`);
      const more = sliderMe.current.querySelector(`.more_${typeClass}_me`);
      const styleProduct = window.getComputedStyle(product);
      const stylesSlide = window.getComputedStyle(slide);
      const stylesTitle = window.getComputedStyle(title);
      const stylesMore = window.getComputedStyle(more);

      const widthSlide = slide.offsetWidth;
      const padingProduct =
        parseFloat(styleProduct.paddingRight) +
        parseFloat(styleProduct.paddingLeft);

      const marginRightSlide = parseFloat(stylesSlide.marginRight);
      const marginLeftSlide = parseFloat(stylesSlide.marginLeft);

      const widthTitle = title.offsetWidth;
      const marginRightTitle = parseFloat(stylesTitle.marginRight);
      const marginLeftTitle = parseFloat(stylesTitle.marginLeft);

      const widthMore = slide.offsetWidth;
      const marginRightMore = parseFloat(stylesMore.marginRight);
      const marginLeftMore = parseFloat(stylesMore.marginLeft);
      const widthSlides =
        (widthSlide + marginRightSlide + marginLeftSlide) *
          Object.values(slides).length +
        (widthTitle +
          marginRightTitle +
          marginLeftTitle +
          widthMore +
          marginRightMore +
          marginLeftMore +
          padingProduct);
      setControlLimit(widthSlides - widthSlider);
      setShowTitle(widthTitle / 1.08);
      setShowMore(widthMore / 1.08);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [controlLimit]);

  const handleRight = () => {
    const valueTransform = getValueTransform();

    if (valueTransform > 0) {
      const valueTranslateX =
        valueTransform > valueTranslate ? valueTransform - valueTranslate : 0;

      transform(valueTranslateX);

      displayButton("btnLeft", "block");

      if (valueTranslateX === 0) {
        displayButton("btnRight", "none");
      }
    }
  };

  const handleLeft = () => {
    const container = document.getElementById(`sliderMe`);
    const getValueLeftContainer = container.offsetLeft;

    const valueTransform = getValueTransform();

    const check = getValueLeftContainer + valueTransform;

    if (check < 0) {
      const translateX = valueTransform + valueTranslate;
      const lastTranslateX =
        valueTransform + valueTranslate - (check + valueTranslateLast);

      if (check < -valueTranslate) {
        transform(translateX);
      } else {
        transform(lastTranslateX);

        displayButton("btnLeft", "none");
      }
    }

    displayButton("btnRight", "block");
  };

  const getValueTransform = () => {
    const element = document.getElementsByClassName(className);
    return Number(element[0].style.transform.match(/-?[\d\.]+/g));
  };

  const handleStartSelect = (event, touch) => {
    setIsMouseDown(true);

    let getStartX;

    if (touch) {
      getStartX = event.touches[0].clientX;
    } else {
      getStartX = event.clientX;
    }

    setStartX(getStartX);
    setLastMoveValue(getValueTransform());

    setTransition(false);
  };

  const handleMove = (event, getStartX, touch) => {
    if (event) {
      let endX;

      if (touch) {
        // دریافت موقعیت دوم تاچ
        endX = event.touches[0].clientX;
      } else {
        // دریافت موقعیت دوم موس
        endX = event.clientX;
      }

      const moveValue = getStartX - endX + -lastMoveValue;

      setKeeperMove(moveValue);
      setKeeperEndX(endX);

      transform(-moveValue);
    }
  };

  const handleEndSelect = () => {
    if (isMouseDown) {
      /**
       * هنگامی که اسلایدر به آخرین اسلاید سمت راست رسیده
       */
      if (startX > keeperEndX && keeperMove > -showTitle) {
        setTransition(true);

        transform(-5);

        displayButton("btnRight", "none");
        displayButton("btnLeft", "block");
      } else if (
        keeperMove < 0 &&
        keeperMove >
          (startX < keeperEndX ? -(controlLimit - showMore) : -controlLimit)
      ) {
        transform(-keeperMove);

        if (keeperEndX > startX) {
          displayButton("btnRight", "block");
        }
        if (keeperEndX < startX) {
          displayButton("btnLeft", "block");
        }
      } else {
        //هنگامی که اسلایدر به آخرین اسلاید سمت چپ رسیده
        transform(controlLimit);

        displayButton("btnLeft", "none");
        displayButton("btnRight", "block");

        setTransition(true);
      }
    }

    setIsMouseDown(false);

    setTransition(true);
  };

  // نمایش و یا عدم نمایش دکمه های ناوبری اسلایدر
  const displayButton = (button, display) => {
    const selectBtn = document.getElementById(`${button + className}`);
    selectBtn.style.display = display;
  };

  /*
   *جابجایی المنت ها
   */
  const transform = (valueTranslate) => {
    const title = document.getElementById(`title${className}`);
    title.style.transform = `translateX(${valueTranslate}px)`;

    for (let i = 0; i < Object.values(slides).length; i++) {
      const slide = document.getElementById(`${className}${i}`);
      slide.style.transform = `translateX(${valueTranslate}px)`;
    }

    const more = document.getElementById(`more${className}`);
    more.style.transform = `translateX(${valueTranslate}px)`;
  };

  const setTransition = (boolean) => {
    const value = boolean ? "transform 0.5s ease-in-out" : "none";

    const title = document.getElementById(`title${className}`);
    title.style.transition = value;

    const select = Array.from(
      sliderMe.current.getElementsByClassName(`${className}`)
    );
    select.forEach((element) => {
      element.style.transition = value;
    });

    const more = document.getElementById(`more${className}`);
    more.style.transition = value;
  };

  return (
    <div className="bodySlider" ref={bodySlider}>
      <div
        className="divBtnMe divBtnMeRight notShowDivBtnMe"
        id={`btnRight${className}`}
      >
        <button onClick={handleRight} className="btnMe">
          <i className="icofont-curved-right"></i>
        </button>
      </div>

      <div
        className="sliderMe"
        id="sliderMe"
        ref={sliderMe}
        onTouchStart={
          isActiveEvent ? (event) => handleStartSelect(event, true) : undefined
        }
        onTouchMove={
          isActiveEvent
            ? (event) => {
                if (isMouseDown) {
                  handleMove(event, startX, true);
                }
              }
            : undefined
        }
        onTouchEnd={isActiveEvent ? handleEndSelect : undefined}
        onMouseDown={
          isActiveEvent
            ? (event) => {
                handleStartSelect(event, false);
              }
            : undefined
        }
        onMouseMove={
          isActiveEvent
            ? (event) => {
                if (isMouseDown) {
                  handleMove(event, startX, false);
                }
              }
            : undefined
        }
        onMouseUp={isActiveEvent ? handleEndSelect : undefined}
        onMouseLeave={isActiveEvent ? handleEndSelect : undefined}
      >
        <div
          className={`slideMe title_${typeClass}_me`}
          id={`title${className}`}
        >
          <h2 className={`titleH2_${typeClass}_me`}>{title}</h2>
          <div className={`divTitleImg_${typeClass}_me`}>
            <img
              src={`src/assets/images/products/${symbol}.jpg`}
              alt={symbol}
              className={`titleImg_${typeClass}_me`}
            />

            {/* فقط برای عدم کشیده شدن تصویر هنگامی که کاربر مبادرت به کشیدن اسلایدر با موس میکند */}
            <div className={`noDragImg_${typeClass}_me`}></div>
          </div>
        </div>

        {Object.values(slides).map((slide, i) => (
          <article
            key={slide.name}
            id={`${className}${i}`}
            className={`slideMe ${className} container_${typeClass}_me ${
              i === 0 ? "firstContainer_" + typeClass + "_me" : ""
            } `}
          >
            <div className={`divImg_${typeClass}_me`}>
              <img
                className={`img_${typeClass}_me`}
                src={`/src/assets/images/products/${slide.img}`}
                alt={slide.name}
              />

              {/* فقط برای کشیده نشدن عکس هنگامی که کاربر اسلایدر را می گیرد و می کشد */}
              <div className={`noDragImg_${typeClass}_me`}></div>
            </div>

            <h3 className={`name_${typeClass}_me`}>{slide.name}</h3>

            {/* <div className={`shop_${typeClass}_me`} >
                            <div className={`shop_shop_${typeClass}_me`}>فروشگاه :</div>
                            <div className={`shop_name_${typeClass}_me`}>{slide.shop}</div>
                        </div> */}

            <div className={`price_${typeClass}_me`}>
              <div className={`price_toman_${typeClass}_me`}>تومان</div>
              <div className={`price_number_${typeClass}_me`}>
                {Intl.NumberFormat("fa-IR").format(slide.price)}
              </div>
              <div className={`price_percent_${typeClass}_me`}>
                {slide.oldPrice
                  ? `${Intl.NumberFormat("fa-IR").format(
                      Math.floor(
                        ((slide.oldPrice - slide.price) / slide.oldPrice) * 100
                      )
                    )}%`
                  : ""}
              </div>
            </div>

            <div className={`oldPrice_${typeClass}_me`}>
              <div className={`oldPrice_div1_${typeClass}_me`}></div>
              <div className={`oldPrice_price_${typeClass}_me`}>
                {Intl.NumberFormat("fa-IR").format(slide.oldPrice)}
              </div>
              <div className={`oldPrice_div2_${typeClass}_me`}></div>
            </div>
          </article>
        ))}

        <div
          className={`slideMe more_${typeClass}_me `}
          id={`more${className}`}
        >
          <button className={`moreBtn_${typeClass}_me`}>
            <span className={`moreBtnIcon_${typeClass}_me`}>
              <i className="icofont-swoosh-down" />
            </span>

            <span className={`moreBtnText_${typeClass}_me`}>مشاهده همه</span>
          </button>
        </div>
      </div>

      <div
        className="divBtnMe divBtnMeLeft notShowDivBtnMe"
        id={`btnLeft${className}`}
      >
        <button onClick={handleLeft} className="btnMe">
          <i className="icofont-curved-left"></i>
        </button>
      </div>
    </div>
  );
};

export default SliderMe;
