const NameProduct = ({ name = 'موبایل', brand = 'شیامی' }) => {


    return (
        <div>
            <div>

                <span> {name} </span>

            </div>

            {

                brand &&

                <div>

                    <span> برند :  </span>
                    <span> {brand} </span>

                </div>

            }
        </div>
    );
}
export default NameProduct;