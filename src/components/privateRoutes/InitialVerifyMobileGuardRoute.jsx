
import { Navigate, Outlet } from 'react-router-dom';

const InitialVerifyMobileGuardRoute = ({ isEffect, fromSignUp }) => {

    /**
     * این شرط تظمین می کند که یوزافکت کانتکس ای پی آی اجرا شده است
     * اجرای کامل یوزافکت کانتکس آنجا به کار می‌آید که کاربر رفرش کند
     */
    if (isEffect) {

        /**
           * فقط در صورتی صفحه مورد نظر قابل نمایش است که کاربر
           * تنها از مسیر ثبت نام و پس وارد کردن موبایل 
           * وارد شود     
        */
        return fromSignUp ? <Outlet /> : <Navigate to='/signUp' replace />;

    }


};


export default InitialVerifyMobileGuardRoute;