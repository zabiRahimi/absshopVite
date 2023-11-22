import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
// import { useResolvedPath } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

const Input = forwardRef(({ type, id, name, label, direction, required, error, value }, ref) => {

    // const MySwal = withReactContent(Swal);

    const wrapper_IF = useRef(null);
    const iStar_IF = useRef(null);
    const iTrue_IF = useRef(null);
    const iFalse_IF = useRef(null);
    const input = useRef(null);
    const label_IF = useRef(null);
    const errorDiv_IF = useRef(null);
    const iEye_IF = useRef(null);
    const iEyeBlocked_IF = useRef(null);

    const [inputValue, setInputValue] = useState(value);


    useEffect(() => {

        input.current.style.direction = direction;

        required && iStar_IF.current.classList.remove('--displayNone');

        type === 'password' && iEye_IF.current.classList.remove('--displayNone');

        // value && setInputValue(value);

        inputValue && label_IF.current.classList.remove('--hidden');


    }, [inputValue]);


    useImperativeHandle(ref, () => ({

        getInput: () => {

            return input.current

        },

        errorStyle: () => {

            errorStyle();

        },

        trueStyle: () => {

            trueStyle();

        },


    }));


    const handleFocus = () => {

        wrapper_IF.current.classList.add('borderBottomColor_Fo');

        wrapper_IF.current.classList.remove('greenBorder_Fo');

        wrapper_IF.current.classList.remove('redBorder_Fo');

        iTrue_IF.current.classList.add('--displayNone');

        iFalse_IF.current.classList.add('--displayNone');

        required && iStar_IF.current.classList.remove('--displayNone');

        errorDiv_IF.current.classList.add('--displayNone');

    }


    const handleBlur = () => {

        wrapper_IF.current.classList.remove('borderBottomColor_Fo');

    }

    // const star = (props.star == 'ok') ? <i className="fa fa-star star" aria-hidden="true"></i> : '';
    // const classInput='form-control inputForm '+props.id+'Input';
    // const classValidFeedback = 'validFeedback' + ' ' + props.id + 'Feedback';

    const handleInput = (e) => {

        label_IF.current.classList.remove('--hidden');

        let value = e.target.value;

        value || label_IF.current.classList.add('--hidden');

        // name === 'userName' && checkCharUserName(e);

    }

    const trueStyle = () => {

        borderStyle('greenBorder_Fo');
        hiddenStarIcon();
        showIcon(iTrue_IF);

    }


    const errorStyle = () => {

        borderStyle('redBorder_Fo');
        hiddenStarIcon();
        showIcon(iFalse_IF);
        showErrorDiv();

    }


    const borderStyle = (colorBorder) => {

        wrapper_IF.current.classList.add(colorBorder);

    }


    const hiddenStarIcon = () => {

        iStar_IF.current.classList.add('--displayNone');

    }


    const showIcon = (iRef) => {

        iRef.current.classList.remove('--displayNone');

    }


    const showErrorDiv = () => {

        errorDiv_IF.current.classList.remove('--displayNone');
    }


    const showPassword = () => {

        displayEyes();

        input.current.type = 'text';

    }


    const hidePassword = () => {

        displayEyes();
        input.current.type = 'password';

    }


    const displayEyes = () => {

        iEye_IF.current.classList.toggle('--displayNone');

        iEyeBlocked_IF.current.classList.toggle('--displayNone');

    }


    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };


    return (

        <div className="containerWrapper_Fo" >

            <div className='wrapper_Fo' ref={wrapper_IF}>

                <i className='icofont-ui-rating --displayNone iStar_Fo' ref={iStar_IF} />

                <i className='icofont-eye --displayNone iEye_Fo' ref={iEye_IF} onClick={showPassword} />

                <i className='icofont-eye-blocked --displayNone  iEye_Fo' ref={iEyeBlocked_IF} onClick={hidePassword} />

                <i className="icofont-tick-mark --displayNone iTrue_Fo" ref={iTrue_IF} />

                <i className='icofont-exclamation --displayNone iFalse_Fo' ref={iFalse_IF} />

                <label className='label_Fo --hidden' htmlFor={name} ref={label_IF}> {label} </label>

                <input type={type} className='input_Fo' value={inputValue} ref={input} id={name} name={name} onInput={handleInput}
                    onFocus={handleFocus} onBlur={handleBlur} onChange={handleInputChange} placeholder={label} />

            </div>


            <div className='errorDiv_Fo --displayNone' ref={errorDiv_IF}> {error} </div>

            {/* <label htmlFor={props.id} className='labelForm'>
                // {/* css code label in form/main.scss 
                {props.label}
                {star}
            </label>
            
                <input type="text" ref={input} className={classInput} id={props.id} defaultValue={props.value} onBlur={props.blur} onFocus={handleFocus}  />
                
           
            <div className={classValidFeedback}>
                css code label in form/main.scss
                
                
            </div> */}

        </div>

    )

});


export default Input;