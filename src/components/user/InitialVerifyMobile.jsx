import React, { useState, useEffect, useContext, useRef } from 'react';
import InitialVerifyMobileContext from '../contexts/InitialVerifyMobileContext';
import { useNavigate } from 'react-router-dom';
import TitleForm from '../form/TitleForm';
import useInputNumberCode from '../hooks/useInputNumberCode';
import { SimpleHeader } from '../simpleHeader/SimpleHeader';
import './initialVerifyMobile.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import UserContext from '../contexts/UserContext';

// import { Link } from "react-router-dom";
// import withReactContent from 'sweetalert2-react-content';
// import useTitleForm from '../hooks/useTitleForm';

// import useMethodsFormUser from '../hooks/useMethodsFormUser';
// import { useLocation, useNavigate } from 'react-router';
// import useInputNumberCode from '../hooks/useInputNumberCode';
// import { isEmpty } from 'lodash';
// از این متد برای احراز موبایل کاربر در ثبت اولیه استفاده می شود
export default function InitialVerifyMobile(props) {

    const navigate = useNavigate();

    const MySwal = withReactContent(Swal);


    const { signUpData, setSignUpData } = useContext(InitialVerifyMobileContext);
    const { setUser } = useContext(UserContext);

    const updateCodeMo = useRef(null);
    const textMinute = useRef(null);

    const [codeInput, setCodeInput] = useState(null);
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(2)
    const [mobile, setMobile] = useState('');

    const { input, setError } = useInputNumberCode(setCodeInput, codeInput, 5, 'کد تایید ');

    // کارایی و بهینه بودن این افکت بررسی شود
    useEffect(() => {


        const token = setTimeout(updateTime, 1000);

        showLink();

        return function cleanUp() {

            clearTimeout(token);

        }

    })


    function updateTime() {

        if (minutes == 0 && seconds == 0) { }

        else {

            if (seconds == 0) {

                setMinutes(minutes => minutes - 1);
                setSeconds(59);

            } else {

                setSeconds(seconds => seconds - 1);

            }

        }

    }


    const showLink = () => {

        if (minutes == 0 && seconds == 0) {

            updateCodeMo.current.classList.remove('--displayNone');

            textMinute.current.classList.add('--displayNone');

        } else {

            updateCodeMo.current.classList.add('--displayNone');

            textMinute.current.classList.remove('--displayNone');

        }

    }


    const updateCodeMobile = () => {

        MySwal.fire({

            allowOutsideClick: false,

            html: <div >

                <div className='--mySwalSuccessDiv2'>

                    <i className='icofont-tick-boxed --mySwalSuccessIcon2' />

                </div>

                <div className='--mySwalDivTitle'>

                    <h3 className='--mySwalTitle --mySwalColorTitleGreen'> کد با موفقیت ارسال شد. <i className='icofont-simple-smile  ' /> </h3>

                </div>

            </div>,

            timer: 3000,

            timerProgressBar: true,

            textConfirmButton: 'متوجه شدم',

            didClose: () => { setMinutes(3) },

            customClass: {

                popup: '--mySwalPopup',
                timerProgressBar: '--progressBarColorBlue',

            }

        })




        // // let data = { 'user_id': element.user_id }
        // axios.post('web/authUser/updateCodeMobileInitial', { headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json; charset=utf-8' } })
        //     .then(response => {
        //         // دستور زیر فقط برای چک کردن برنامه هست
        //         //این کد باید حتما پاک شود
        //         navigate('/user/verifyMobileInitial', { state: { 'mobile': response.data.mobile, 'code': response.data.code } });

        //         // navigate('/user/verifyMobile',{state:{'user_id':response.data.user_id,'code':response.data.code}});

        //         // Swal.fire({
        //         //     position: 'center',
        //         //     icon: 'success',
        //         //     title: 'کد با موفقیت ارسال شد .',
        //         //     showConfirmButton: false,
        //         //     timer: 3000,
        //         //     didClose: () => { setMinutes(1) }
        //         // })
        //     })
        //     .catch(error => {

        //        

        //     })
    }


    const handleSubmit = () => {

        //هنگام توصعه بک‌اند کامل شود

        setUser(prve => ({ ...prve, login: true }));
        sessionStorage.setItem('userData', JSON.stringify({ login: true }))

        MySwal.fire({

            allowOutsideClick: false,

            showConfirmButton: false,

            html: <div >

                <div className='--mySwalSuccessDiv1'>

                    <i className='icofont-tick-mark --mySwalSuccessIcon1' />

                </div>

                <div className='--mySwalDivTitle'>

                    <h3 className='--mySwalTitle --mySwalColorTitleGreen'> ثبت نام اولیه با موفقیت انجام شد <i className='icofont-simple-smile  ' /> </h3>

                </div>

                <div className='--mySwalContainerBtn'>

                    <ul className='--mySwalUl --mySwalColor2 '>

                        <li> کاربر گرامی چنانچه قصد خرید دارید، برای سهولت خرید بهتر است به  <button className='--styleLessBtn --colorLink ' onClick={() => (Swal.close(), navigate('/profile'))}> حساب کاربری </button>  رفته و ثبت نام خود را کامل کنید.  </li>

                        <li> چنانچه قصد دارید به عنوان <button className='--styleLessBtn --colorLink ' onClick={() => (Swal.close(), navigate('/profile'))}> فروشنده </button> و یا <button className='--styleLessBtn --colorLink ' onClick={() => (Swal.close(), navigate('/profile'))}> مدیر شبکه اجتماعی </button> با ما همکاری کنید بهتر است از همین صفحه به قسمت مورد نظر رفته و ثبت نام را تکمیل کنید. </li>



                    </ul>

                    <button className='--styleLessBtn --mySwalBtn' onClick={() => (Swal.close(), navigate('/profile'))}>

                        <i className='icofont-user-alt-3 ' />
                        <span> حساب کاربری </span>

                    </button>

                    <button className='--styleLessBtn --mySwalBtn' onClick={() => (Swal.close(), navigate('/profile'))}>

                        <i className='icofont-business-man-alt-1  ' />
                        <span> فروشنده </span>

                    </button>

                    <button className='--styleLessBtn --mySwalBtn' onClick={() => (Swal.close(), navigate('/profile'))}>

                        <i className='icofont-users-social  ' />
                        <span>  شبکه اجتماعی </span>

                    </button>

                    <button className='--styleLessBtn --mySwalBtn' onClick={() => (Swal.close(), navigate(-1))}>

                        <i className='icofont-redo ' />
                        <span> صحفه قبلی </span>

                    </button>

                    <button className='--styleLessBtn --mySwalBtn' onClick={() => (Swal.close(), navigate('/'))}>

                        <i className='icofont-home ' />
                        <span> خانه </span>

                    </button>

                </div>

            </div>,

            customClass: {

                popup: '--mySwalPopup',
                htmlContainer: '--mySwalHtml'


            }

        })

    }

    return (
        <>
            <SimpleHeader />

            <p className='guidP_IVM'>
                کد تایید به شماره <span className='guidNumMobile_IVM'> {signUpData.mobile} </span> ارسال شد. کد را در کادر زیر وارد کنید.
            </p>

            <form className='form'>

                <TitleForm title=' تایید موبایل ' />

                <div className='errorAllContiner errorAll --displayNone' id='errorAll'>

                    <p> خطایی رخ داده است. لطفا دوباره تلاش کنید. </p>

                </div>

                {input()}

                <input type="button" className='btnForm' onClick={handleSubmit} value='ثبت' />

                <div className="divBtnGetBtn_SI">
                    <a className=' btnGetBtn_SI --updateCodeLink --displayNone' ref={updateCodeMo} onClick={updateCodeMobile}>ارسال مجدد کد</a>
                    <div className="" ref={textMinute}> <span className='--textMinutes'> ارسال مجدد کد </span> <span className='--minutesForm'> {minutes} : {seconds} </span> </div>
                </div>

                <div className='divBtnGetBtn_SI' >

                    <p> اصلاح و ویرایش <button type='button' className='--styleLessBtn btnGetBtn_SI ' onClick={() => navigate('/signUp')}> موبایل </button>. </p>

                </div>

            </form>
        </>
    )

    // const navigate = useNavigate();
    // const path = '/web/authUser/verifyMobileInitial';
    // const { state } = useLocation();
    // const [codeInput, setCodeInput] = useState(null);
    // const [seconds, setSeconds] = useState(0)
    // const [minutes, setMinutes] = useState(2)
    // const [mobile, setMobile] = useState('');
    // const [code, setCode] = useState('');//این کد فقط برای تست برنامه و موقت است



    // function updateTime() {
    //     if (minutes == 0 && seconds == 0) { }
    //     else {
    //         if (seconds == 0) {
    //             setMinutes(minutes => minutes - 1);
    //             setSeconds(59);
    //         } else {
    //             setSeconds(seconds => seconds - 1);
    //         }
    //     }
    // }


    // useEffect(() => {
    // // با دستور زیر چک می‌کنیم که کاربر تنها از صفحه گت موبایل وارد شده باشد
    // // With the following command, we check that the user has logged in only from getMobile
    //     if(isEmpty(state) || ('access' in state) == false || state.access!=true  ){
    //         navigate('/user/getMobile')
    //     }
    //     setMobile(state.mobile);
    //     setCode(state.code);//موقت
    //     const token = setTimeout(updateTime, 1000);
    //     showLink();
    //     return function cleanUp() {
    //         clearTimeout(token);
    //     }
    // })


    // // const {changeCaptcha,handleCheckValue,backStyle, ChangeStyle,errorSubmit} = useMethodsFormUser(path,element, setElement);
    // // useEffect(() => {
    // //     // 

    // //     // changeCaptcha.current.refreshCaptcha();
    // // }, []);

    // const { input, setError } = useInputNumberCode(setCodeInput, codeInput, 5, 'کد تایید ')

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     axios.post(path, { 'code': codeInput }, { headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json; charset=utf-8' } })
    //         .then(response => {
    //             navigate('/user/register', { state: { 'access': true } });
    //         })
    //         .catch(async error => {
    //             if (error.response.status == 422) {
    //                 const firstElementError = Object.keys(error.response.data.errors)[0];
    //                 if (firstElementError == 'codeExpire') {
    //                     await navigate('/user/getMobile');
    //                     Swal.fire({
    //                         position: 'center',
    //                         icon: 'warning',
    //                         title: 'کد ارسال شده به موبایل شما منقضی شده است، مجددا تلاش کنید.',
    //                         showConfirmButton: true,
    //                         confirmButtonText: 'متوجه شدم',
    //                         // timer: 3000
    //                     })

    //                 }
    //                 setError(error.response.data.errors[firstElementError]);
    //                 // // setError('vnd');
    //                 // errorSubmit(e, error.response.status, error.response.data.errors, element, 'verifyMobile');

    //             } else {
    //                 setError('مشکلی به وجود آمده است، دوباره تلاش کنید.')

    //                 // errorCodeVerify(e, error.response.status, error.response.data.errors, element, 'verifyMobile')
    //             }
    //         })
    // }
    // const errorCodeVerify = (e, errorStatus, errorData, element, idForm) => {
    //     const offset = $(".errorAll").offset();
    //     Swal.fire({
    //         position: 'center',
    //         icon: 'warning',
    //         text: errorData.codeVerify,
    //         showConfirmButton: false,
    //         timer: 3000,
    //         didClose: () => $(document).scrollTop(offset.top - 80),
    //     });
    //     backStyle(e, errorStatus, errorData, element);

    //     $(document).scrollTop(offset.top - 80);
    //     $(`#${idForm}`).trigger('reset');
    //     // for (let i in element) {
    //     //     setElement(perv => ({ ...perv, [i]: null }));
    //     // }

    //     $('.errorAll').html(
    //         `<div class='alert alert-danger errorAll' >${errorData.codeVerify}</div> `
    //     );
    // }

    // const updateCodeMobile = () => {
    //     // let data = { 'user_id': element.user_id }
    //     axios.post('web/authUser/updateCodeMobileInitial', { headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json; charset=utf-8' } })
    //         .then(response => {
    //             // دستور زیر فقط برای چک کردن برنامه هست
    //             //این کد باید حتما پاک شود
    //             navigate('/user/verifyMobileInitial', { state: { 'mobile': response.data.mobile, 'code': response.data.code } });

    //             // navigate('/user/verifyMobile',{state:{'user_id':response.data.user_id,'code':response.data.code}});

    //             // Swal.fire({
    //             //     position: 'center',
    //             //     icon: 'success',
    //             //     title: 'کد با موفقیت ارسال شد .',
    //             //     showConfirmButton: false,
    //             //     timer: 3000,
    //             //     didClose: () => { setMinutes(1) }
    //             // })
    //         })
    //         .catch(error => {

    //           

    //         })
    // }
    // const showLink = () => {
    //     if (minutes == 0 && seconds == 0) {
    //         $('.linkUpdateCode').css('display', 'flex');
    //         $('.textUpdateCode').css('display', 'none');
    //     } else {
    //         $('.linkUpdateCode').css('display', 'none');
    //         $('.textUpdateCode').css('display', 'flex');
    //     }
    // }
    // const backPage = () => {
    //     // ,{state:{'user_id':response.data.user_id,'code':response.data.code}}
    //     navigate('/user/getMobile', { state: { 'mobile': state.mobile } });

    // }
    // return (
    //     <div className='formContainer'>
    //         <div className="formRight">
    //             {useTitleForm('تایید موبایل')}
    //             {/* <div id='codeV'>{state.code}</div> */}
    //             <button onClick={backPage}>بازگشت و اصلاح موبایل</button>
    //             <div>{mobile}</div>
    //             <div>{code}</div>

    //             <form className='form' id='verifyMobileInitial' method='post' onSubmit={handleSubmit}>
    //                 <div className='errorAllContiner errorAll' id='errorAll'></div>
    //                 {input()}
    //                 <div>{codeInput} </div>
    //                 {/* < Captcha ref={changeCaptcha} backStyle={backStyle} ChangeStyle={ChangeStyle} /> */}
    //                 <input type="submit" className='btnForm' id="" value='ثبت' />
    //                 <div className="updateCode">
    //                     <a className='linkUpdateCode' onClick={updateCodeMobile}>ارسال مجدد کد</a>
    //                     <div className="textUpdateCode">ارسال مجدد کد پس از {minutes}:{seconds}</div>
    //                 </div>
    //             </form>
    //         </div>
    //         <div className="formLeft">
    //             {/* عکس قرار می گیرد */}
    //             image
    //         </div>
    //     </div>
    // )

}


