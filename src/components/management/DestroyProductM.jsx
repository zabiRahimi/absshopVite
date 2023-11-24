import localforage from "localforage";
import { redirect } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export async function action({ params }) {
  //   throw new Error("oh dang!");
  //   await deleteProduct(params.productId);
  await deleteProduct(params.productId);

  return redirect("/showProductsM");
}

async function deleteProduct(id) {
  let products = await localforage.getItem("products");

  let index = products.findIndex((product) => product.id == id);

  if (index > -1) {
    products.splice(index, 1);

    await setDatas(products);

    return true;
  }

  return false;
}

const setDatas = async (datas) => {
  const MySwal = withReactContent(Swal);

  // if (Array.isArray(val)) {
  //   datas.id = val.length + 1; // اضافه کردن آی‌دی به شی

  //   val.push(datas);
  // }

  await localforage.setItem("products", datas).then(() => {
    MySwal.fire({
      allowOutsideClick: false,

      html: (
        <div>
          <div className="--mySwalSuccessDiv2">
            <i className="icofont-tick-boxed --mySwalSuccessIcon2" />
          </div>

          <div className="--mySwalDivTitle">
            <h3 className="--mySwalTitle --mySwalColorTitleGreen">
              محصول با موفقیت حذف شد. <i className="icofont-simple-smile  " />
            </h3>
          </div>
        </div>
      ),

      timer: 5000,

      timerProgressBar: true,

      confirmButtonText: "متوجه شدم",

      didClose: () => {
        // document.getElementById("addProduct").reset();
        // window.scrollTo(0, 0);
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
