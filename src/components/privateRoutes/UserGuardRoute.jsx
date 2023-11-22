
// import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// import UserContext from './contexts/UserContext';

const UserGuardRoute = ({ backPath, isLogin, isEffect, requiresLogin = true }) => {

    // const { user } = useContext(UserContext);

    // let login;

    // if (user.login) {

    //     login = user.login;



    // }
    // else {


    //     /**
    //      * هنگامی که کاربر صفحه را رفرش می کند تمامی مقادیر متغیرهای کانتکس پاک می شود و یا
    //      * مقادیر پیش فرض را بر می گرداند، برای رفع این مشکل علاوه بر کانتکس برخی از مقادیر 
    //      * را در سشن استوریج ذخیره می کنیم، کد زیر نیز اینکار را انجام می دهد به این صورت که
    //      *  اگر کاربر لاگین کرده باشد تا موقعه ای که از حساب کاربری خارج نشده باشد و یا تب مرورگر 
    //      * بسته نشده باشد با رفرش کردن صفحه اطلاعات از سشن بازخوانی می شود
    //      */
    //     const data = sessionStorage.getItem('userData');

    //     const objData = JSON.parse(data);

    //     login = objData ? objData.login : false;

    // }

    /**
     * شرط زیر کنترل می‌کند که یوزافکت در کانتکس کامل اجرا شده است
     */
    if (isEffect) {

        /**
     * اگر کاربر لاگین نکرده باشد، نمی تواند وارد برخی از صفحات مانند داشبورد شود
     * اگر کاربر لاگین کرده باشد، نمی تواند وارد برخی از صفحات مانند ثبت نام و ورود شود
     * شرط زیر دو مورد بالا را بررسی می کند و بسته به شرایط و روت های صفحات یکی از دو شرط زیر را بر
     * می گرداند
     */

        if (requiresLogin) {
            return isLogin ? <Outlet /> : <Navigate to={`/${backPath}`} replace />;

        } else {
            return !isLogin ? <Outlet /> : <Navigate to={`/${backPath}`} replace />;

        }

    }


};


export default UserGuardRoute;