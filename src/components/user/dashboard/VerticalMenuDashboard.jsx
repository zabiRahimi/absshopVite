
import { Link } from 'react-router-dom';
import './verticalMenuDashboard.css';

const VerticalMenuDashboard = ({ handleBodyScrollShow, handleCloseVerticalMenu }) => {


    return (
        <div className='cotainerItems_VMD'>

            <div className='divItems_VMD' >

                <button className='--styleLessBtn btnItem_VMD' >

                    <i className='icofont-cart iCart_VMD ' />
                    <span> سبد خرید </span>
                    <span className='showNum_VMD'>12</span>

                </button>

                <Link className='--styleLessLink linkItem_VMD' to='/dashboard/orderInProcess' onClick={handleCloseVerticalMenu} >

                    <i className='icofont-vehicle-delivery-van vanSend_VMD  ' />
                    <span> خریدهای در حال ارسال </span>
                    <span className='showNum_VMD'>3</span>

                </Link>

                <Link className='--styleLessLink linkItem_VMD' to='/dashboard/purchasesReceived' onClick={handleCloseVerticalMenu} >

                    <i className='icofont-dart   ' />
                    <span> خریدهای دریافت شده </span>
                    <span className='showNum_VMD'>8</span>

                </Link>

                <Link className='--styleLessLink linkItem_VMD' to='/dashboard/returnPurchases' onClick={handleCloseVerticalMenu} >

                    <div className='divCreateIcon_VMD'>

                        <i className='icofont-truck-alt iTruckBack_VMD  iconOne_VMD' />
                        <i className='icofont-redo  iconTwo_VMD' />

                    </div>
                    <span> مرجوعی‌ها </span>
                    <span className='showNum_VMD'>2</span>

                </Link>

            </div>

            <div className='divItems_VMD' >

                <Link className='--styleLessLink linkItem_VMD' to='/dashboard/shopMessages' onClick={handleCloseVerticalMenu} >

                    <div className='divCreateIcon_VMD'>

                        <i className='icofont-chat iconOne_VMD' />
                        <i className='icofont-safety iconTwo_VMD' />

                    </div>
                    <span> پیام‌های فروشگاه </span>
                    <span className='showNum_VMD'>2</span>

                </Link>

                <Link className='--styleLessLink linkItem_VMD' to='/dashboard/ShopWarnings' onClick={handleCloseVerticalMenu} >

                    <i className='icofont-alarm ' />
                    <span> هشدارهای فروشگاه </span>
                    <span className='showNum_VMD'>2</span>

                </Link>

                <Link className='--styleLessLink linkItem_VMD' to='/dashboard/usersMessages' onClick={handleCloseVerticalMenu} >

                    <div className='divCreateIcon_VMD'>

                        <i className='icofont-chat iconOne_VMD' />
                        <i className='icofont-user-alt-3  iconTwo_VMD ' />

                    </div>
                    <span> پیام‌های کاربران </span>
                    <span className='showNum_VMD'>2</span>

                </Link>

            </div>

            <div className='divItems_VMD' >

                <Link className='--styleLessLink linkItem_VMD' to='/dashboard/myVisits' onClick={handleCloseVerticalMenu} >

                    <i className='icofont-search-user ' />
                    <span> بازدیدها </span>
                    <span className='showNum_VMD'>2</span>

                </Link>

                <Link className='--styleLessLink linkItem_VMD' to='/dashboard/myFavorites' onClick={handleCloseVerticalMenu} >

                    <i className='icofont-ui-love   ' />
                    <span> علاقمندی‌ها </span>
                    <span className='showNum_VMD'>2</span>

                </Link>

                <Link className='--styleLessLink linkItem_VMD' to='/dashboard/myComments' onClick={handleCloseVerticalMenu} >

                    <i className='icofont-ui-text-chat  ' />
                    <span> نظرات </span>
                    <span className='showNum_VMD'>2</span>

                </Link>

            </div>

            <div className='divItems_VMD' >

                <Link className='--styleLessLink linkItem_VMD' to='/dashboard/myScores' onClick={handleCloseVerticalMenu}>

                    <i className='icofont-ui-rating ' />
                    <span> امتیازها </span>

                </Link>

            </div>

            <div className='divItems_VMD' >

                <button className='--styleLessBtn btnItem_VMD' >

                    <i className='icofont-page ' />
                    <span> مشاهده و ویرایش اطلاعات </span>

                </button>

                <button className='--styleLessBtn btnItem_VMD' >

                    <i className='icofont-refresh ' />
                    <span> تغییر رمزعبور </span>

                </button>
            </div>

            <div className='divItems_VMD' >

                <button className='--styleLessBtn btnItem_VMD' >

                    <i className='icofont-dollar-plus  ' />
                    <span> کسب درآمد با ما </span>


                </button>

            </div>

            <div className='divItems_VMD' >

                <button className='--styleLessBtn btnItem_VMD' >

                    <i className='icofont-close  ' />
                    <span> حذف حساب کاربری </span>


                </button>

            </div>


        </div>
    );
}
export default VerticalMenuDashboard;