import { useRef } from "react";
import Input from "../../form/Input";
import Textarea from "../../form/Textarea";

const Address = ({ setReadyStage, setFullStage, setShowInputs }) => {

    const postalCodeLSU = useRef(null);

    const handleSubmit = () => {

        setReadyStage(2);
        setFullStage(1);
        // setShowInputs(
        //     {
        //         name: false,
        //         userName: true,
        //         email: false,
        //         city: false,
        //         address: false,
        //     }
        // );
    }

    return (

        <>

            <Input type='text' id='postalCode_LSU' name='postalCode' ref={postalCodeLSU} label=' کد پستی ' direction='ltr' required={true} error={' کد پستی را صحیح وارد کنید.'} />

            <Textarea label={'آدرس'} direction={"rtl"} required={true} error={' آدرس را به صورت صحیح وارد کنید. '} />

            <input type="button" className='btnForm' id="" value=' ثبت ' onClick={handleSubmit} />

        </>

    );
}
export default Address;