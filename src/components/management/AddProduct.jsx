import { Form, redirect } from "react-router-dom";
import { SimpleHeader } from "../simpleHeader/SimpleHeader";
import "./addProduct.css";
import { Button } from "react-bootstrap";
import localforage from "localforage";
import { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export async function action({ request }) {
  const formData = await request.formData();

  const datas = Object.fromEntries(formData);

  if (!validation(datas)) {
    return redirect(`/addProduct`);
  }

  if (await duplicateProduct(datas.name)) {
    return redirect(`/addProduct`);
  }

  setDatas(datas);

  return redirect(`/addProduct`);
}

const validation = (datas) => {
  let val = true;

  for (const data of Object.keys(datas)) {
    if (!datas[data] && data != "priceOff") {
      let item;

      switch (data) {
        case "name":
          item = "نام";
          break;
        case "price":
          item = "قیمت";
          break;
        case "img":
          item = "عکس";
          break;
        case "dis":
          item = "توضیح";
          break;
        case "brand":
          item = "برند";
          break;
        case "shop":
          item = "فروشگاه";
          break;
      }

      let element = document.getElementById("containerError_APr");

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

/**
 * چک می کند محصول تکراری نباشد
 */
const duplicateProduct = async (name) => {
  let result;

  await localforage.getItem("products").then(function (value) {
    result = value.find((obj) => obj.name === name);
  });

  if (result) {
    let element = document.getElementById("containerError_APr");

    element.innerHTML = `<div class='error_APr'> نام محصول تکراری است </div>`;

    const offset = element.offsetTop - 20;
    window.scrollTo({
      top: offset,
      behavior: "smooth",
    });

    return true;
  }

  return false;
};

const setDatas = async (datas) => {
  const MySwal = withReactContent(Swal);

  let val = await localforage.getItem("products");

  if (Array.isArray(val)) {
    let id = await createId();

    datas.id = id; // اضافه کردن آی‌دی به شی

    val.push(datas);
  }

  await localforage.setItem("products", val).then(() => {
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
              محصول با موفقیت ثبت شد. <i className="icofont-simple-smile  " />{" "}
            </h3>
          </div>
        </div>
      ),

      timer: 5000,

      timerProgressBar: true,

      confirmButtonText: "متوجه شدم",

      didClose: () => {
        document.getElementById("addProduct").reset();

        window.scrollTo(0, 0);
      },

      customClass: {
        popup: "--mySwalPopup",

        timerProgressBar: "--progressBarColorBlue",
      },
    });
  });
};

const createId = async () => {
  let id;

  await localforage.getItem("keepIdProduct").then((value) => {
    id = value + 1;
  });

  await localforage.setItem("keepIdProduct", id);

  return id;
};

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

const AddProduct = () => {
  useEffect(() => {
    // کنترل می‌کند اگر کلید زیر ساخته نشده باشد آن را ایجاد کند
    localforage.getItem("products").then(function (value) {
      if (value == null) {
        localforage.setItem("products", []);
      }
    });

    localforage.getItem("keepIdProduct").then((value) => {
      if (value == null) {
        localforage.setItem("keepIdProduct", 1);
      }
    });
  }, []);

  // پاک کردن متن خطا پس از اینکه کاربر در داخل یکی از گزینه ها شروع به نوشتن کرد
  const deleteError = () => {
    let element = document.getElementById("containerError_APr");

    element.innerHTML = "";
  };

  return (
    <div>
      <SimpleHeader />
      <div>
        <h3 className="h3_1APr"> اضافه کردن محصول </h3>

        <Form method="post" id="addProduct" className="addProduct_APr">
          <div className="containerError_APr" id="containerError_APr"></div>
          <p>
            <span>نام محصول</span>
            <input
              placeholder="نام محصول"
              aria-label="name"
              type="text"
              name="name"
              onInput={deleteError}
            />
          </p>

          <p>
            <span>قیمت</span>
            <input
              placeholder="قیمت"
              aria-label="price"
              type="text"
              name="price"
              onInput={deleteError}
            />
          </p>

          <p>
            <span>قیمت تخفیف</span>
            <input
              placeholder="قیمت تخفیف"
              aria-label="priceOff"
              type="text"
              name="priceOff"
              onInput={deleteError}
            />
          </p>

          <p>
            <span>عکس </span>

            <input
              placeholder="عکس"
              aria-label="img"
              type="text"
              name="img"
              onInput={deleteError}
            />
          </p>

          <p>
            <span>توضیح </span>
            <textarea
              rows="6"
              placeholder="توضیح"
              aria-label="dis"
              name="dis"
              onInput={deleteError}
            ></textarea>
          </p>

          <p>
            <span>برند </span>
            <input
              placeholder="برند"
              aria-label="brand"
              type="text"
              name="brand"
              onInput={deleteError}
            />
          </p>

          <p>
            <span>فروشگاه</span>
            <input
              placeholder="فروشگاه"
              aria-label="shop"
              type="text"
              name="shop"
              onInput={deleteError}
            />
          </p>

          <Button variant="success" type="submit">
            ذخیره
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default AddProduct;
