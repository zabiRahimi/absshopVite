import localforage from "localforage";
import { useEffect, useRef, useState } from "react";
import { Form, redirect, useLoaderData, useSubmit } from "react-router-dom";
import FormSelect from "react-bootstrap/FormSelect";
import "./addProSliderM.css";
import { Button } from "react-bootstrap";
// import FormCheck from 'react-bootstrap/FormCheck'
import { SimpleHeader } from "../simpleHeader/SimpleHeader";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export async function loader() {
  const products = await localforage.getItem("products");
  // if (!contact) {
  //   throw new Response("", {
  //     status: 404,
  //     statusText: "Not Found",
  //   });
  // }
  return { products };
}

export async function action({ request }) {
  const formData = await request.formData();

  const datas = Object.fromEntries(formData);

  if (!validation(datas)) {
    return redirect(`/addProSliderM`);
  }

  setDatas(datas);
  return redirect("/addProSliderM");
}

const validation = (datas) => {
  let val = true;

  for (const data of Object.keys(datas)) {
    if (!datas[data]) {
      let item;

      switch (data) {
        case "products":
          item = "محصول";
          break;
        case "slider":
          item = "اسلایدر";
          break;
      }

      let element = document.getElementById("containerError_APS");

      element.innerHTML = `<div class='error_APr'>لطفا ${item} را وارد کنید</div>`;

      const offset = element.offsetTop - 20;

      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });

      val = false;

      break;
    }
  }

  return val;
};

const setDatas = async (datas) => {
  const MySwal = withReactContent(Swal);

  let array = await localforage.getItem("proSliderM");
  array = array.filter((item) => item.slider != datas.slider);
  array.push(datas);

  await localforage.setItem("proSliderM", array).then(() => {
    MySwal.fire({
      allowOutsideClick: false,

      html: (
        <div>
          <div className="--mySwalSuccessDiv2">
            <i className="icofont-tick-boxed --mySwalSuccessIcon2" />
          </div>

          <div className="--mySwalDivTitle">
            <h3 className="--mySwalTitle --mySwalColorTitleGreen">
              {" "}
              محصولات اسلایدر با موفقیت ثبت شد.{" "}
              <i className="icofont-simple-smile  " />{" "}
            </h3>
          </div>
        </div>
      ),

      timer: 5000,

      timerProgressBar: true,

      confirmButtonText: "متوجه شدم",

      didClose: () => {
        // document.getElementById("addProduct").reset();

        window.scrollTo(0, 0);
      },

      customClass: {
        popup: "--mySwalPopup",

        timerProgressBar: "--progressBarColorBlue",
      },
    });
  });
};

const AddProSliderM = () => {
  const { products } = useLoaderData();

  let submit = useSubmit();

  const proSelected = useRef(null);

  const [valForm, setValForm] = useState({
    products: [],
    slider: "",
  });

  useEffect(() => {
    // کنترل می‌کند اگر کلید زیر ساخته نشده باشد آن را ایجاد کند
    localforage.getItem("proSliderM").then(function (value) {
      if (value == null) {
        localforage.setItem("proSliderM", []);
      }
    });
  }, []);

  const showProducts = () => {
    const value = products.map((product, i) => {
      return (
        <button
          key={i}
          className="--styleLessBtn btnShowPro_APS"
          data-state="notSelected"
          onClick={(e) => {
            selectPro(e);
            setDataForm(e, "pro", product["id"]);
          }}
        >
          <span className="spanShowChecked_APS ">
            {" "}
            <i className="icofont-check-alt --displayNone iShowChecked_APS " />{" "}
          </span>
          <span className="spanNameProChecked_APS"> {product["name"]} </span>
        </button>
      );
    });

    return products && value;
  };

  const selectPro = (e) => {
    e.currentTarget.children[0].classList.toggle("selectedChecked_APS");

    e.currentTarget.children[0].children[0].classList.toggle("--displayNone");
  };

  const setDataForm = (e, elementType, id = "") => {
    e.preventDefault();

    let element = document.getElementById("containerError_APS");

    element.innerHTML = "";

    if (elementType == "pro") {
      let attribute = e.currentTarget.getAttribute("data-state");

      if (attribute == "notSelected") {
        e.currentTarget.setAttribute("data-state", "selected");
        setValForm((prevState) => ({
          ...prevState,
          products: [...prevState.products, id],
        }));
      } else {
        e.currentTarget.setAttribute("data-state", "notSelected");

        setValForm((prevState) => ({
          ...prevState,
          products: prevState.products.filter((item) => item !== id),
        }));
      }
    } else {
      let value = e.currentTarget.value;

      setValForm((prevState) => ({
        ...prevState,
        slider: value,
      }));
    }
  };

  return (
    <div>
      <SimpleHeader />
      <div className="container_APS">
        <h3 className="h3_Aps"> انتخاب محصول برای اسلایدرها </h3>
      </div>

      <Form
        className="form_APS"
        id="form_APS"
        onSubmit={(event) => {
          event.preventDefault(),
            submit(
              { ...valForm },
              {
                method: "post",
                encType: "application/x-www-form-urlencoded",
              }
            );
        }}
      >
        <div className="containerError_APr" id="containerError_APS"></div>
        <div className="divSeletct_APS">
          <button className="--styleLessBtn btnSelect_APS">
            <i className="icofont-thin-down" />
            <span>انتخاب محصولات</span>
          </button>

          <div className="proSelected_APS" ref={proSelected}></div>

          <div className="showProSelect_APS">{showProducts()}</div>
        </div>
        {/* <FormSelect
          aria-label="Default select example"
          className="formSelect_APS"
        >
          <option> انتخاب محصول </option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </FormSelect> */}
        <FormSelect
          aria-label="Default select example"
          className="formSelect_APS"
          name="slider"
          onChange={(e) => setDataForm(e, "slider")}
        >
          <option value=""> انتخاب اسلایدر </option>
          <option value="1"> اسلایدر پیشنهادها </option>
          <option value="2"> اسلایدر پرفروشها </option>
        </FormSelect>
        <Button variant="success" type="submit" className="btnSubmit_APS">
          ثبت
        </Button>{" "}
      </Form>
    </div>
  );
};
export default AddProSliderM;
