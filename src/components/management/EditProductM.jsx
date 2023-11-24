import { Form, redirect, useLoaderData } from "react-router-dom";
import { SimpleHeader } from "../simpleHeader/SimpleHeader";
import "./editProductM.css";
import { Button } from "react-bootstrap";
import localforage from "localforage";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export async function loader({ params }) {
  let product;

  await localforage.getItem("products").then(function (value) {
    product = value.find((obj) => obj.id == params.productId);
  });

  if (!product) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }

  return { product };
}

export async function action({ request, params }) {
  const formData = await request.formData();

  const id = params.productId;

  const datas = Object.fromEntries(formData);
  datas.id = id;

  if (!validation(datas)) {
    return redirect(`/editProductM/${id}`);
  }

  if (await duplicateProduct(datas.name, id)) {
    return redirect(`/editProductM/${id}`);
  }

  editDatas(datas, id);
  return redirect(`/editProductM/${id}`);
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

      let element = document.getElementById("containerError_EPr");

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
const duplicateProduct = async (name, id) => {
  let result;

  await localforage.getItem("products").then(function (value) {
    result = value.find((obj) => obj.name === name && obj.id != id);
  });

  if (result) {
    let element = document.getElementById("containerError_EPr");

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

const editDatas = async (datas, id) => {
  const MySwal = withReactContent(Swal);

  let val = await localforage.getItem("products");

  //   val = val.filter((item) => item.id != id);
  let index = val.findIndex((item) => item.id == id);

  val.splice(index, 1, datas);

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
              محصول با موفقیت ویرایش شد.{" "}
              <i className="icofont-simple-smile  " />
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

  // val.push(datas);
  // localforage.setItem("products", datas);
};

//   _______________________________________________________
const EditProductM = () => {
  const { product } = useLoaderData();

  // پاک کردن متن خطا پس از اینکه کاربر در داخل یکی از گزینه ها شروع به نوشتن کرد
  const deleteError = () => {
    let element = document.getElementById("containerError_EPr");

    element.innerHTML = "";
  };

  return (
    <div>
      <SimpleHeader />

      <div>
        <h3 className="h3_1APr"> ویرایش محصول </h3>

        <Form method="post" id="editProduct" className="addProduct_APr">
          <div className="containerError_APr" id="containerError_EPr"></div>
          <p>
            <span>نام محصول</span>
            <input
              placeholder="نام محصول"
              aria-label="name"
              type="text"
              name="name"
              onInput={deleteError}
              defaultValue={product.name}
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
              defaultValue={product.price}
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
              defaultValue={product.priceOff}
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
              defaultValue={product.img}
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
              defaultValue={product.dis}
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
              defaultValue={product.brand}
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
              defaultValue={product.shop}
            />
          </p>

          <Button variant="success" type="submit">
            ویرایش
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default EditProductM;
