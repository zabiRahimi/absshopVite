import { useRef } from "react";
import Input from "../../form/Input";

const Name = ({ setReadyStage, setFullStage, setShowInputs }) => {

    const nameLSU = useRef(null);
    const lastNameLSU = useRef(null);


    const handleSubmit = () => {

        setReadyStage(2);
        setFullStage(1);
        setShowInputs(
            {
                name: false,
                userName: true,
                email: false,
                city: false,
                address: false,
            }
        );
    }

    return (

        <>

            <Input type='text' id='name_LSU' name='name' ref={nameLSU} label='نام' direction='rtl' required={true} error={' نام را به درستی وارد کنید.'} />

            <Input type='text' id='name_LSU' name='name' ref={lastNameLSU} label=' نام خانوادگی ' direction='rtl' required={true} error={' نام خانوادگی را به درستی وارد کنید.'} />


            <input type="button" className='btnForm' id="" value=' ثبت ' onClick={handleSubmit} />

        </>

    );

}

export default Name;