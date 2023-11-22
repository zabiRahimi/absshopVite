
import { createContext, useEffect, useState } from "react";

const InitialVerifyMobileContext = createContext();

export const useInitialVerifyMobileContext = () => {

    // برای کنترل کردن اجرای کامل یوزافکت، کاربرد در گارد روت
    const [isEffect, setIsEffect] = useState(false)

    const [signUpData, setSignUpData] = useState({

        fromSignUp: false,
        mobile: '',

    });


    useEffect(() => {

        /**
         * چون هنگام رفرش کردن برنامه اطلاعات کانتکس پاک می‌شود، برای ذخیره اطلاعات
         * و بازآوری آن از سشن استوریج استفاده می‌کنیم
         * در این افکت چک می‌کنیم هنگامی که کاربر رفرش کرد آیا هیچ جلسه‌ای
         * وجود دارد یا نه و در صورت وجود کانتکس را به روزرسانی می‌کنیم
         */
        if (!signUpData.fromSignUp) {//چک کردن عدم کانتکس به روزنشانی شده

            const data = sessionStorage.getItem('signUpData');
            const objData = JSON.parse(data);
            objData && setSignUpData(objData);//چک کردن وجود جلسه و به روزرسانی کانتکس

        }

        setIsEffect(true);

    }, [signUpData.fromSignUp]);


    return {

        signUpData,
        setSignUpData,
        isEffect

    };

}

export default InitialVerifyMobileContext;