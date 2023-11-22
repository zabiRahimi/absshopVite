import React, { useEffect, useRef, useState } from 'react';
// import $ from "jquery";

const State = ({ getState, id, name, label, direction, required, error, value }) => {

    const wrapper_St = useRef(null);
    const iStar_St = useRef(null);
    const iTrue_St = useRef(null);
    const iFalse_St = useRef(null);
    const textarea = useRef(null);
    const label_St = useRef(null);
    const errorDiv_St = useRef(null);


    useEffect(() => {


        required && iStar_St.current.classList.remove('--displayNone');



        // // value && setInputValue(value);

        // textareaValue && label_St.current.classList.remove('--hidden');


    }, []);


    const handleCity = e => {
        const { value } = e.target;
        getState(value);


        // setTimeout(`$("#city > option[value='']").prop('selected', true);
        //             $('.stateSelect , .citySelect').css('border-color', '#ced4da');
        //             $('.stateFeedback , .cityFeedback').html(' '); `)
    }
    const handleManyFun = (e) => {
        // delCity();
        handleCity(e);

        handleShowLabel('show');
        handleShowSuccess();
    }


    const handleShowLabel = (type) => {

        if (type == 'show') {

            label_St.current.classList.remove('--hidden');

        } else {

            label_St.current.classList.add('--hidden');

        }

    }


    const handleShowSuccess = () => {
        borderStyle('greenBorder_Fo');
        hiddenStarIcon();
        showIcon(iTrue_St);
    }


    const borderStyle = (colorBorder) => {

        wrapper_St.current.classList.add(colorBorder);

    }


    const hiddenStarIcon = () => {

        iStar_St.current.classList.add('--displayNone');

    }


    const showIcon = (iRef) => {

        iRef.current.classList.remove('--displayNone');

    }

    // هنگامی که کاربر بر روی گزینه انتخاب استان کلیک می‌کند
    const handleFocus = () => {

        handleShowLabel('hide');

        getState('');

        wrapper_St.current.classList.remove('greenBorder_Fo');

        wrapper_St.current.classList.remove('redBorder_Fo');

        iTrue_St.current.classList.add('--displayNone');

        iFalse_St.current.classList.add('--displayNone');

        required && iStar_St.current.classList.remove('--displayNone');

        errorDiv_St.current.classList.add('--displayNone');

    }


    // const handleFocus=(e)=>{
    //     // alert(e.target.id)
    //     // let classInputF=e.target.id +'Input';
    //     // let classValidFeedbackF=e.target.id +'Feedback';
    //     // $('.'+classInputF).css('border-color' , '#ced4da');
    //     // $('.'+classValidFeedbackF).html(' ');
    // }
    // const star = (star == 'ok') ? <i className="fa fa-star star" aria-hidden="true"></i> : '';
    // const classInput = 'form-control inputForm ' + id + 'Input';
    // // const classValidFeedback = 'validFeedback' + ' ' + id + 'Feedback';
    const stateSelected = (value) ? <option defaultValue={value} id='no' onClick={(e) => { handleManyFun(e) }}>{value}</option> : <option defaultValue='' id='no' onClick={(e) => { handleManyFun(e) }}>انتخاب استان</option>;
    return (
        <div className="containerWrapper_Fo">

            <div className='wrapper_Fo' ref={wrapper_St}>

                <i className='icofont-ui-rating --displayNone iStar_Fo' ref={iStar_St} />

                <i className="icofont-tick-mark --displayNone iTrue_Fo" ref={iTrue_St} />

                <i className='icofont-exclamation --displayNone iFalse_Fo' ref={iFalse_St} />

                <label htmlFor='state' className='label_Fo --hidden' ref={label_St}>

                    استان

                </label>

                <select className="select_Fo" name='state' id='state'   >

                    <option defaultValue='' onClick={handleFocus} >انتخاب استان</option>

                    <option value="اردبیل" id='ardebil' onClick={(e) => { handleManyFun(e) }}  >اردبیل</option>
                    <option value="اصفهان" id='esfahan' onClick={(e) => { handleManyFun(e) }} >اصفهان</option>
                    <option value="البرز" id='alborz' onClick={(e) => { handleManyFun(e) }} >البرز</option>
                    <option value="ایلام" id='eilam' onClick={(e) => { handleManyFun(e) }}>ایلام</option>
                    <option value="آذربایجان شرقی" id='azarbaijanSharghi' onClick={(e) => { handleManyFun(e) }}>آذربایجان شرقی</option>
                    <option value="آذربایجان غربی" id='azarbaijanGhrbi' onClick={(e) => { handleManyFun(e) }}>آذربایجان غربی</option>
                    <option value="بوشهر" id='boshher' onClick={(e) => { handleManyFun(e) }}>بوشهر</option>
                    <option value="تهران" id='thran' onClick={(e) => { handleManyFun(e) }}>تهران</option>
                    <option value="چهار محال بختیاری" id='charMahalBakhtiari' onClick={(e) => { handleManyFun(e) }}>چهار محال بختیاری</option>
                    <option value="خراسان جنوبی" id='khrasanJonobi' onClick={(e) => { handleManyFun(e) }}>خراسان جنوبی</option>
                    <option value="خراسان رضوی" id='khrasanRazavi' onClick={(e) => { handleManyFun(e) }}>خراسان رضوی</option>
                    <option value="خراسان شمالی" id='khrasanShomali' onClick={(e) => { handleManyFun(e) }}>خراسان شمالی</option>
                    <option value="خوزستان" id='khozestan' onClick={(e) => { handleManyFun(e) }}>خوزستان</option>
                    <option value="زنجان" id='zanjan' onClick={(e) => { handleManyFun(e) }}>زنجان</option>
                    <option value="سمنان" id='semnan' onClick={(e) => { handleManyFun(e) }}>سمنان</option>
                    <option value="سیستان و بلوچستان" id='sistanVaBlochstan' onClick={(e) => { handleManyFun(e) }}>سیستان و بلوچستان</option>
                    <option value="فارس" id='fars' onClick={(e) => { handleManyFun(e) }}>فارس</option>
                    <option value="قزوین" id='ghazvin' onClick={(e) => { handleManyFun(e) }}>قزوین</option>
                    <option value="قم" id='ghom' onClick={(e) => { handleManyFun(e) }}>قم</option>
                    <option value="کردستان" id='kordestan' onClick={(e) => { handleManyFun(e) }}>کردستان</option>
                    <option value="کرمان" id='krman' onClick={(e) => { handleManyFun(e) }}>کرمان</option>
                    <option value="کرمانشاه" id='krmanShah' onClick={(e) => { handleManyFun(e) }}>کرمانشاه</option>
                    <option value="کهگیلویه و بویراحمد" id='kohgiloihVaBoirahmad' onClick={(e) => { handleManyFun(e) }}>کهگیلویه و بویراحمد</option>
                    <option value="گلستان" id='golstan' onClick={(e) => { handleManyFun(e) }}>گلستان</option>
                    <option value="گیلان" id='gilan' onClick={(e) => { handleManyFun(e) }}>گیلان</option>
                    <option value="لرستان" id='lorstan' onClick={(e) => { handleManyFun(e) }}>لرستان</option>
                    <option value="مازندران" id='mazandaran' onClick={(e) => { handleManyFun(e) }}>مازندران</option>
                    <option value="مرکزی" id='markazi' onClick={(e) => { handleManyFun(e) }}>مرکزی</option>
                    <option value="هرمزگان" id='hormozgan' onClick={(e) => { handleManyFun(e) }}>هرمزگان</option>
                    <option value="همدان" id='hamdan' onClick={(e) => { handleManyFun(e) }}>همدان</option>
                    <option value="یزد" id='yazd' onClick={(e) => { handleManyFun(e) }}>یزد</option>
                </select>


            </div>

            <div className='errorDiv_Fo --hidden' ref={errorDiv_St}> {error} </div>

        </div>
    )

}
export default State;