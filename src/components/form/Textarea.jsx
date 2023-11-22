import React, { useEffect, useRef, useState } from 'react';


const Textarea = ({ id, name, label, direction, required, error, value }, ref) => {

    const wrapper_Te = useRef(null);
    const iStar_Te = useRef(null);
    const iTrue_Te = useRef(null);
    const iFalse_Te = useRef(null);
    const textarea = useRef(null);
    const label_Te = useRef(null);
    const errorDiv_Te = useRef(null);

    const [textareaValue, setTextareaValue] = useState(value);


    useEffect(() => {

        textarea.current.style.direction = direction;

        required && iStar_Te.current.classList.remove('--displayNone');



        // // value && setInputValue(value);

        textareaValue && label_Te.current.classList.remove('--hidden');


    }, [textareaValue]);


    const handleFocus = () => {

        wrapper_Te.current.classList.add('borderBottomColor_Fo');

        wrapper_Te.current.classList.remove('greenBorder_Fo');

        wrapper_Te.current.classList.remove('redBorder_Fo');

        iTrue_Te.current.classList.add('--displayNone');

        iFalse_Te.current.classList.add('--displayNone');

        required && iStar_Te.current.classList.remove('--displayNone');

        errorDiv_Te.current.classList.add('--displayNone');

    }


    const handleBlur = () => {

        wrapper_Te.current.classList.remove('borderBottomColor_Fo');

    }


    const handleInput = (e) => {

        label_Te.current.classList.remove('--hidden');

        let value = e.target.value;

        value || label_Te.current.classList.add('--hidden');

        // name === 'userName' && checkCharUserName(e);

    }


    const handleInputChange = (event) => {

        setTextareaValue(event.target.value);

    };

    // const handleFocus = (e) => {
    //     // let classInputF = e.target.id + 'Input';
    //     // let classValidFeedbackF = e.target.id + 'Feedback';
    //     // $('.' + classInputF).css('border-color', '#ced4da');
    //     // $('.' + classValidFeedbackF).html(' ');
    // }
    // const star = (props.star == 'ok') ? <i className="fa fa-star star" aria-hidden="true"></i> : '';
    // const classInput = 'form-control inputForm ' + props.id + 'Input';
    // const classValidFeedback = 'validFeedback' + ' ' + props.id + 'Feedback';

    return (
        <div className="containerWrapper_Fo">

            <div className='wrapper_Fo' ref={wrapper_Te}>

                <i className='icofont-ui-rating --displayNone iStar_Fo' ref={iStar_Te} />

                <i className="icofont-tick-mark --displayNone iTrue_Fo" ref={iTrue_Te} />

                <i className='icofont-exclamation --displayNone iFalse_Fo' ref={iFalse_Te} />

                <label className='label_Fo labelTextarea_Fo --hidden' htmlFor={name} ref={label_Te}>

                    {label}

                </label>

                <textarea type="text" className='textarea_Fo' ref={textarea} id={id} onInput={handleInput} onFocus={handleFocus} onBlur={handleBlur} onChange={handleInputChange} placeholder={label} >

                </textarea >

            </div>
            {/* className='classInput' */}
            {/* onBlur={blur} onFocus={handleFocus} */}


            <div className='errorDiv_Fo --displayNone' ref={errorDiv_Te}> {error} </div>
        </div>
    )


}
export default Textarea;