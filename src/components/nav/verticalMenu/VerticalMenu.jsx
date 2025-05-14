import { forwardRef, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

import VerticalSubmenu from "./verticalSubmenu/VerticalSubmenu";
import "./verticalMenu.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ItemBtn from './ItemBtn';

const VerticalMenu = ({ handleBodyScrollShow, handleCloseVerticalMenu, items, verticalParts }) => {
  const navigate = useNavigate();

  const proAllItems = items.filter(item => item.product === true);






  const { user, setUser } = useContext(UserContext);

  const MySwal = withReactContent(Swal);

  const SubMenuPros = useRef(null);
  const iDownPros = useRef(null);
  const iUpPros = useRef(null);
  // const [tags, setTags] = useState([]);
  // let tags = [];
  // for (let i = 1; i < verticalParts; i++) {
  //   let array = items.filter(item => item.verticalPart === i + 1)
  //   tags = <div key={i} className="divItems_VMe ">
  //     {array.map((item, a) => (
  //       <button
  //         key={a}
  //         className="--styleLessBtn btnItem_VMe"
  //       // onClick={() => handleShowSubMenu(iDownPros, iUpPros, SubMenuPros)}
  //       >
  //         <i className="icofont-tasks-alt " />
  //         <span> {item.title} </span>
  //         <i
  //           className="icofont-rounded-down down_VMe lastChild_VMe"
  //         // ref={iDownPros}
  //         />
  //         <i
  //           className="icofont-rounded-up up_VMe lastChild_VMe --displayNone"
  //         // ref={iUpPros}
  //         />
  //       </button>
  //     ))}
  //   </div>
  // }

  // console.log(tags);
  
let tags = [];
for (let i = 0; i < verticalParts; i++) {
  let array = items.filter(item => item.verticalPart === i + 1);
  tags.push(
    <div key={i} className="divItems_VMe">
      {array.map((item, a) => (
        i==0?
        <ItemBtn key={a} item={item}/>
        //   <button
        //   key={a}
        //   className="--styleLessBtn btnItem_VMe"
        //   // onClick={() => handleShowSubMenu(iDownPros, iUpPros, SubMenuPros)}
        // >
        //   <i className="icofont-tasks-alt" />
        //   <span>{item.title}</span>
        //   <i className="icofont-rounded-down down_VMe lastChild_VMe" 
        //   // ref={iDownPros}
        //   />
        //   <i className="icofont-rounded-up up_VMe lastChild_VMe --displayNone" 
        //   // ref={iUpPros}
        //   />
        // </button>
        // 
        // :
        :
         <Link
          className="--styleLessLink linkItem_VMe"
          to="/addProduct"
          onClick={handleBodyScrollShow}
        >
          <i className="icofont-plus-square  " />
          <span>{item.title} </span>
        </Link>
      
      ))}
    </div>
  );
}

console.log(tags);


  const handleShowSubMenu = (iDown, iUp, subMenu) => {
    iDown.current.classList.toggle("--displayNone");
    iUp.current.classList.toggle("--displayNone");
    subMenu.current.classList.toggle("--displayNone");
  };

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

        handleCloseVerticalMenu();

        // sign_THe.current.classList.remove('bgColorSign_THe');
        // showProfileLink_THe.current.classList.add('--displayNone');
      }
    });
  };

  return (
    <div className="cotainerItems_VMe">
      {tags}
      {/* <div className="divItems_VMe ">
        <button
          className="--styleLessBtn btnItem_VMe"
          onClick={() => handleShowSubMenu(iDownPros, iUpPros, SubMenuPros)}
        >
          <i className="icofont-tasks-alt " />
          <span> محصولات </span>
          <i
            className="icofont-rounded-down down_VMe lastChild_VMe"
            ref={iDownPros}
          />
          <i
            className="icofont-rounded-up up_VMe lastChild_VMe --displayNone"
            ref={iUpPros}
          />
        </button>

        <div className="divShowSubMenu_VMe  --displayNone" ref={SubMenuPros}>
          <VerticalSubmenu
            subItems={proAllItems}
          />
        </div>

        <button className="--styleLessBtn btnItem_VMe">
          <i className="icofont-tasks-alt " />
          <span>موبایل</span>
          <i className="icofont-rounded-down lastChild_VMe" />
          <i className="icofont-rounded-up lastChild_VMe --displayNone " />
        </button>
      </div>

      <div className="divItems_VMe ">
        {!user.login ? (
          <>
            <Link
              className="--styleLessLink linkItem_VMe"
              to="signIn"
              onClick={handleBodyScrollShow}
            >
              <i className="icofont-login " />
              <span>ورود</span>
            </Link>

            <Link
              className="--styleLessLink linkItem_VMe"
              to="signUp"
              onClick={handleBodyScrollShow}
            >
              <i className="icofont-ui-user " />
              <span>ثبت نام</span>
            </Link>
          </>
        ) : (
          <>
            <Link
              className="--styleLessLink linkItem_VMe profileLink_VMe"
              to="dashboard"
              onClick={handleBodyScrollShow}
            >
              <i className="icofont-business-man-alt-1 " />
              <span> حساب کاربری </span>
            </Link>

            <button
              className="--styleLessBtn btnItem_VMe signOutBtn_VMe"
              onClick={logout}
            >
              <i className="icofont-sign-out " />
              <span> خروج </span>
            </button>
          </>
        )}
      </div>

      <div className="divItems_VMe ">
        <button className="--styleLessBtn btnItem_VMe">
          <i className="icofont-ebook " />
          <span>راهنمای ثبت سفارش</span>
        </button>
      </div>

      <div className="divItems_VMe ">
        <Link
          className="--styleLessLink linkItem_VMe"
          to="/aboutUs"
          onClick={handleBodyScrollShow}
        >
          <i className="icofont-info-circle " />
          <span>درباره ما</span>
        </Link>

        <Link
          className="--styleLessLink linkItem_VMe"
          to="/contactUs"
          onClick={handleBodyScrollShow}
        >
          <i className="icofont-phone-circle " />
          <span>تماس با ما</span>
        </Link>

        <Link
          className="--styleLessLink linkItem_VMe"
          to="/cooperationUs"
          onClick={handleBodyScrollShow}
        >
          <i className="icofont-handshake-deal " />
          <span>همکاری با ما</span>
        </Link>

        <Link
          className="--styleLessLink linkItem_VMe"
          to="/criticismAndSuggestions"
          onClick={handleBodyScrollShow}
        >
          <i className="icofont-google-talk " />
          <span>انتقاد و پیشنهاد</span>
        </Link>

        <Link
          className="--styleLessLink linkItem_VMe"
          to="/complaint"
          onClick={handleBodyScrollShow}
        >
          <i className="icofont-law-order " />
          <span>شکایت</span>
        </Link>
      </div>

      <div className="divItems_VMe ">
        <Link
          className="--styleLessLink linkItem_VMe"
          to="/addProduct"
          onClick={handleBodyScrollShow}
        >
          <i className="icofont-plus-square  " />
          <span>ثبت محصول ( مدیریت ) </span>
        </Link>

        <Link
          className="--styleLessLink linkItem_VMe"
          to="/showProductsM"
          onClick={handleBodyScrollShow}
        >
          <i className="icofont-eye-alt   " />
          <span>مشاهده محصولات ( مدیریت ) </span>
        </Link>

        <Link
          className="--styleLessLink linkItem_VMe"
          to="/addProSliderM"
          onClick={handleBodyScrollShow}
        >
          <i className="icofont-plus-square   " />
          <span> انتخاب محصولات برای اسلایدرها ( مدیریت ) </span>
        </Link>
      </div> */}
    </div>
  );
};
export default VerticalMenu;


