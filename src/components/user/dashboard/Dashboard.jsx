import { useContext, useEffect, useRef } from "react";
import "./dashboard.css";
import UserContext from "../../contexts/UserContext";
import {
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { SimpleHeader } from "../../simpleHeader/SimpleHeader";
import LastSignUp from "../lastSignUp/LastSignUp";
import UseVerticalMenu from "../../hooks/UseVerticalMenu";
import VerticalMenuDashboard from "./VerticalMenuDashboard";
import OrderInProcess from "./OrderInProcess";
import avatar from "../../../assets/avatar/images.png";

const Dashboard = () => {
  /**
   * زمانی که یکی از روتهای فرزند داشبورد صدا زده می‌شود برای اینکه
   * دقیقا اسکرول کنیم به اطلاعت جدید، نیاز داریم که تشخیص دهیم
   * که آیا داشبورد صدا زده شده یا یکی از روتهای فرزند آن تا عملیات
   * اسکرول را انجام دهیم، برای دریافت آدرس از این دستور استفاده می کنیم
   * که در ادامه برنامه از آن استفاده می شود
   */
  const { pathname } = useLocation();

  const main = useRef(null);
  const refVerticalMenu = useRef(null);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  /**
   * از این یوز برای اسکرول کردن به اطلاعات جدید هنگامی که کاربر یکی
   * از روتهای فرزند داشبورد را صدا می زند استفاده میکنیم
   * این یوز تنها زمانی که آدرس تغییر می‌کند صدا زده می‌شود
   */
  useEffect(() => {
    /**
     * فقط زمانی دستورات زیر اعمال می‌شود که یکی از روتهای فرزند
     * داشبورد صدا زده شود نه آدرس اصلی داشبورد
     * روتها در فایل App.js قرار دارد
     * اطلاعت کامپوننتهای فرزند داشبورد در تگ ماین نمایش داده می‌شود
     * بخاطر همین مقدار عمودی این المنت را می‌گیریم و به دستور
     * اسکرول می‌دهیم
     */
    if (pathname != "/dashboard") {
      const { top } = main.current.getBoundingClientRect();

      window.scrollTo(0, top - 10);
    }
  }, [pathname]);

  /**
   * این متد وظیفه بستن اعلانهایی که سیستم برای کاربر می‌فرستد
   * و در بالای صفحه نمایش داده می‌شود را دارد، البته زمانی که کاربر
   * قصد بستن آنها را دارد
   * @param {} e
   */
  const closeAlert = (e) => {
    e.currentTarget.parentNode.classList.add("--displayNone");
  };

  /**
   * نمایش منوی عمودی، منو عمودی و دکمه آن تنها در صفحات با عرض
   * کمتر از 768 قابل مشاهده است
   */
  const showVerticalMenu = () => {
    refVerticalMenu.current.handleShowVerticalMenu();
  };

  return (
    <div>
      <SimpleHeader showLogout={true} />

      <div>
        <div className="containerTop_Dash">
          <div className="divAvatar_Dash">
            <button className="--styleLessBtn  btnAddAvatar_Dash">
              <i className="icofont-plus " />
            </button>

            <div className="divOverAvatar_Dash"></div>
            <img className="avatar_Dash" src={avatar} alt="avatar" />
          </div>

          <div className="divUserName_Dash">
            <h3 className="userName_Dash"> @zabihalla </h3>
          </div>

          <div className="containerAlarm_Dash">
            <div className="divMessage_Dash">
              <i className="icofont-speech-comments iMessage_Dash" />

              <span className="spanMessage_Dash">68</span>
            </div>

            <div className="divAlarm_Dash">
              <i className="icofont-alarm  iAlarm_Dash" />

              <span className="spanAlarm_Dash">98</span>
            </div>
          </div>
        </div>

        <div className="containerAlert_Dash">
          {/* به سورت موقت تعداد آلرتها زیادی اعمال شده است */}
          <div className="--divAlert --alertWarning">
            <button
              className="--styleLessBtn --alertClose"
              onClick={(e) => closeAlert(e)}
            >
              <i className="icofont-close --alertIClose" />
            </button>
            <p className="--alertP"> لطفا ثبت نام را کامل کنید. </p>
          </div>

          <div className="--divAlert --alertInfo">
            <button
              className="--styleLessBtn --alertClose"
              onClick={(e) => closeAlert(e)}
            >
              <i className="icofont-close --alertIClose" />
            </button>
            <p className="--alertP"> لطفا ثبت نام را کامل کنید. </p>
          </div>

          <div className="--divAlert --alertError">
            <button
              className="--styleLessBtn --alertClose"
              onClick={(e) => closeAlert(e)}
            >
              <i className="icofont-close --alertIClose" />
            </button>
            <p className="--alertP"> لطفا ثبت نام را کامل کنید. </p>
          </div>

          <div className="--divAlert --alertPrimary">
            <button
              className="--styleLessBtn --alertClose"
              onClick={(e) => closeAlert(e)}
            >
              <i className="icofont-close --alertIClose" />
            </button>
            <p className="--alertP"> لطفا ثبت نام را کامل کنید. </p>
          </div>

          <div className="--divAlert --alertSecondary">
            <button
              className="--styleLessBtn --alertClose"
              onClick={(e) => closeAlert(e)}
            >
              <i className="icofont-close --alertIClose" />
            </button>
            <p className="--alertP"> لطفا ثبت نام را کامل کنید. </p>
          </div>
        </div>

        <div className="containerMain_Dash">
          <main className="main_Dash" ref={main}>
            <nav className="navHorizontal_Dash">
              <button
                className="--styleLessBtn btnMenu_Dash"
                onClick={showVerticalMenu}
              >
                <i className="icofont-navigation-menu " />
              </button>

              <UseVerticalMenu
                Menu={VerticalMenuDashboard}
                hasBtn={true}
                ref={{ refVerticalMenu }}
              />

              <button className="--styleLessBtn btnNavHori_Dash">خریدها</button>

              <button className="--styleLessBtn btnNavHori_Dash">
                پیگیری سفارش
              </button>
            </nav>

            <Outlet />

            <LastSignUp />
          </main>

          <aside className="aside_dash">
            <nav className="navVertical">
              <VerticalMenuDashboard />
            </nav>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
