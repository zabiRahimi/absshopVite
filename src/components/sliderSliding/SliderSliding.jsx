import { useEffect, useRef, useState } from "react";
import "./sliderSliding.css";

const SliderSliding = ({
  title,
  row,
  more,
  bgColor,
  color,
  typeClass,
  id,
  paginate,
  slides,
  linkMore = "",
}) => {
  const bodySliderSliding = useRef(null);

  const containerTitleSS = useRef(null);

  const containerSliderSliding = useRef(null);

  const navBtnRight = useRef(null);

  const navBtnLeft = useRef(null);

  const containerColumnSS = useRef(null);

  /**
   * Number of slider columns
   */
  const [column, setColumn] = useState(0);

  /**
   * The amount the slider should move
   */
  const [valueTranslate, setValueTranslate] = useState(0);

  const [isMouseDown, setIsMouseDown] = useState(false);

  const [startX, setStartX] = useState(0);

  const [keeperMove, setKeeperMove] = useState(0);

  const [isActiveEvent, setIsActiveEvent] = useState(true);

  const [numPaginate, setNumPaginate] = useState(0);

  const [numStepRight, setNumStepRight] = useState(0);

  const [numStepLeft, setNumStepLeft] = useState(1);

  const [limitMoveLeft, setLimitMoveLeft] = useState(0);

  const [transformValue, setTransformValue] = useState(0);

  /**
   * Force the app to re-render
   * To better display the elements that are created through the slides object and with the loop
   */
  const [render, setRender] = useState(false);

  useEffect(() => {
    numPaginate > 1 ? setIsActiveEvent(true) : setIsActiveEvent(false);
  }, [numPaginate, render]);

  useEffect(() => {
    const getColumn = () => {
      const numberColumns = Math.ceil(Object.values(slides).length / row);
      setColumn(numberColumns);
    };

    getColumn();
  }, []);

  useEffect(() => {
    const displayBtnNave = () => {
      const btnElements = Array.from(
        document.getElementsByClassName("divBtnNavSS")
      );

      btnElements.forEach((btn) => {
        btn.classList.toggle("notShowDivBtnSS", window.innerWidth <= 769);
      });
    };

    displayBtnNave();

    /**
     * فراخوانی متد با گوش دادن به تغییر سایز viewport
     */
    window.addEventListener("resize", displayBtnNave);
    return () => window.removeEventListener("resize", displayBtnNave);
  }, []);

  useEffect(() => {
    if (numStepRight == 0) {
      navBtnRight.current.style.display = "none";
    } else {
      navBtnRight.current.style.display = "block";
    }

    if (numStepRight == numPaginate - 1) {
      navBtnLeft.current.style.display = "none";
    } else {
      navBtnLeft.current.style.display = "block";
    }

    const handleResize = () => {
      setRender(true);
    };
    window.addEventListener("load", handleResize);
    return () => window.removeEventListener("load", handleResize);
  }, [numStepLeft, numStepRight, numPaginate, render]);

  useEffect(() => {
    const getHieghtTitle = containerTitleSS.current.offsetHeight;

    const height = containerSliderSliding.current.offsetHeight;

    const topValue = height / 2 + getHieghtTitle;

    const elements = Array.from(
      bodySliderSliding.current.getElementsByClassName("divBtnNavSS")
    );

    elements.forEach((element) => {
      element.style.top = `${topValue}px`;
    });
  }, [containerColumnSS.current]);

  const handleStartSelect = (event, touch) => {
    setIsMouseDown(true);

    let getStartX;

    if (touch) {
      getStartX = event.touches[0].clientX;
    } else {
      getStartX = event.clientX;
    }

    setStartX(getStartX);
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
      event.currentTarget.style.transition = "none";

      let moveValue;

      moveValue = Number(transformValue) + (endX - getStartX);

      event.currentTarget.style.transform = `translateX(${moveValue}px)`;

      setKeeperMove(getStartX - endX);
    }
  };

  const handleEndSelect = (event) => {
    if (isMouseDown) {
      if (keeperMove > 0 && Math.abs(keeperMove) > 20) {
        if (numStepRight > 0) {
          event.currentTarget.style.transform = `translateX(${
            valueTranslate * numStepRight - valueTranslate
          }px)`;

          setNumStepRight((prve) => prve - 1);
          numStepLeft != numStepRight && setNumStepLeft((prve) => prve - 1);
        } else {
          event.currentTarget.style.transform = `translateX(0)`;
        }
      } else if (keeperMove < 0 && Math.abs(keeperMove) > 20) {
        if (numPaginate - 1 > numStepLeft) {
          event.currentTarget.style.transform = `translateX(${
            valueTranslate * numStepLeft
          }px)`;
          setNumStepLeft((prve) => prve + 1);
          setNumStepRight((prve) => prve + 1);
        } else if (numPaginate === numStepLeft) {
          event.currentTarget.style.transform = `translateX(${limitMoveLeft}px)`;
        } else {
          if (numPaginate > numStepLeft + 1) {
            setNumStepLeft((prve) => prve + 1);
            setNumStepRight((prve) => prve + 1);
          } else if (numPaginate > numStepRight + 1) {
            setNumStepRight((prve) => prve + 1);
          }

          event.currentTarget.style.transform = `translateX(${limitMoveLeft}px)`;
        }
      }

      event.currentTarget.style.transition = "transform 0.9s ease-in-out";
      setTransformValue(
        event.currentTarget.style.transform.match(/-?[\d\.]+/g)[0]
      );
    }

    setKeeperMove(0);
    setIsMouseDown(false);
  };

  let count = 0;

  const setElement = Array.from({ length: column }).map((_, a) => {
    return (
      <div
        className="continerColumnSS"
        ref={containerColumnSS}
        key={a}
        id={`containerCol_${id}_${a}_SS`}
      >
        {Array.from({ length: row }).map((_, index) => {
          count++;

          if (!slides[`slide${count}`]) {
            return;
          }

          return (
            <article className="containerSlide" key={index}>
              <div className={`divImg_${typeClass}_SS`}>
                <img
                  src={`src/assets/images/products/${
                    slides[`slide${count}`].img
                  }.webp`}
                  alt={`${slides[`slide${count}`].img}.webp`}
                  className={`img_${typeClass}_SS`}
                />
                <div className={`noDragImg_${typeClass}_SS`}></div>
              </div>
              <div className={`divName_${typeClass}_SS`}>
                <h3>{slides[`slide${count}`].name}</h3>
              </div>
            </article>
          );
        })}
      </div>
    );
  });

  useEffect(() => {
    const handleResize = () => {
      const bodySS = document.getElementById(`body_${id}_SS`);
      const widthBodySS = bodySS.offsetWidth;

      const containerCol = document.getElementById(`containerCol_${id}_1_SS`);

      const continerSliderSliding = document.getElementById(
        `continerSliderSliding_${id}_SS`
      );

      continerSliderSliding.style.transform = `translateX(0px)`;

      setNumStepRight(0);
      setNumStepLeft(1);

      if (containerCol) {
        setLimitMoveLeft(continerSliderSliding.offsetWidth - widthBodySS);
        const widthContainerCol = containerCol.offsetWidth;

        const numCol = Math.floor(widthBodySS / widthContainerCol);

        setValueTranslate(widthContainerCol * numCol);

        setNumPaginate(
          Math.ceil(Object.values(slides).length / (numCol * row))
        );
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [containerColumnSS.current]);

  const handleMoveBtn = (event, side) => {
    if (side == "right" && numStepRight > 0) {
      containerSliderSliding.current.style.transform = `translateX(${
        valueTranslate * numStepRight - valueTranslate
      }px)`;

      setNumStepRight((prve) => prve - 1);
      numStepLeft != numStepRight && setNumStepLeft((prve) => prve - 1);
    } else if (side == "left" && numStepLeft < numPaginate - 1) {
      containerSliderSliding.current.style.transform = `translateX(${
        valueTranslate * numStepLeft
      }px)`;
      setNumStepLeft((prve) => prve + 1);
      setNumStepRight((prve) => prve + 1);
    } else if (numStepLeft === numPaginate - 1) {
      containerSliderSliding.current.style.transform = `translateX(${limitMoveLeft}px)`;
      setNumStepLeft((prve) => prve + 1);
      setNumStepRight((prve) => prve + 1);
    }

    containerSliderSliding.current.style.transition =
      "transform 0.9s ease-in-out";
    setTransformValue(
      containerSliderSliding.current.style.transform.match(/-?[\d\.]+/g)[0]
    );
  };

  return (
    <div
      className="bodySliderSliding"
      ref={bodySliderSliding}
      style={{ backgroundColor: bgColor }}
      id={`body_${id}_SS`}
    >
      <div className="containerTitleSS" ref={containerTitleSS}>
        <div className="divTitleSS">
          <h2 className="h2TitleSS">{title}</h2>
        </div>
        <div className="divBtnMoreSS">
          <button className="btnMoreSS">
            <span>مشاهده همه</span>
            <i className="icofont-swoosh-down" />
          </button>
        </div>
      </div>

      <div
        className="notShowDivBtnSS divBtnNavSS divBtnNavRight"
        ref={navBtnRight}
      >
        <button
          className="btnNavSS btnNavRight"
          onClick={(event) => handleMoveBtn(event, "right")}
        >
          <i className="icofont-curved-right" />
        </button>
      </div>

      <div
        className="continerSliderSliding"
        ref={containerSliderSliding}
        id={`continerSliderSliding_${id}_SS`}
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
        onMouseUp={
          isActiveEvent ? (event) => handleEndSelect(event) : undefined
        }
        onMouseLeave={
          isActiveEvent ? (event) => handleEndSelect(event) : undefined
        }
      >
        {setElement}
      </div>

      <div
        className="notShowDivBtnSS divBtnNavSS divBtnNavLeft"
        ref={navBtnLeft}
      >
        <button
          className="btnNavSS btnNavLeft"
          onClick={(event) => handleMoveBtn(event, "left")}
        >
          <i className="icofont-curved-left" />
        </button>
      </div>

      {/* <div className='containerPaginateSS'>
                ss
            </div> */}
    </div>
  );
};

export default SliderSliding;
