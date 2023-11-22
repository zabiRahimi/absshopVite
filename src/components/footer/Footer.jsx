import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import iran from "../../assets/logos/iran.png";
import aparat from "../../assets/logos/aparat.png";
import Bale from "../../assets/logos/Bale.png";
import instagram from "../../assets/logos/instagram.png";
import sorush from "../../assets/logos/sorush.png";
import whatsapp from "../../assets/logos/whatsapp.png";

import "./footer.css";

export default function Footer() {
  const { user, setUser } = useContext(UserContext);

  const MySwal = withReactContent(Swal);

  const logout = () => {
    // هنگام توسعه سرور تکمیل شود

    MySwal.fire({
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "خیر",
      confirmButtonText: "بله",
      html: (
        <div>
          <div className="--mySwalWarningDiv">
            <i className="icofont-exclamation --mySwalWarningIcon" />
          </div>
          <div className="--mySwalDivTitle">
            <h3 className="--mySwalTitle"> آیا می‌خواهید خارج شوید؟ </h3>
          </div>
        </div>
      ),

      customClass: {
        popup: "--mySwalPopup",
        htmlContainer: "--mySwalHtml",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem("userData");
        setUser((prev) => ({ ...prev, login: false, name: "", email: "" }));
      }
    });
  };

  return (
    <footer className="containerFooter">
      <div className="containerWebFooter">
        <div className="webFooter">absShop.ir</div>

        <div className="flagFooter">
          <img src={iran} alt="iran" />
        </div>
      </div>

      <div className="containerAccountFooter">
        {!user.login ? (
          <>
            <Link className="--styleLessLink signInLink_Foo" to="signIn">
              {/* linkItem_VMe */}

              <i className="icofont-login " />
              <span>ورود</span>
            </Link>

            {/* // linkItem_VMe */}

            <Link className="--styleLessLink signUpLink_Foo" to="signUp">
              <i className="icofont-ui-user " />
              <span>ثبت نام</span>
            </Link>
          </>
        ) : (
          <>
            <Link className="--styleLessLink profileLink_Foo" to="dashboard">
              {/* linkItem_VMe profileLink_VMe */}

              <i className="icofont-ui-user  " />
              <span> حساب کاربری </span>
            </Link>

            <button className="--styleLessBtn logoutBtn_Foo" onClick={logout}>
              {/* btnItem_VMe signOutBtn_VMe */}

              <i className="icofont-sign-out " />
              <span> خروج </span>
            </button>
          </>
        )}
      </div>

      <div className="containerShopFooter">
        <div className="logoFooter">logo</div>

        <div className="shopFooter">
          <div className="itmeShopFooter">
            <Link className="--styleLessLink linkFooter" to="/aboutUs">
              <i className="icofont-info-circle " />
              <span>درباره ما</span>
            </Link>
          </div>

          <div className="itmeShopFooter">
            <Link className="--styleLessLink linkFooter" to="/contactUs">
              <i className="icofont-phone-circle " />
              <span>تماس با ما</span>
            </Link>
          </div>

          <div className="itmeShopFooter">
            <Link className="--styleLessLink linkFooter" to="/cooperationUs">
              <i className="icofont-handshake-deal " />
              <span>همکاری با ما</span>
            </Link>
          </div>

          <div className="itmeShopFooter">
            <Link
              className="--styleLessLink linkFooter"
              to="/criticismAndSuggestions"
            >
              <i className="icofont-google-talk " />
              <span>انتقاد و پیشنهاد</span>
            </Link>
          </div>

          <div className="itmeShopFooter">
            <Link className="--styleLessLink linkFooter" to="/complaint">
              <i className="icofont-law-order " />
              <span>شکایات</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="containerContractFooter">
        <div className="titleFooter">
          <span>قراردادها</span>

          <div className="lineFooter"> </div>
        </div>

        <div className="contractFooter">
          <div className="itmeContractFooter"></div>
          <div className="itmeContractFooter"></div>
          <div className="itmeContractFooter"></div>
          <div className="itmeContractFooter"></div>
          <div className="itmeContractFooter"></div>
        </div>
      </div>

      <div className="containerLicenseFooter">
        <div className="titleFooter">
          <span>مجوزها</span>
          <div className="lineFooter"></div>
        </div>

        <div className="licenseFooter">
          <div className="itmeLicenseFooter"></div>
          <div className="itmeLicenseFooter"></div>
          <div className="itmeLicenseFooter"></div>
          <div className="itmeLicenseFooter"></div>
          <div className="itmeLicenseFooter"></div>
        </div>
      </div>

      <div className="containerFollowFooter">
        <div className="titleFooter">
          <span>ما را دنبال کنید</span>
          <div className="lineFooter"></div>
        </div>

        <div className="followFooter">
          <div className="itmeFollowFooter">
            <img src={aparat} alt="aparat" />
          </div>

          <div className="itmeFollowFooter">
            <img src={Bale} alt="bale" />
          </div>

          <div className="itmeFollowFooter">
            <img src={instagram} alt="instagram" />
          </div>

          <div className="itmeFollowFooter">
            <img src={sorush} alt="sorush" />
          </div>

          <div className="itmeFollowFooter">
            <img src={whatsapp} alt="whatsapp" />
          </div>
        </div>
      </div>
    </footer>
  );
}
