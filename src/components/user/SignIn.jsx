
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useMethodsFormUser from '../hooks/useMethodsFormUser';
import Input from '../form/Input';
import { SimpleHeader } from '../simpleHeader/SimpleHeader';
import TitleForm from '../form/TitleForm';
import './signIn.css';
import '../form/form.css';
import UserContext from '../contexts/UserContext';


const SignIn = () => {

    const { setUser } = useContext(UserContext);

    const MySwal = withReactContent(Swal);

    const userName = useRef(null);
    const password = useRef(null);
    const btnSignIn = useRef(null);
    const btnGetMessage = useRef(null);
    const textPasswordInput = useRef(null);
    const textGetMassage = useRef(null);
    const textForgetPass = useRef(null);

    const [element, setElement] = useState({

        mobile: '',

    });


    /**
     * modeUserName = mobile or userName
     */
    const [modeUserName, setModeUserName] = useState('');


    /**
     * show or not show the password input
     */
    const [showInputPas, setShowInputPas] = useState(true);


    /**
     * To retrieve the password component reference when the user clicks on the Forgot Password 
     * option and then clicks on the Use Password option
     */
    const [inputKey, setInputKey] = useState(0);


    const navigate = useNavigate();


    useEffect(() => {

        const checkCharUserName = (e) => {

            let value = e.target.value;

            const alphanumericRegex = /^[a-zA-Z0-9_]+$/;
            const bool = alphanumericRegex.test(e.target.value);

            if (!bool && value) {

                MySwal.fire({

                    html: <div className='zabiS'>

                        <div className='--mySwalWarningDiv'>
                            <i className='icofont-exclamation --mySwalWarningIcon' />
                        </div>

                        <div className='--mySwalDivTitle'>

                            <h3 className='--mySwalTitle --mySwalColorTitleOrange'> هشدار </h3>

                        </div>

                        <ul className='--mySwalUl --mySwalColorWarning'>

                            <li> شما می‌توانید از موبایل یا نام‌کاربری استفاده کنید. </li>

                            <li> دقت کنید، نام‌کاربری فقط شامل اعداد و حروف انگلیسی و علامت ( _ ) می‌باشد. </li>

                            <li> نام‌کاربری فقط با حروف و یا علامت ( _ ) شروع می‌شود. </li>

                        </ul>
                    </div>,

                    confirmButtonText: 'متوجه شدم',

                    customClass: {

                        popup: '--mySwalPopup',
                        htmlContainer: '--mySwalHtml',

                    }

                })

            }
        }

        const input = userName.current.getInput();

        input.addEventListener('input', checkCharUserName);

        return () => {
            input.removeEventListener('input', checkCharUserName);
        };

    }, []);


    useEffect(() => {

        const onBlur = (e) => {

            let valueInput = e.target.value;

            if (valueInput) {

                const mode = handleSetMobileOrUserName(valueInput);

                if (mode === 'mobile') {

                    valueInput = checkFirstCharIsZero(valueInput);
                    mobileValidation(valueInput);

                } else {

                    userNameValidation(valueInput);

                }

            }

        }

        const handleSetMobileOrUserName = (val) => {
            const firstChar = val[0];

            const checkMobile = /^[0-9]+$/;
            const checkUserName = /^[a-zA-Z_]+$/;

            if (checkMobile.test(firstChar)) {

                setModeUserName('mobile');
                return 'mobile';

            } else if (checkUserName.test(firstChar) && firstChar) {

                setModeUserName('userName');
                return 'userName'

            }


        }


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

                userName.current.trueStyle();

                return true;

            } else {

                userName.current.errorStyle();

                return false;
            }

        }


        const userNameValidation = (val) => {

            // const regex = /^(?=.*[a-zA-Z_])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9_]{4,}$/;

            const regex = /^(?=.*[a-zA-Z_])[a-zA-Z0-9_]{4,}$/;
            const check = regex.test(val);

            if (check) {

                userName.current.trueStyle();

                return true;

            } else {

                userName.current.errorStyle();

                return false;
            }

        }


        const input = userName.current.getInput();

        input.addEventListener('blur', onBlur);

        return () => {
            input.removeEventListener('blur', onBlur);
        }

    }, []);


    useEffect(() => {

        const onBlur = (e) => {

            let valueInput = e.target.value;

            if (valueInput) {

                passwordValidation(valueInput)
            }
        }

        const passwordValidation = (val) => {

            const regex = /^(?=.*[a-zA-Z_0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9_]{4,}$/;
            const check = regex.test(val);

            if (check) {

                password.current.trueStyle();

                return true;

            } else {

                password.current.errorStyle();

                return false;
            }

        }


        const input = password.current.getInput();

        input.addEventListener('blur', onBlur);

        return () => {

            input.removeEventListener('blur', onBlur);

        }

    }, [inputKey]);


    // const { changeCaptcha, handleCheckValue, backStyle, ChangeStyle, setValue, errorSubmit } = useMethodsFormUser(path, element, setElement,true);

    const { changeCaptcha, handleCheckValue, backStyle, ChangeStyle, setValue, errorSubmit } = useMethodsFormUser('path', element, setElement, true);


    const showBtnGetMessage = () => {

        setShowInputPas(false);

        btnGetMessage.current.classList.toggle('--displayNone');

        btnSignIn.current.classList.toggle('--displayNone');

        textGetMassage.current.classList.toggle('--displayNone');

        textPasswordInput.current.classList.toggle('--displayNone');

        textForgetPass.current.classList.remove('--displayNone');

    }


    const showBtnSignIn = () => {

        setShowInputPas(true);

        btnGetMessage.current.classList.toggle('--displayNone');

        btnSignIn.current.classList.toggle('--displayNone');

        textGetMassage.current.classList.toggle('--displayNone');

        textPasswordInput.current.classList.toggle('--displayNone');

        textForgetPass.current.classList.remove('--displayNone');

        setInputKey(prevKey => prevKey + 1);


    }


    const forgetPass = () => {

        setShowInputPas(false);

        btnGetMessage.current.classList.remove('--displayNone');

        btnSignIn.current.classList.add('--displayNone');

        textGetMassage.current.classList.add('--displayNone');

        textPasswordInput.current.classList.remove('--displayNone');

        textForgetPass.current.classList.add('--displayNone');

    }

    /**
     * ارسال فرم زمانی که کاربر با نام کاربری و رمز عبور وارد می شود
     * @param {*} e 
     */
    const handleSubmitPassword = (e) => {
        e.preventDefault();
        /**
         * تکمیل کد هنگام توسعه سمت سرور انجام گیرد،
         */


        // navigate('/profile')

        MySwal.fire({

            allowOutsideClick: false,

            showConfirmButton: false,

            html: <div >

                <div className='--mySwalSuccessDiv1'>

                    <i className='icofont-tick-mark --mySwalSuccessIcon1' />

                </div>

                <div className='--mySwalDivTitle'>

                    <h3 className='--mySwalTitle --mySwalColorTitleGreen'>خوش آمدید <i className='icofont-simple-smile  ' /> </h3>

                </div>

                <div className='--mySwalContainerBtn'>

                    <button className='--styleLessBtn --mySwalBtn' onClick={() => (setData(), Swal.close(), navigate('/dashboard'))}>

                        <i className='icofont-user-alt-3 ' />
                        <span> حساب کاربری </span>

                    </button>

                    <button className='--styleLessBtn --mySwalBtn' onClick={() => (setData(), Swal.close(), navigate(-1))}>

                        <i className='icofont-redo ' />
                        <span> صحفه قبلی </span>

                    </button>

                    <button className='--styleLessBtn --mySwalBtn' onClick={() => (setData(), Swal.close(), navigate('/'))}>

                        <i className='icofont-home ' />
                        <span> خانه </span>

                    </button>

                </div>

            </div>,

            customClass: {

                popup: '--mySwalPopup',
                htmlContainer: '--mySwalHtml',


            }

        })

    }


    const setData = () => {

        // هنگام توسعه سرور باید اطلاعات کاربر از دیتابیس گرفته شود 

        setUser(prve => ({ ...prve, login: true, name: 'Reza' }));

        // فرض می کنیم کاربر به درستی وارد شده و لاگین کرده

        const data = JSON.stringify({ login: true, name: 'reza', email: 'zabi@zabi.com' })
        sessionStorage.setItem('userData', data);
    }


    /**
     * برای زمانی که کاربر بجای رمز عبور خواهان دریافت کد تایید می باشد
     * @param {*} e 
     */
    const handleSubmitGetCode = (e) => {

        e.preventDefault();

    }


    return (
        <>

            <SimpleHeader />

            <form className='form' >

                <TitleForm title='ورود' />

                <div className='errorAllContiner errorAll --displayNone' id='errorAll'>

                    <p> خطایی رخ داده است. لطفا دوباره تلاش کنید. </p>

                </div>

                <Input type='text' id='userName_SI' name='userName' ref={userName} label='نام کاربری یا موبایل' direction='ltr' required={true} error={' نام کاربری یا موبایل صحیح نمی باشد.'} />

                {showInputPas && <Input type='password' key={inputKey} id='password_SI' ref={password} name='password' label='رمز عبور' direction='ltr' required={true} error={' رمز عبور صحیح نمی باشد'} />}


                <input type="button" onClick={handleSubmitPassword} className='btnForm' id="" value='ورود' ref={btnSignIn} />

                <input type="button" onClick={handleSubmitGetCode} className='btnForm --displayNone' id="" value='دریافت کد' ref={btnGetMessage} />


                <div className='divBtnGetBtn_SI' ref={textGetMassage}>

                    <p> مایل هستم بجای وارد کردن رمزعبور از طریق <button type='button' className='--styleLessBtn btnGetBtn_SI ' onClick={showBtnGetMessage}> پیامک کد تایید </button > دریافت کنم.</p>

                </div>


                <div className='divBtnGetBtn_SI --displayNone' ref={textPasswordInput}>

                    <p> مایل هستم با <button type='button' className="--styleLessBtn btnGetBtn_SI" onClick={showBtnSignIn}> رمز ورود </button> وارد شوم. </p>

                </div>


                <div className='divBtnGetBtn_SI' ref={textForgetPass}>

                    <p> رمزعبور را <button type='button' className='--styleLessBtn btnGetBtn_SI ' onClick={forgetPass}> فراموش کرده‌ام. </button> </p>

                </div>


                <div className='divBtnGetBtn_SI' >

                    <p> هنوز <button type='button' className='--styleLessBtn btnGetBtn_SI ' onClick={() => navigate('/signUp')}> ثبت نام </button> نکرده‌ام . </p>

                </div>

            </form>

        </>

    );
}


export default SignIn;
