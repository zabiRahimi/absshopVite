import { useRef } from "react";
import Input from "../../form/Input";

const Email = ({ setReadyStage, setFullStage, setShowInputs }) => {

    const emailLSU = useRef(null);

    const handleSubmit = () => {

        setReadyStage(4);
        setFullStage(3);
        setShowInputs(
            {
                name: false,
                userName: false,
                email: false,
                city: true,
                address: false,
            }
        );
    }

    return (
        <>

            <Input type='email' id='email_LSU' name='email' ref={emailLSU} label='ایمیل' direction='ltr' required={true} error={' ایمیل را صحیح وارد کنید.'} />

            <input type="button" className='btnForm' id="" value=' ثبت ' onClick={handleSubmit} />

        </>
    );
}
export default Email;