import { useRef } from "react";
import Input from "../../form/Input";

const UserName = ({ setReadyStage, setFullStage, setShowInputs }) => {

    const userNameLSU = useRef(null);
    const passwordLSU = useRef(null);
    const passwordConfrimLSU = useRef(null);

    const handleSubmit = () => {

        setReadyStage(3);
        setFullStage(2);
        setShowInputs(
            {
                name: false,
                userName: false,
                email: true,
                city: false,
                address: false,
            }
        );
    }


    return (
        <>



            <Input type='text' id='userName_LSU' name='userName' ref={userNameLSU} label='نام کاربری ' direction='ltr' required={true} error={' نام کاربری را صحیح وارد کنید.'} />

            <Input type='password' id='password_LSU' ref={passwordLSU} name='password' label='رمز عبور' direction='ltr' required={true} error={' رمز عبور را صحیح وارد کنید'} />

            <Input type='password' id='passwordConfrim_LSU' ref={passwordConfrimLSU} name='passwordConfrim' label='تکرار رمز عبور' direction='ltr' required={true} error={' تکرار رمز عبور صحیح نیست'} />

            <input type="button" className='btnForm' id="" value=' ثبت ' onClick={handleSubmit} />


        </>
    );
}
export default UserName;