import "./nameProduct.css";

const NameProduct = ({ name, brand }) => {
  return (
    <div className="container_NPr">
      {/* <div className="divName_NPr"> */}
      <h3 className="h3Name_NPr"> {name} </h3>
      {/* </div> */}
      {brand && <div className="divBrand_NPr">{brand}</div>}

      {/* {brand && (
        <div className="divBrand_NPr">
          <span className="spanBrand_NPr"> برند </span>
          <span className="spanBrandName_NPr"> {brand} </span>
        </div>
      )} */}
    </div>
  );
};
export default NameProduct;
