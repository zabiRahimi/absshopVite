import State from "../../form/state";
import City from "../../form/city";
import { useEffect, useState } from "react";

const SelectCity = ({ setReadyStage, setFullStage, setShowInputs }) => {

    const [stateName, setStateName] = useState('');
    const [cityName, setCityName] = useState('');

    const getState = (state) => {

        setStateName(state);

    }

    const getCity = (city) => {

        setCityName(city);

    }

    useEffect(() => {
        console.log(cityName);
    }, [cityName]);


    const handleSubmit = () => {

        setReadyStage(5);
        setFullStage(4);
        setShowInputs(
            {
                name: false,
                userName: false,
                email: false,
                city: false,
                address: true,
            }
        );
    }

    return (

        <>
            <State getState={getState} name={'state'} id={'state'} required={true} error={' استان را انتخاب کنید. '} />

            <City sendCity={getCity} stateName={stateName} name={'city'} id={'city'} required={true} error={' ابتدا استان و سپس شهر را انتخاب کنید. '} />



            <input type="button" className='btnForm' id="" value=' ثبت ' onClick={handleSubmit} />

        </>

    );
}
export default SelectCity;