import { useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./simpleHeader.css";

export const SimpleHeader = ({ showLogout = false }) => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const MySwal = withReactContent(Swal);

  const divLogout = useRef(null);

  useEffect(() => {
    showLogout && divLogout.current.classList.remove("--displayNone");
  }, []);

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
            <h3 className="--mySwalTitle">
              {" "}
              آیا می‌خواهید از حساب کاربری خارج شوید؟{" "}
            </h3>
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
    <header className="containerHeader_SHe">
      <div className="containerLogo_SHe">
        <div className="logo_SHe">logo</div>
        <div className="name_SHe">فروشگاه اینترنتی </div>
      </div>

      <div className="containerLink_She">
        <div className="divLink_SHe">
          <button
            className="--styleLessBtn link_SHe"
            onClick={() => {
              navigate(-1);
            }}
          >
            <i className="icofont-undo i_SHe" />
            <span className="span_SHe">بازگشت</span>
          </button>
        </div>

        <div className="divLink_SHe">
          <Link className="--styleLessLink link_SHe" to="/">
            <i className="icofont-ui-home i_SHe" />
            <span className="span_SHe"> خانه </span>
          </Link>
        </div>

        <div
          className="divLink_SHe divLogout_SHe --displayNone"
          ref={divLogout}
        >
          <button className="--styleLessBtn link_SHe" onClick={logout}>
            <i className="icofont-sign-out i_SHe" />
            <span className="span_SHe"> خروج </span>
          </button>
        </div>
      </div>
    </header>
  );
};
