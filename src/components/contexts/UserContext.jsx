
import { createContext, useEffect, useState } from "react";


const UserContext = createContext();

export const useUserContext = () => {

    // برای کنترل کردن اجرای کامل یوزافکت، کاربرد در گارد روت
    const [isEffect, setIsEffect] = useState(false)

    const [user, setUser] = useState({

        login: false,
        name: '',
        email: '',

    });

    useEffect(() => {

        if (!user.login) {

            const data = sessionStorage.getItem('userData');
            const objData = JSON.parse(data);
            objData && setUser(prve => ({ ...prve, ...objData }));

        }

        setIsEffect(true);

    }, [user.login]);


    return {

        user,
        setUser,
        isEffect

    };

}

export default UserContext;