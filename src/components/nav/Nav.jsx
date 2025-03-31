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

  const [modelSubMenu, setModelSubMenu] = useState();
  const [arraySubMenu, setArraySubMenu] = useState();

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
  //         console.log(containerVerticalMenu.current);

  //     }, 2)

  // }

  const showSupMenu = (model, array, divItem, iDown, iUp, subMenu) => {
    const hasClass = iDown.current.classList.contains("--displayNone");

    if (!hasClass) {
      setModelSubMenu(model);
      setArraySubMenu(array);

      // positionStatic(false);
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

  // const [isActive, setIsActive] = useState(false);

  /**
   *  هنگامی که بر روی یکی از دکمه های ناوبری در صفحات لمسی، لمس می شود
   * این متد فراخوانی می شود و با عث می شود که کلاس اکتیو اضافه شده و با توجه به
   * استایلی که در فایل سی اس اس تعریف شده المان دایره ای سبز رنگ نمایش داده می شود
   * @param {} e 
   */
  const handleTouchStart = (e) => {
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
  }

  const handleShowMenu = () => {
    retrun(
      <>

      </>
    );
  }

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
      <nav className="nav_NHS">
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
            className="--styleLessBtn btn_NHS cursorContextMenu"
            onTouchStart={(e) => handleTouchStart(e)}
            onBlur={(e) => handleBlur(e)}
            onFocus={handleShowMenu()}
          >
            <i className="iCircle_NHS"></i>
            <span>محصولات</span>

          </button>
        </div>

        <div className="border_NHS part1_NHS"> </div>

        <div className="nav_item_NHS" ref={divItemMobileNHS}>
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
        </div>

        <div className="nav_item_NHS" ref={divItemHomeNHS}>
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
        </div>

        <div className="border_NHS part2_NHS"></div>


        <div className="nav_item_NHS" ref={divItemSetOrderNHS}>
          <button
            className="--styleLessBtn btn_NHS"
            onClick={() => ref.current.closeAllItemsChild()}
            onTouchStart={(e) => handleTouchStart(e)}
            onBlur={(e) => handleBlur(e)}
          >
            <i className="iCircle_NHS"></i>

            <span>راهنمای ثبت سفارش</span>
          </button>
        </div>

        <div className="subMenu_NHS --displayNone" ref={divSubMenu}>
          <SubMenuHorizontal
            ref={ref}
            modelSubMenu={modelSubMenu}
            arraySubMenu={arraySubMenu}
          />
        </div>

        {/* <div className='subMenu_NHS --displayNone' ref={proNHS}>

                    <SubMenuHorizontal ref={ref} modelSubMenu={modelSubMenu} arraySubMenu={arraySubMenu} />

                </div> */}


      </nav>
    </div>
  );
};

export default Nav;
