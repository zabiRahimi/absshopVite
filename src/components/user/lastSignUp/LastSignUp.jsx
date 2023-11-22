import { useRef, useState } from "react";
import TitleForm from "../../form/TitleForm";
import '../../form/form.css';
import Input from "../../form/Input";
import ProgressBar from "../../form/progressBar/ProgressBar";
import Name from "./Name";
import UserName from "./UserName";
import Email from "./Email";
import SelectCity from "./SelectCity";
import Address from "./Address";

const LastSignUp = () => {



    // const nameLSU = useRef(null);
    // const lastNameLSU = useRef(null);
    // const userNameLSU = useRef(null);
    // const passwordLSU = useRef(null);
    // const passwordConfrimLSU = useRef(null);
    // const postalCodeLSU = useRef(null);
    // const emailLSU = useRef(null);

    const [readyStage, setReadyStage] = useState(1);
    const [fullStage, setFullStage] = useState(-1);

    const [showInputs, setShowInputs] = useState({
        name: true,
        userName: false,
        email: false,
        city: false,
        address: false,
    });


    const handleSetReadyStage = (data) => {

        setReadyStage(data);
    }


    const handleSetFullStage = (data) => {

        setFullStage(data);


    }


    const handleSetShowInputs = (data) => {

        setShowInputs(data);

    }


    return (
        <section>
            <form className="form">
                <TitleForm title='تکمیل ثبت نام' />

                <ProgressBar steps={5} readyStage={readyStage} fullStage={fullStage} />

                {showInputs.name &&
                    <Name
                        setReadyStage={handleSetReadyStage}
                        setFullStage={handleSetFullStage}
                        setShowInputs={handleSetShowInputs}
                    />
                }

                {showInputs.userName &&
                    <UserName
                        setReadyStage={handleSetReadyStage}
                        setFullStage={handleSetFullStage}
                        setShowInputs={handleSetShowInputs}
                    />
                }

                {showInputs.email &&
                    <Email
                        setReadyStage={handleSetReadyStage}
                        setFullStage={handleSetFullStage}
                        setShowInputs={handleSetShowInputs}
                    />
                }

                {showInputs.city &&
                    <SelectCity
                        setReadyStage={handleSetReadyStage}
                        setFullStage={handleSetFullStage}
                        setShowInputs={handleSetShowInputs}
                    />
                }

                {showInputs.address &&
                    <Address
                        setReadyStage={handleSetReadyStage}
                        setFullStage={handleSetFullStage}
                        setShowInputs={handleSetShowInputs}
                    />
                }

                {/* <Input type='text' id='lastName_LSU' name='lastName' ref={lastNameLSU} label='نام خانوادگی' direction='ltr' required={true} error={' نام کاربری یا موبایل صحیح نمی باشد.'} />

                <Input type='text' id='userName_LSU' name='userName' ref={userNameLSU} label='نام کاربری ' direction='ltr' required={true} error={' نام کاربری یا موبایل صحیح نمی باشد.'} />

                <Input type='password' id='password_LSU' ref={passwordLSU} name='password' label='رمز عبور' direction='ltr' required={true} error={' رمز عبور صحیح نمی باشد'} />

                <Input type='password' id='passwordConfrim_LSU' ref={passwordConfrimLSU} name='passwordConfrim' label='تکرار رمز عبور' direction='ltr' required={true} error={' رمز عبور صحیح نمی باشد'} />

                <Input type='email' id='email_LSU' name='email' ref={emailLSU} label='ایمیل' direction='ltr' required={true} error={' نام کاربری یا موبایل صحیح نمی باشد.'} />

                <Input type='text' id='postalCode_LSU' name='postalCode' ref={postalCodeLSU} label=' کد پستی ' direction='ltr' required={true} error={' نام کاربری یا موبایل صحیح نمی باشد.'} />



                <textarea cols="30" rows="10"></textarea> */}

            </form>
        </section>
    );
}
export default LastSignUp;