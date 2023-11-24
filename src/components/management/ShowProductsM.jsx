import localforage from "localforage";
import { SimpleHeader } from "../simpleHeader/SimpleHeader";
import "./showProductsM.css";
import { Form, Link, useLoaderData } from "react-router-dom";

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

const ShowProductsM = () => {
  const { products } = useLoaderData();

  const showProducts = () => {
    return products.map((pro, i) => {
      return (
        <div key={i} className="row_ShP">
          <div className="divName">{pro.name}</div>
          <div className="divPrice">{pro.price}</div>
          <div className="divImg">
            <img src={`/src/assets/images/products/${pro.img}`} alt="" />
          </div>
          <div className="divEdit">
            {" "}
            <Link to={`/editProductM/${pro.id}`} className="--styleLessLink ">
              <i className="icofont-edit-alt iEdit_Shp" />
            </Link>{" "}
          </div>
          <div className="divDel">
            <Form
              method="post"
              action={`/destroyProductM/${pro.id}`}
              onSubmit={(event) => {
                if (
                  !confirm("Please confirm you want to delete this record.")
                ) {
                  event.preventDefault();
                }
              }}
            >
              <button type="submit" className="--styleLessBtn">
                {" "}
                <i className="icofont-bin iDel_ShP" />
              </button>
            </Form>
            {/* <Link to={`/destroyProductM/${pro.id}`} className="--styleLessLink">
              <i className="icofont-bin iDel_ShP" />
            </Link> */}
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <SimpleHeader />
      <div className="containerRow_ShP">{showProducts()}</div>
    </div>
  );
};
export default ShowProductsM;
