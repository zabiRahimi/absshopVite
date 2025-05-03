import { useEffect, useRef, useState } from "react";
import VerticalMenu from "./verticalMenu/VerticalMenu";
import UseVerticalMenu from "../hooks/UseVerticalMenu";
import "./nav.css";
import SubMenuHorizontal from "./subMenuHorizontal/SubMenuHorizontal";
import { Link, useNavigate } from "react-router-dom";
import menu from './nav.json';
import EnterIcon from "../svg/EnterIcon";
// import {ReactComponent as InterIcon} from '../../assets/images/icon/interIcon.svg';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import useRipple from "../hooks/useRipple";
import '../hooks/useRipple.css';

const Nav = () => {
  const navigate = useNavigate();
  useRipple();

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
  const hoveredRef = useRef(false);

  const [isSticky, setIsSticky] = useState(false);//
  const [menuDisplay, setMenuDisplay] = useState();
  const [submenuDisplay, setSubmenuDisplay] = useState();
  const [categoryDisplay, setCategoryDisplay] = useState();
  const [modelSubMenu, setModelSubMenu] = useState();
  const [arraySubMenu, setArraySubMenu] = useState();
  const [activeBtn, setActiveBtn] = useState(null);
  const [subDisplay, setSubDisplay] = useState('none');
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });

  const [items, setItems] = useState(

  )
  const [title, setTitle] = useState(null);


  useEffect(() => {
    setMenuDisplay(handleMenuDisplay())
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setMenuDisplay(handleMenuDisplay())
    });
  }, []);

  const handleMenuDisplay = () => {
    const device = getDeviceType();
    if (device === 'xs_mobile') return null;

    const { numberParts } = menu[0].settings;
    const parts = handleGetParts(numberParts, menu[0].items);
    const limits = handleLimitParts(
      device,
      parts[0].length,
      parts[1].length,
      parts[2].length
    );

    const result = parts.map((part, index) => {
      if (part.length === 0) return null;
      const limitKey = `limitPart${index + 1}`;
      const limitValue = limits[limitKey];
      const limitedItems = part.slice(0, limitValue);
      if (limitedItems.length === 0) return null;
      return (
        <div className="flex_NHS" key={index}>
          <div className="border_NHS" />
          {limitedItems.map((item, itemIndex) => (
            <div className="nav_item_NHS" key={itemIndex}>
              {item.behavior != 'clickOnly' ? (
                <button
                  ref={(el) => (buttonRefs.current[item.id] = el)}
                  className={`--styleLessBtn btn_NHS ${item.behavior === 'clickOnly' ? '' : 'cursorCM_NHS'
                    }`}
                  onClick={(e) => {
                    if (!hoveredRef.current) {
                      //شرط زیر یک حالت toggle ایجاد می کند
                      if (activeBtnRef.current != item.id) {
                        handleBtnAction(e, item.id, item.behavior, item.title);
                      } else {
                        handleBtnLeave(e)
                      }
                    }
                  }}
                  data-active="true"
                  onMouseEnter={(e) => {
                    handleBtnAction(e, item.id, item.behavior, item.title);
                    hoveredRef.current = true;
                  }}
                  onMouseLeave={(e) => {
                    handleBtnLeave(e);
                    hoveredRef.current = false;
                  }}
                >
                  <i className="iCircle_NHS"></i>
                  <span>{item.title}</span>
                </button>
              ) : (
                <Link className="--styleLessLink  linkBtn_NHS  ripple-btn"
                //  onClick={(e)=>{e.currentTarget.blur()}}
                >{item.title}</Link>
              )}
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

  const handleGetParts = (numberParts, items) => {
    return Array.from({ length: numberParts }, (_, index) => {
      const filteredItems = items.filter(item => item.part === index + 1);
      return filteredItems.sort((a, b) => a.priority - b.priority);//مرتب سازی
    });
  };

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

  /**
   * تعداد نمایش منو در منوی خطی
   * فرض بر این است که منوی خطی به سه قسمت تقسیم گردد که با خط عمودی از هم جدا میشوند
   * حالا بر اساس دیوایس مشخص میشود که در هر دیوایس منو چند قسمت شود و هر قسمت چند
   * آیتم داشته باشد
   * @param {*} device 
   * @param {*} lengthPart1 
   * @param {*} lengthPart2 
   * @param {*} lengthPart3 
   * @returns 
   */
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

  const handleBtnAction = (e, id, behavior, title) => {

    isSticky && (document.body.style.overflow = "hidden");

    handleBtnActivation(e);
    handleUnderlineDisplay(e);
    // handleSetTitle(behavior, title);
    setActiveBtn(id);
    setSubDisplay('flex');
    handleGetSubmenu(e, id);
    setTitle(null)


  }

  /**
   *  هنگامی که بر روی یکی از دکمه های ناوبری در صفحات لمسی، لمس می شود
   * این متد فراخوانی می شود و با عث می شود که کلاس اکتیو اضافه شده و با توجه به
   * استایلی که در فایل سی اس اس تعریف شده المان دایره ای سبز رنگ نمایش داده می شود
   * @param {} e 
   */
  const handleBtnActivation = (e) => {

    // در صورت وجود دکمه انتخاب شده، ابتدا آن دکمه را ار حالت انتخاب خارج میکند
    allProRef.current.classList.remove("active")
    if (buttonRefs.current) {
      for (const key in buttonRefs.current) {
        const button = buttonRefs.current[key];
        // اطمینان از اینکه مرجع معتبر و موجود باشد
        if (button && button.classList.contains("active")) {
          button.classList.remove("active");
        }
      }
    }
    e.stopPropagation();
    e.currentTarget.classList.add("active");
  };


  const handleUnderlineDisplay = async (e) => {
    e.stopPropagation();
    const target = e.currentTarget.getBoundingClientRect();
    const newWidth = target.width;
    const newLeft = target.left;
    setUnderlineStyle({ width: newWidth, left: newLeft });
  }

  /**
   * برای استفاده در لینک زیر منو
   * لینکی که همه محصول مربرط به منو را در یک صفحه جداگانه نمایش می دهد
   * @param {*} title 
   */
  const handleSetTitle = (behavior, title) => {
    if (behavior == "hoverOlny" || title == 'محصولات') {
      setTitle('hoverOnly')
    } else {
      setTitle(title)
    }
  }

  const activeBtnRef = useRef(activeBtn);

  useEffect(() => {
    activeBtnRef.current = activeBtn; // به‌روزرسانی مقدار ref هنگام تغییر state
  }, [activeBtn]);

  const handleBtnLeave = (e) => {

    // بررسی اینکه آیا ماوس وارد زیر منو یا خط شده است
    const relatedElement = e.relatedTarget;
    if (
      underlineRef.current &&
      underlineRef.current.contains(relatedElement)
    ) {
      return;
    }

    if (
      subMenuRef.current &&
      subMenuRef.current.contains(relatedElement)
    ) {
      return;
    }
    if (!activeBtnRef.current) return;

    // اگر ماوس کاملاً از دکمه خارج شد
    setSubDisplay('none');
    const reference =
      activeBtn === "allPro"
        ? allProRef.current
        : buttonRefs.current[activeBtnRef.current];
    reference.classList.remove('active')
    setActiveBtn(null);
    // setTitle(null);
    // console.log(title);
    
    document.body.style.overflow = "auto";
    hoveredRef.current = false;
  };

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
          setUnderlineStyle({ width: buttonRect.width, left: buttonRect.left });
        } else {
          setSubDisplay("none");
        }
      } else {
        setSubDisplay("none");
      }
    };

    window.addEventListener("resize", updateUnderlinePosition); // مدیریت تغییر اندازه

    return () => {
      window.removeEventListener("resize", updateUnderlinePosition); // پاک‌سازی
    };
  }, [activeBtn]);


  // اضافه کردن رویداد تاچ روی داکیومنت برای تشخیص لمس خارج از container
  useEffect(() => {
    if (!activeBtn) return;
    const handleTouchOutside = (event) => {
      if (subMenuRef.current && subMenuRef.current.contains(event.target)) {
        return;
      }
      if (activeBtn) {
        const reference =
          activeBtn === "allPro"
            ? allProRef.current
            : buttonRefs.current[activeBtn];
        if (containerRef.current) {
          // اگر لمس در داخل containerRef اتفاق افتاده باشد
          if (containerRef.current.contains(event.target)) {
            // اگر لمس روی دکمه نباشد، activeButton ریست شود
            if (!event.target.closest('button[data-active]')) {
              reference.classList.remove("active");
              setActiveBtn(null);
              setSubDisplay('none');
            }
          } else {
            reference.classList.remove("active");
            // اگر خارج از containerRef باشد نیز حالت ریست شود
            setActiveBtn(null);
            setSubDisplay('none')
          }
        }
      }
    };
    document.addEventListener("touchstart", handleTouchOutside);
    return () => {
      document.removeEventListener("touchstart", handleTouchOutside);
    };
  }, [activeBtn]);

  const handleGetSubmenu = (e, id) => {
    let submenus;
    if (id == 'allPro') {
      submenus = menu[0].items.filter(item => item.product === true);
    } else {
      submenus = menu[0].items.find(item => item.id === id);
      submenus = submenus.category;
    }

    handleSubmenuDisplay(e, submenus, id)

  }

  const handleSubmenuDisplay = (e, submenus, id) => {
    let result = [];
    result = submenus.map((submenu, i) => (
      <button key={i} className="--styleLessBtn btnRightSub_NHS"
        onClick={(e) => {
          if (!hoveredRef.current) {
            handleGetCategory(e)
          }
        }}
        onMouseEnter={e => handleGetCategory(e)}
      >
        <span className="spanSubBtn_NHS">
          {id == 'allPro' ? submenu.title : submenu.label}
        </span>
        <div className="lineSubBtn_NHS"></div>

      </button>
    ))
    setSubmenuDisplay(null);
    setTimeout(() => {
      setSubmenuDisplay(result);
      setTimeout(() => {
        handleActivateAndFetchFirstSubmenuItem(submenus[0], id);
      }, 10);
    }, 220);
  }

  function handleActivateAndFetchFirstSubmenuItem(firstItme, id) {

    activateFirstSubmenuItem();
    setTimeout(() => {
      setTitle(id == 'allPro' ? firstItme.title : firstItme.label)
    }, 150);

    // در نهایت واکشی داده‌های مرتبط با اولین آیتم
    fetchAndDisplaySubmenuDetails(firstItme, id);
  }

  const activateFirstSubmenuItem = () => {
    const elements = document.getElementsByClassName('btnRightSub_NHS');
    Array.from(elements).forEach(element => {
      element.classList.remove('BRSHover_NHS');
    });
    elements[0].classList.add('BRSHover_NHS');
  }

  const fetchAndDisplaySubmenuDetails = (firstItme, id) => {
    // console.log(firstItme);

  }

  const handleGetCategory = (e) => {
    handleSetSubmenuStyle(e);
  }

  const handleSetSubmenuStyle = (e) => {
    const elements = document.getElementsByClassName('btnRightSub_NHS');
    Array.from(elements).forEach(element => {
      element.classList.remove('BRSHover_NHS');
    });
    e.currentTarget.classList.add('BRSHover_NHS')
  }

  useEffect(() => {
    const handleScroll = () => {
      if (container_NHS.current) {
        const { top } = container_NHS.current.getBoundingClientRect();
        if (top <= 0 && !isSticky) {
          setIsSticky(true);
          if (activeBtn) {
            document.body.style.overflow = "hidden";
          }
        } else if (top > 0 && isSticky) {
          setIsSticky(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isSticky, activeBtn]);


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

            onClick={(e) => {
              if (!hoveredRef.current) {
                //شرط زیر یک حالت toggle ایجاد می کند
                if (activeBtn != 'allPro') {
                  handleBtnAction(e, 'allPro', 'hoverOnly', 'محصولات');
                } else {
                  handleBtnLeave(e)

                }
              }
            }}

            onMouseEnter={e => {
              handleBtnAction(e, 'allPro', 'hoverOnly', "محصولات");
              hoveredRef.current = true
            }}

            data-active="true"
            ref={allProRef}
            onMouseLeave={(e) => handleBtnLeave(e)}

          >
            <i className="iCircle_NHS"></i>
            <span>محصولات</span>
          </button>
        </div>

        {menuDisplay && menuDisplay}

        <span
          className="menuUnderline_NHS"
          style={{
            display: subDisplay,
            width: `${underlineStyle.width}px`,
            left: `${underlineStyle.left}px`,
          }}
          ref={underlineRef}
          onMouseLeave={(e) => { handleBtnLeave(e) }}
        >
        </span>

        <div
          className="sub_allPro_NHS"
          style={{ display: subDisplay }}
          ref={subMenuRef}
          onMouseLeave={(e) => { handleBtnLeave(e) }}

        >
          <div className="rigthSub_NHS">
            {submenuDisplay ? submenuDisplay :
              <Skeleton
                count={3}
                duration={1.6}
                containerClassName="skeleton_containerSubmenuItem"
                className="skeleton_submenuItem"
              />
            }

            {/* <button className="--styleLessBtn btnRightSub_NHS BRSHover_NHS"
              onClick={(e) => {
                if (!hoveredRef.current) {
                  handleSubmenuDisplay(e)
                }
              }}
              onMouseEnter={e =>handleSubmenuDisplay(e)}
            >
              <span className="spanSubBtn_NHS">
                موبیایل
              </span>
              <div className="lineSubBtn_NHS"></div>

            </button>
            <button className="--styleLessBtn btnRightSub_NHS"
              onClick={e => handleSubmenuDisplay(e)}
              onMouseEnter={e =>handleSubmenuDisplay(e)}
              >
              <span className="spanSubBtn_NHS">
                کیف و کفش
              </span>
              <div className="lineSubBtn_NHS"></div>
            </button>
            <button className="--styleLessBtn btnRightSub_NHS "
              onClick={e => handleSubmenuDisplay(e)}>
              <span className="spanSubBtn_NHS">
                وسایل خودور
              </span>
              <div className="lineSubBtn_NHS"></div>
            </button>
            <button className="--styleLessBtn btnRightSub_NHS"
              onClick={e => handleSubmenuDisplay(e)}>
              <span className="spanSubBtn_NHS">
                ورزش و سفر
              </span>
              <div className="lineSubBtn_NHS"></div>
            </button>
            <button className="--styleLessBtn btnRightSub_NHS"
              onClick={e => handleSubmenuDisplay(e)}>
              <span className="spanSubBtn_NHS">
                آرایشی بهداشتی
              </span>
              <div className="lineSubBtn_NHS"></div>
            </button>
            <button className="--styleLessBtn btnRightSub_NHS"
              onClick={e => handleSubmenuDisplay(e)}>
              <span className="spanSubBtn_NHS">
                خانه و آشپزخانه
              </span>
              <div className="lineSubBtn_NHS"></div>
            </button>
            <button className="--styleLessBtn btnRightSub_NHS"
              onClick={e => handleSubmenuDisplay(e)}>
              <span className="spanSubBtn_NHS">
                مبل و مان
              </span>
              <div className="lineSubBtn_NHS"></div>
            </button>
            <button className="--styleLessBtn btnRightSub_NHS"
              onClick={e => handleSubmenuDisplay(e)}>
              <span className="spanSubBtn_NHS">
                لباس مردانه
              </span>
              <div className="lineSubBtn_NHS"></div>
            </button> */}
          </div>
          <div className="leftSub_NHS">
            {
              title ?
                // title != 'hoverOnly' && 
                <Link to="" className="--styleLessLink link_NHS">
                  <i className="enterIcon_NHS">
                    <EnterIcon />
                  </i>
                  مشاهده همه {title}
                </Link>
                :
                <Skeleton
                  count={1}
                  duration={1.6}
                  containerClassName="skeleton_containerSubmenuLinkTitle_NHS"
                  className="skeleton_submenuLinkTitle_NHS"
                />
            }
          </div>
        </div>



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
            onTouchStart={(e) => handleBtnActivation(e)}
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
            onTouchStart={(e) => handleBtnActivation(e)}
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
            onTouchStart={(e) => handleBtnActivation(e)}
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
