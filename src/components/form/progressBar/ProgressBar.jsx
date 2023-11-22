
import './progressBar.css';

const ProgressBar = ({ steps, readyStage, fullStage }) => {

    // const line = () => {

    //     for (let index = 0; index <= steps; index++) {
    //         return index;

    //     }
    // }

    const showSteps = Array.from({ length: steps }, (_, index) => (

        <div key={index} className='containerStep_PBa'>

            <div className={`numStep_PBa  ${index == readyStage - 1 && 'readyStageBrColor_PBa'}  ${index < fullStage && 'fullStageBrColor_PBa'}`} > {index + 1} </div>

            {index < (steps - 1) && <div className={`line_PBa ${index == readyStage - 1 && 'readyStageBgColor_PBa'} ${index < fullStage && 'fullStageBgColor_PBa'}`}></div>}

        </div>
    ));



    return (

        <div className='containerBar_PBa'>
            {showSteps}
        </div>

    );
}
export default ProgressBar;