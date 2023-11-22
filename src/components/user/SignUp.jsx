import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// import useMethodsFormUser from '../hooks/useMethodsFormUser';
import Input from '../form/Input';
import { SimpleHeader } from '../simpleHeader/SimpleHeader';
import TitleForm from '../form/TitleForm';
import './signUp.css';
import '../form/form.css';
// import CryptoJS from 'crypto-js';
import InitialVerifyMobileContext from '../contexts/InitialVerifyMobileContext';

const SignUp = () => {

    const navigate = useNavigate();

    const { signUpData, setSignUpData } = useContext(InitialVerifyMobileContext);

    const MySwal = withReactContent(Swal);

    const mobile = useRef(null);
    const btnSubmit = useRef(null);

    const [mobileValue, setMobileValue] = useState(signUpData.mobile);

    useEffect(() => {

        /**
         * کاربرد دارد زمانی که کاربر از صفحه تایید موبایل برای
         * اصلاح و تغییر موبایل اقدام می‌کند.
         */
        // signUpData.mobile && setMobileValue(signUpData.mobile);
        console.log(signUpData.mobile);
        console.log(`mobileValue = ${mobileValue}`);

    }, [mobileValue]);




    useEffect(() => {

        const onBlur = (e) => {

            let valueInput = e.target.value;

            if (valueInput) {

                valueInput = checkFirstCharIsZero(valueInput);
                mobileValidation(valueInput);

            }

        }

        // const handleSetMobileOrUserName = (val) => {
        //     const firstChar = val[0];

        //     const checkMobile = /^[0-9]+$/;
        //     const checkUserName = /^[a-zA-Z_]+$/;

        //     if (checkMobile.test(firstChar)) {

        //         setModeUserName('mobile');
        //         return 'mobile';

        //     } else if (checkUserName.test(firstChar) && firstChar) {

        //         setModeUserName('mobile');
        //         return 'mobile'

        //     }


        // }


        /**
        * چنانچه کاربر صفر ابتدایی شماره موبایل را نگذاشته باشد این متد صفر را اضافه می کند
        * checks the first char mobile is zero
        * @param id 
        * @param value 
        */
        const checkFirstCharIsZero = (val) => {

            return val[0] == 0 ? val : 0 + val;

        }


        const mobileValidation = (vla) => {

            const regex = /^09\d{9}$/;
            const check = regex.test(vla);

            if (check) {

                mobile.current.trueStyle();

                return true;

            } else {

                mobile.current.errorStyle();

                return false;
            }

        }


        // const mobileValidation = (val) => {

        //     // const regex = /^(?=.*[a-zA-Z_])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9_]{4,}$/;

        //     const regex = /^(?=.*[a-zA-Z_])[a-zA-Z0-9_]{4,}$/;
        //     const check = regex.test(val);

        //     if (check) {

        //         mobile.current.trueStyle();

        //         return true;

        //     } else {

        //         mobile.current.errorStyle();

        //         return false;
        //     }

        // }


        const input = mobile.current.getInput();

        input.addEventListener('blur', onBlur);

        return () => {
            input.removeEventListener('blur', onBlur);
        }

    }, []);


    const handleSubmit = () => {
        // تکمیل هنگام توسعه سرور
        // به صورت موقتی مقدار دهی شده است

        saveDataToContext({
            fromSignUp: true,
            mobile: '09178023733',
        }).then(

            navigate('/initialVerifyMobile'),

            MySwal.fire({

                html: <div >
                    <div className='--mySwalSuccessDiv2'>
                        <i className='icofont-tick-boxed   --mySwalSuccessIcon2 ' />
                    </div>
                    <p className='--mySwalColorTitleGreen --centerText'> کد تایید به شماره‌ موبایلی که ثبت کردید ارسال شد، لطفا کد را وارد کنید. </p>
                </div>,

                confirmButtonText: 'متوجه شدم',

                customClass: {

                    popup: '--mySwalPopup',
                    htmlContainer: '--mySwalHtml',

                }

            })
        );

    }


    /**
     * 
     * @param {object} signUpData 
     * @returns 
     */
    const saveDataToContext = (signUpData) => {

        return new Promise((resolve, reject) => {

            setSignUpData(signUpData);

            try {

                sessionStorage.setItem('signUpData', JSON.stringify(signUpData));

                resolve();

            } catch (error) {

                reject('Failed to save data to localStorage');

            }
        })
    }



    return (
        <>
            <SimpleHeader />

            <form className='form' >

                <TitleForm title='ثبت نام' />

                <div className='errorAllContiner errorAll --displayNone' id='errorAll'>

                    <p> خطایی رخ داده است. لطفا دوباره تلاش کنید. </p>

                </div>

                <Input type='text' id='mobile_SU' name='mobile' value={mobileValue} ref={mobile} label='موبایل' direction='ltr' required={true} error={' موبایل را صحیح وارد کنید.'} />

                <input type="button" ref={btnSubmit} className='btnForm' value='ثبت' onClick={handleSubmit} />

                <div className='divBtnGetBtn_SI' >

                    <p> قبلا <button type='button' className='--styleLessBtn btnGetBtn_SI ' onClick={() => navigate('/signIn')}> ثبت نام </button> کرده‌ام . </p>

                </div>

            </form>
        </>
    );

}

export default SignUp;