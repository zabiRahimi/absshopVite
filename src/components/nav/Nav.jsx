import { useEffect, useRef, useState } from "react";
import VerticalMenu from "./verticalMenu/VerticalMenu";
import UseVerticalMenu from "../hooks/UseVerticalMenu";
import "./nav.css";
import SubMenuHorizontal from "./subMenuHorizontal/SubMenuHorizontal";
import { Link, useNavigate } from "react-router-dom";
import menu from './nav.json';

const Nav = () => {
  const navigate = useNavigate();

  const ref = useRef();
  const container_NHS = useRef(null);
  const btnMenu = useRef(null);

  const refVerticalMenu = useRef(null);
  // const containerVerticalMenu = useRef(null);
  // const verticalMenu = useRef(null);
  // const verticalMenu_VMe = useRef(null);
  const divSubMenu = useRef(null);

  const divItemProNHS = useRef(null);
  const downProNHS = useRef(null);
  const upProNHS = useRef(null);
  const proNHS = useRef(null);

  const divItemMobileNHS = useRef(null);
  const downMobileNHS = useRef(null);
  const upMobileNHS = useRef(null);
  const mobileNHS = useRef(null);

  const divItemHomeNHS = useRef(null);
  const downHomeNHS = useRef(null);
  const upHomeNHS = useRef(null);
  const homeNHS = useRef(null);

  const divItemSetOrderNHS = useRef(null);
  const downSetOrderNHS = useRef(null);
  const upSetOrderNHS = useRef(null);
  const setOrderNHS = useRef(null);
  const containerRef = useRef(null);
  const allProRef = useRef(null);
  const buttonRefs = useRef({});
  const underlineRef = useRef(null);
  const subMenuRef = useRef(null);


  const [menuDisplay, setMenuDisplay] = useState();
  const [modelSubMenu, setModelSubMenu] = useState();
  const [arraySubMenu, setArraySubMenu] = useState();
  const [activeBtn, setActiveBtn] = useState(null);
  const [subDisplay, setSubDisplay] = useState('none');
  const [hoverStyle, setHoverStyle] = useState({ width: 0, left: 0 }); // مدیریت استایل خط

  const [items, setItems] = useState(

  )

  /**
   * این متد، متدهای لازم برای نمایش منوی عمودی را فرخوانی میکند
   */
  const showVerticalMenu = () => {
    // positionStatic(true);

    closeAllSubMenu();

    refVerticalMenu.current.handleShowVerticalMenu();

    // handleHideBtn();

    // handleShowVerticalSubmenu();
  };

  /**
   * این متد هنگام نمایش منوی عمودی پوزیش استاتیک را به المنت اصلی
   * کامپوننت هیدرناوبری می‌دهد، و هنگام بستن منوی عمودی پوزیشن استاتیک
   * را بر می دارد
   * @param {boolean} add
   */
  const positionStatic = (add) => {
    if (add) {
      container_NHS.current.classList.add("positionStatic");
    } else {
      container_NHS.current.classList.remove("positionStatic");
    }
  };

  // /**
  //  * هنگام نمایش منوی عمودی این متد اسکرول تگ بادی را غیر فعال می‌کند
  //  */
  // const handleBodyScrollHidden = () => {

  //     const body = document.getElementsByTagName('body');

  //     body[0].classList.add('--scrollHidden');

  // }

  // const handleHideBtn = () => {

  //     btnMenu.current.classList.toggle('--displayNone');

  // }

  /**
   * اقدامات لازم برای مشاهده منوی عمودی را انجام می‌دهد
   * ابتدا المنت منوی عمودی را با اضافه کردن کلاس نمایش می‌دهد
   * سپس برای ایجاد یک حرکت بصری توسط تابع ست‌‌تایم‌اوت با کمی تاخیر کلاس پهنای 100 درصد
   * را به المنت اضافه می‌کند
   * همچنین به المنت
   */
  // const handleShowVerticalSubmenu = () => {

  //     // verticalMenu.current.classList.remove('--displayNone');
  //     containerVerticalMenu.current.classList.remove('--displayNone');

  //     setTimeout(() => {

  //         // verticalMenu.current.classList.add('--width100');
  //         verticalMenu.current.classList.add('--width100');

  //         // verticalMenu_VMe.current.classList.add('--width100');
  //         containerVerticalMenu.current.classList.add('--width100');

  //     }, 2)

  // }

  const showSupMenu = (model, array, divItem, iDown, iUp, subMenu) => {
    const hasClass = iDown.current.classList.contains("--displayNone");

    if (!hasClass) {
      setModelSubMenu(model);
      setArraySubMenu(array);
      closeAllSubMenu();

      divItem.current.classList.add("bgColorItem_NHS");
      iDown.current.classList.add("--displayNone");
      iUp.current.classList.remove("--displayNone");
      divSubMenu.current.classList.remove("--displayNone");
    } else {
      closeAllSubMenu();
    }
  };

  /**
   * این متد تمام زیر منو های، منوی افقی را می‌بندد
   * این متد زمانی کاربرد دارد که کاربر مبادرت به تماشای منوی عمودی می‌کند
   */
  const closeAllSubMenu = () => {
    const divItems = Array.from(
      document.getElementsByClassName("nav_item_NHS")
    );
    const iDowns = Array.from(document.getElementsByClassName("iDown_NHS"));
    const iUps = Array.from(document.getElementsByClassName("iUp_NHS"));

    divItems.forEach((btn) => {
      btn.classList.remove("bgColorItem_NHS");
    });

    iDowns.forEach((down) => {
      down.classList.remove("--displayNone");
    });

    iUps.forEach((up) => {
      up.classList.add("--displayNone");
    });

    divSubMenu.current.classList.add("--displayNone");
  };

  /**
   *  هنگامی که بر روی یکی از دکمه های ناوبری در صفحات لمسی، لمس می شود
   * این متد فراخوانی می شود و با عث می شود که کلاس اکتیو اضافه شده و با توجه به
   * استایلی که در فایل سی اس اس تعریف شده المان دایره ای سبز رنگ نمایش داده می شود
   * @param {} e 
   */
  const handleTouchStart = (e) => {
    e.stopPropagation();
    e.currentTarget.classList.add("active");
  };

  /**
   * این متد بر عکس متد
   * handleTouchStart 
   * عمل می کند
   * @param {*} e 
   */
  const handleBlur = (e) => {
    e.currentTarget.classList.remove("active");
    setSubDisplay('none')
    console.log('none');

  }

  const handleClick = (e, behavior) => {
    if (["clickOnly", "clickAndHover"].includes(behavior)) {
      // عمل مشترک
    }

  }

  useEffect(() => {
    setMenuDisplay(handleMenuDisplay())
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setMenuDisplay(handleMenuDisplay())
    });
  }, []);

  const handleMenuDisplay = () => {

    let device = getDeviceType();

    if (device == 'xs_mobile') return;

    const { numberParts } = menu[0].settings;

    const parts = handleGetParts(numberParts, menu[0].items);

    const limits = handleLimitParts(device, parts[0].length, parts[1].length, parts[2].length);

    let result = [];

    parts.forEach((part, index) => {
      if (part.length === 0) return;
      const limitKey = `limitPart${index + 1}`;
      const limitValue = limits[limitKey];
      const limitedItems = part.slice(0, limitValue); // اعمال محدودیت تعداد اعضا
      if (limitedItems.length == 0) return;
      result.push(
        <div className="flex_NHS" key={index} >
          <div className="border_NHS"> </div>
          {limitedItems.map((item, itemIndex) => (
            <div className="nav_item_NHS" key={itemIndex}>
              <button
                ref={(el) => (buttonRefs.current[item.id] = el)}

                className={`--styleLessBtn btn_NHS ${item.behavior == 'clickOnly' ? '' : 'cursorCM_NHS'}`}
                onClick={(e) => handleClick(e, item.behavior)}
                onTouchStart={(e) => {
                  handleTouchStart(e);
                  handleShowLine(e, item.id);

                }}
                data-active="true"
                onBlur={(e) => { handleBlur(e); }}


                onMouseEnter={e => handleShowLine(e)}
                onMouseLeave={(e) => handleMouseLeave(e)}
              // onBlur={(e) => {
              //   handleBlur(e);
              //   setHoverStyle({ width: 0, left: 0 });
              //   setSubDisplay('none');
              //   setActiveBtn(false)
              // }}
              >
                <i className="iCircle_NHS"></i>
                <span>
                  {item.title}
                </span>
              </button>
              <div className="line">ss</div>
            </div>
          ))}
        </div>
      );
    });

    return <>{result}</>;

  };

  const getDeviceType = () => {
    const width = window.innerWidth;
    if (width <= 450) return "xs_mobile";//extra small mobile
    if (width <= 580) return "s_mobile";// samll mobile
    if (width <= 680) return "m_mobile";//medium mobile
    if (width <= 768) return "mobile";
    if (width <= 948) return "tablet";
    return "desktop";
  };

  // const handleGetParts = (numberParts, items) => {
  //   let parts = [];
  //   for (let index = 0; index < numberParts; index++) {
  //     const filteredItems = items.filter(item => item.part === index + 1);

  //     // مرتب‌سازی اعضا بر اساس priority
  //     const sortedItems = filteredItems.sort((a, b) => a.priority - b.priority);
  //     parts.push(sortedItems)
  //   }
  //   return parts;
  // }

  const handleGetParts = (numberParts, items) => {
    return Array.from({ length: numberParts }, (_, index) => {
      const filteredItems = items.filter(item => item.part === index + 1);
      return filteredItems.sort((a, b) => a.priority - b.priority);//مرتب سازی
    });
  };

  // const handleLimitParts = (device, lengthPart1, lengthPart2, lengthPart3) => {
  //   let limitPart1 = 0;
  //   let limitPart2 = 0;
  //   let limitPart3 = 0;

  //   switch (device) {
  //     case 's_mobile':
  //       if (lengthPart3 >= 1) {
  //         limitPart3 = 1;
  //       } else if (lengthPart2 >= 1) {
  //         limitPart2 = 1;
  //       } else if (lengthPart1 >= 1) {
  //         limitPart1 = 1;
  //       }
  //       break;
  //     case 'm_mobile':
  //       if (lengthPart3 >= 2) {
  //         limitPart3 = 2;
  //       } else if (lengthPart3 == 1) {
  //         limitPart3 = 1;
  //         if (lengthPart2 >= 1) {
  //           limitPart2 = 1;
  //         }
  //         else if (lengthPart1 >= 1) {
  //           limitPart1 = 1;
  //         }
  //       } else if (lengthPart2 >= 2) {
  //         limitPart2 = 2;
  //       } else if (lengthPart2 == 1) {
  //         limitPart2 = 1;
  //         if (lengthPart1 >= 1) {

  //           limitPart1 = 1;
  //         }
  //       }
  //       else if (lengthPart1 >= 2) {
  //         limitPart1 = 2;

  //       }
  //       else if (lengthPart1 == 1) {
  //         limitPart1 = 1;

  //       }
  //       break;
  //     case 'mobile':
  //       if (lengthPart3 >= 3) {
  //         limitPart3 = 3;

  //       } else if (lengthPart3 == 2) {
  //         limitPart3 = 2;
  //         if (lengthPart2 >= 1) {
  //           limitPart2 = 1;

  //         } else {
  //           limitPart1 = 1;
  //         }
  //       }
  //       else if (lengthPart3 == 1) {
  //         limitPart3 = 1;
  //         if (lengthPart2 >= 2) {
  //           limitPart2 = 2;
  //         } else if (lengthPart2 == 1) {
  //           limitPart2 = 1;
  //           limitPart1 = 1;
  //         } else {
  //           limitPart1 = 1;
  //         }
  //       }
  //       else if (lengthPart2 >= 3) {
  //         limitPart2 = 3;
  //       }
  //       else if (lengthPart2 == 2) {
  //         limitPart2 = 2;
  //         limitPart1 = 1;
  //       }
  //       else if (lengthPart2 == 1) {
  //         limitPart2 = 1;
  //         limitPart1 = 2;
  //       }
  //       else {
  //         limitPart1 = 2;

  //       }
  //       break;


  //     case 'tablet':
  //       if (lengthPart3 >= 3) {
  //         limitPart3 = 3;
  //         if (lengthPart3 >= 1) {
  //           limitPart2 = 1;
  //         } else {
  //           limitPart1 = 1;
  //         }

  //       } else if (lengthPart3 == 2) {
  //         limitPart3 = 2;
  //         if (lengthPart2 >= 2) {
  //           limitPart2 = 2;

  //         } else if (lengthPart2 == 1) {
  //           limitPart2 = 1;
  //           limitPart1 = 1;
  //         } else {
  //           limitPart1 = 2;
  //         }
  //       }
  //       else if (lengthPart3 == 1) {
  //         limitPart3 = 1;
  //         if (lengthPart2 >= 3) {
  //           limitPart2 = 3;
  //         } else if (lengthPart2 == 2) {
  //           limitPart2 = 2;
  //           limitPart1 = 1;
  //         } else if (lengthPart2 == 1) {
  //           limitPart2 = 1;
  //           limitPart1 = 2;
  //         } else {
  //           limitPart1 = 3;
  //         }
  //       }
  //       else if (lengthPart2 >= 3) {
  //         limitPart2 = 3;
  //         limitPart1 = 1;
  //       }
  //       else if (lengthPart2 == 2) {
  //         limitPart2 = 2;
  //         limitPart1 = 2;
  //       }
  //       else if (lengthPart2 == 1) {
  //         limitPart2 = 1;
  //         limitPart1 = 3;
  //       }
  //       else {
  //         limitPart1 = 4;

  //       }
  //       break;


  //     case 'desktop':
  //       if (lengthPart3 >= 3) {
  //         limitPart3 = 3;
  //         if (lengthPart2 >= 3) {
  //           limitPart2 = 3;
  //         } else if (lengthPart2 == 2) {
  //           limitPart2 = 2;
  //           limitPart1 = 1;
  //         } else if (lengthPart2 == 1) {
  //           limitPart2 = 1;
  //           limitPart1 = 2;
  //         } else {
  //           limitPart1 = 3;
  //         }

  //       } else if (lengthPart3 == 2) {
  //         limitPart3 = 2;
  //         if (lengthPart2 >= 3) {
  //           limitPart2 = 3;
  //           limitPart1 = 1;
  //         } else if (lengthPart2 == 2) {
  //           limitPart2 = 2;
  //           limitPart1 = 2;
  //         } else if (lengthPart2 == 1) {
  //           limitPart2 = 1;
  //           limitPart1 = 3;
  //         } else {
  //           limitPart1 = 4;
  //         }
  //       }
  //       else if (lengthPart3 == 1) {
  //         limitPart3 = 1;
  //         if (lengthPart2 >= 3) {
  //           limitPart2 = 3;
  //           limitPart1 = 2;
  //         } else if (lengthPart2 == 2) {
  //           limitPart2 = 2;
  //           limitPart1 = 3;
  //         } else if (lengthPart2 == 1) {
  //           limitPart2 = 1;
  //           limitPart1 = 4;
  //         } else {
  //           limitPart1 = 5;
  //         }
  //       }
  //       else if (lengthPart2 >= 3) {
  //         limitPart2 = 3;
  //         limitPart1 = 3;
  //       }
  //       else if (lengthPart2 == 2) {
  //         limitPart2 = 2;
  //         limitPart1 = 4;
  //       }
  //       else if (lengthPart2 == 1) {
  //         limitPart2 = 1;
  //         limitPart1 = 5;
  //       }
  //       else {
  //         limitPart1 = 6;

  //       }
  //       break;
  //   }


  //   return { limitPart1, limitPart2, limitPart3 };

  // }

  // تابع کمکی برای s_mobile
  const limitForS_mobile = (L1, L2, L3) => {
    let lim1 = 0, lim2 = 0, lim3 = 0;
    if (L3 >= 1) {
      lim3 = 1;
    } else if (L2 >= 1) {
      lim2 = 1;
    } else if (L1 >= 1) {
      lim1 = 1;
    }
    return { limitPart1: lim1, limitPart2: lim2, limitPart3: lim3 };
  };

  const limitForM_mobile = (L1, L2, L3) => {
    let lim1 = 0, lim2 = 0, lim3 = 0;
    if (L3 >= 2) {
      lim3 = 2;
    } else if (L3 === 1) {
      lim3 = 1;
      if (L2 >= 1) {
        lim2 = 1;
      } else if (L1 >= 1) {
        lim1 = 1;
      }
    } else if (L2 >= 2) {
      lim2 = 2;
    } else if (L2 === 1) {
      lim2 = 1;
      if (L1 >= 1) {
        lim1 = 1;
      }
    } else if (L1 >= 2) {
      lim1 = 2;
    } else if (L1 === 1) {
      lim1 = 1;
    }
    return { limitPart1: lim1, limitPart2: lim2, limitPart3: lim3 };
  };

  const limitForMobile = (L1, L2, L3) => {
    let lim1 = 0, lim2 = 0, lim3 = 0;
    if (L3 >= 3) {
      lim3 = 3;
    } else if (L3 === 2) {
      lim3 = 2;
      if (L2 >= 1) {
        lim2 = 1;
      } else {
        lim1 = 1;
      }
    } else if (L3 === 1) {
      lim3 = 1;
      if (L2 >= 2) {
        lim2 = 2;
      } else if (L2 === 1) {
        lim2 = 1;
        lim1 = 1;
      } else {
        lim1 = 1;
      }
    } else if (L2 >= 3) {
      lim2 = 3;
    } else if (L2 === 2) {
      lim2 = 2;
      lim1 = 1;
    } else if (L2 === 1) {
      lim2 = 1;
      lim1 = 2;
    } else {
      lim1 = 2;
    }
    return { limitPart1: lim1, limitPart2: lim2, limitPart3: lim3 };
  };

  const limitForTablet = (L1, L2, L3) => {
    let lim1 = 0, lim2 = 0, lim3 = 0;
    if (L3 >= 3) {
      lim3 = 3;
      // فرض می‌کنیم در اینجا همیشه آیتمی از بخش 2 وجود دارد؛ در غیر این صورت، بخش 1 را مقداردهی می‌کنیم.
      if (L2 >= 1) {
        lim2 = 1;
      } else {
        lim1 = 1;
      }
    } else if (L3 === 2) {
      lim3 = 2;
      if (L2 >= 2) {
        lim2 = 2;
      } else if (L2 === 1) {
        lim2 = 1;
        lim1 = 1;
      } else {
        lim1 = 2;
      }
    } else if (L3 === 1) {
      lim3 = 1;
      if (L2 >= 3) {
        lim2 = 3;
      } else if (L2 === 2) {
        lim2 = 2;
        lim1 = 1;
      } else if (L2 === 1) {
        lim2 = 1;
        lim1 = 2;
      } else {
        lim1 = 3;
      }
    } else if (L2 >= 3) {
      lim2 = 3;
      lim1 = 1;
    } else if (L2 === 2) {
      lim2 = 2;
      lim1 = 2;
    } else if (L2 === 1) {
      lim2 = 1;
      lim1 = 3;
    } else {
      lim1 = 4;
    }
    return { limitPart1: lim1, limitPart2: lim2, limitPart3: lim3 };
  };

  const limitForDesktop = (L1, L2, L3) => {
    let lim1 = 0, lim2 = 0, lim3 = 0;
    if (L3 >= 3) {
      lim3 = 3;
      if (L2 >= 3) {
        lim2 = 3;
      } else if (L2 === 2) {
        lim2 = 2;
        lim1 = 1;
      } else if (L2 === 1) {
        lim2 = 1;
        lim1 = 2;
      } else {
        lim1 = 3;
      }
    } else if (L3 === 2) {
      lim3 = 2;
      if (L2 >= 3) {
        lim2 = 3;
        lim1 = 1;
      } else if (L2 === 2) {
        lim2 = 2;
        lim1 = 2;
      } else if (L2 === 1) {
        lim2 = 1;
        lim1 = 3;
      } else {
        lim1 = 4;
      }
    } else if (L3 === 1) {
      lim3 = 1;
      if (L2 >= 3) {
        lim2 = 3;
        lim1 = 2;
      } else if (L2 === 2) {
        lim2 = 2;
        lim1 = 3;
      } else if (L2 === 1) {
        lim2 = 1;
        lim1 = 4;
      } else {
        lim1 = 5;
      }
    } else if (L2 >= 3) {
      lim2 = 3;
      lim1 = 3;
    } else if (L2 === 2) {
      lim2 = 2;
      lim1 = 4;
    } else if (L2 === 1) {
      lim2 = 1;
      lim1 = 5;
    } else {
      lim1 = 6;
    }
    return { limitPart1: lim1, limitPart2: lim2, limitPart3: lim3 };
  };

  const handleLimitParts = (device, lengthPart1, lengthPart2, lengthPart3) => {
    switch (device) {
      case 's_mobile':
        return limitForS_mobile(lengthPart1, lengthPart2, lengthPart3);
      case 'm_mobile':
        return limitForM_mobile(lengthPart1, lengthPart2, lengthPart3);
      case 'mobile':
        return limitForMobile(lengthPart1, lengthPart2, lengthPart3);
      case 'tablet':
        return limitForTablet(lengthPart1, lengthPart2, lengthPart3);
      case 'desktop':
        return limitForDesktop(lengthPart1, lengthPart2, lengthPart3);
      default:
        return { limitPart1: 0, limitPart2: 0, limitPart3: 0 };
    }
  };



  const handleShowLine = async (e, id) => {
    e.stopPropagation();
    const target = e.currentTarget.getBoundingClientRect();
    const newWidth = target.width;
    const newLeft = target.left;
    setHoverStyle({ width: newWidth, left: newLeft });
    setSubDisplay('block');
    setActiveBtn(id);
    console.log(`id ${id}`);

  }

  const handleMouseLeave = (event) => {
    // بررسی اینکه آیا ماوس وارد زیر منو یا خط شده است
    const relatedElement = event.relatedTarget;

    if (
      underlineRef.current &&
      underlineRef.current.contains(relatedElement)
    ) {
      // ماوس وارد خط شده است، خروج از دکمه مدیریت نمی‌شود
      return;
    }

    if (
      subMenuRef.current &&
      subMenuRef.current.contains(relatedElement)
    ) {
      return;
    }

    // اگر ماوس کاملاً از دکمه خارج شد
    setActiveBtn(null);
    setSubDisplay('none')
  };

 

  // useEffect(() => {
  //   const updateUnderlinePosition = () => {

  //     if (activeBtn && (buttonRefs.current[activeBtn] || allProRef.current)) {
  //       console.log(activeBtn);

  //       if ((activeBtn!='allPro' && !buttonRefs.current[activeBtn])) {
  //         setSubDisplay('none');
  //       }else{
  //         const buttonRect = activeBtn != 'allPro' ? buttonRefs.current[activeBtn].getBoundingClientRect() : allProRef.current.getBoundingClientRect();
  //         const underline = underlineRef.current;
  //         console.log(buttonRect.width);

  //         if (underline && buttonRect.width>0) {
  //           setHoverStyle({ width: buttonRect.width, left: buttonRect.left });

  //         }else{
  //           setSubDisplay('none');
  //         }
  //       }

  //     }
  //   }
  //   window.addEventListener('resize', updateUnderlinePosition);

  //   return () => {
  //     window.removeEventListener('resize', updateUnderlinePosition);
  //   };
  // }, [activeBtn]);

  useEffect(() => {
    const updateUnderlinePosition = () => {
      // اطمینان از وجود activeBtn و مرجع‌های مرتبط
      if (!activeBtn || (!buttonRefs.current[activeBtn] && activeBtn !== "allPro")) {
        setSubDisplay("none");
        return;
      }

      // دریافت مختصات دکمه یا allPro
      const reference =
        activeBtn === "allPro"
          ? allProRef.current
          : buttonRefs.current[activeBtn];

      if (reference) {
        const buttonRect = reference.getBoundingClientRect();

        // بررسی ابعاد و تنظیم استایل
        if (buttonRect.width > 0) {
          setHoverStyle({ width: buttonRect.width, left: buttonRect.left });
        } else {
          setSubDisplay("none");
        }
      } else {
        setSubDisplay("none");
      }
    };

    // updateUnderlinePosition();
    window.addEventListener("resize", updateUnderlinePosition); // مدیریت تغییر اندازه

    return () => {
      window.removeEventListener("resize", updateUnderlinePosition); // پاک‌سازی
    };
  }, [activeBtn]);


  // اضافه کردن رویداد تاچ روی داکیومنت برای تشخیص لمس خارج از container
  useEffect(() => {
    const handleTouchOutside = (event) => {
      if (containerRef.current) {
        // اگر لمس در داخل containerRef اتفاق افتاده باشد
        if (containerRef.current.contains(event.target)) {
          // اگر لمس روی دکمه نباشد، activeButton ریست شود
          if (!event.target.closest('button[data-active]')) {
            setActiveBtn(null);
            setSubDisplay('none');
          }
        } else {
          // اگر خارج از containerRef باشد نیز حالت ریست شود
          setActiveBtn(null);
          setSubDisplay('none')
        }
      }
    };
    // const handleTouchOutside = (event) => {
    //   if (containerRef.current && !containerRef.current.contains(event.target)) {
    //     setActiveBtn(null);
    //     setSubDisplay('none')
    //   }
    // };

    document.addEventListener("touchstart", handleTouchOutside);

    return () => {
      document.removeEventListener("touchstart", handleTouchOutside);
    };
  }, []);

  return (
    <div className={`container_NHS`} ref={container_NHS}>
      <div className="cart_container_NHS">
        <div className="cart_div_icon_NHS">
          <i className="icofont-cart cart_icon_NHS" />
        </div>
        <div className="cart_count_NHS">0</div>
      </div>

      <div className="serch_container_NHS">
        <div className="serch_icon_NHS">
          <i className="icofont-search-2 "></i>
        </div>
        <input type="text" className="serch_input_NHS" />
      </div>
      <nav className="nav_NHS" ref={containerRef}>
        <div className="menu_NHS">
          <button
            onClick={showVerticalMenu}
            className="--styleLessBtn menubutton_NHS"
            ref={btnMenu}
          >
            <i className="icofont-navigation-menu --block"></i>
          </button>

          {/* <VerticalSubmenu
                        refBtn={btnMenu}
                        ref={{ verticalMenu, verticalMenu_VMe }}

                    /> */}

          {/* <VerticalMenu
                        refBtn={btnMenu}
                        ref={{ verticalMenu, verticalMenu_VMe }}
                    /> */}

          <UseVerticalMenu
            Menu={VerticalMenu}
            hasBtn={true}
            ref={{ refVerticalMenu }}
          />
        </div>

        <div className="nav_item_NHS allPro_NHS" ref={divItemProNHS}>
          <button
            className="--styleLessBtn btn_NHS cursorCM_NHS"
            onTouchStart={(e) => { handleTouchStart(e); handleShowLine(e, 'allPro'); }}
            // onBlur={(e) => { handleBlur(e, 'allPro'); }}
            onMouseEnter={e => handleShowLine(e)}
            data-active="true"
            ref={allProRef}
            onMouseLeave={(e) => handleMouseLeave(e)}
          >
            <i className="iCircle_NHS"></i>
            <span>محصولات</span>
          </button>
        </div>
        <div
          className="sub_allPro_NHS"
          style={{ display: subDisplay }}
          ref={subMenuRef}
        >
          <span>zabi</span>
        </div>

        {menuDisplay && menuDisplay}
        <span
          className="menuLine_NHS"
          style={{
            display: subDisplay,
            width: `${hoverStyle.width}px`,
            left: `${hoverStyle.left}px`,
          }}
          ref={underlineRef}
        >
        </span>

        {/* <div className="border_NHS part1_NHS"> </div> */}

        {/* <div className="nav_item_NHS" ref={divItemMobileNHS}>
          <button
            className="--styleLessBtn btn_NHS"
            onClick={() => (
              showSupMenu(
                "items",
                "mobile",
                divItemMobileNHS,
                downMobileNHS,
                upMobileNHS,
                mobileNHS
              ),
              ref.current.closeAllItemsChild()
            )}
            onTouchStart={(e) => handleTouchStart(e)}
            onBlur={(e) => handleBlur(e)}
          >

            <i className="iCircle_NHS"></i>

            <span>موبایل</span>
          </button>
        </div> */}

        {/* <div className="nav_item_NHS" ref={divItemHomeNHS}>
          <button
            className="--styleLessBtn btn_NHS"
            onClick={() => (
              showSupMenu(
                "items",
                "homeAndKitchen",
                divItemHomeNHS,
                downHomeNHS,
                upHomeNHS,
                homeNHS
              ),
              ref.current.closeAllItemsChild()
            )}
            onTouchStart={(e) => handleTouchStart(e)}
            onBlur={(e) => handleBlur(e)}
          >
            <i className="iCircle_NHS"></i>

            <span>خانه و آشپزخانه</span>
          </button>
        </div> */}

        {/* <div className="border_NHS part2_NHS"></div> */}


        {/* <div className="nav_item_NHS" ref={divItemSetOrderNHS}>
          <button
            className="--styleLessBtn btn_NHS"
            onClick={() => ref.current.closeAllItemsChild()}
            onTouchStart={(e) => handleTouchStart(e)}
            onBlur={(e) => handleBlur(e)}
          >
            <i className="iCircle_NHS"></i>

            <span>راهنمای ثبت سفارش</span>
          </button>
        </div> */}

        {/* <div className="subMenu_NHS --displayNone" ref={divSubMenu}>
          <SubMenuHorizontal
            ref={ref}
            modelSubMenu={modelSubMenu}
            arraySubMenu={arraySubMenu}
          />
        </div> */}

        {/* <div className='subMenu_NHS --displayNone' ref={proNHS}>

                    <SubMenuHorizontal ref={ref} modelSubMenu={modelSubMenu} arraySubMenu={arraySubMenu} />

                </div> */}


      </nav>
    </div>
  );
};

export default Nav;
