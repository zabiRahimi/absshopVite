

import './verticalSubmenu.css';

const SubMenu = () => {

    const handle = () => {

    }


    return (
        <div className="containerMain_SME">

            <div className="containerItems_SME">

                <button className='--styleLessBtn btn_SME' onClick={handle}> <i className='icofont-' /> <span>تی شرت </span></button>
                <button className='--styleLessBtn btn_SME' onClick={handle}> <i className='icofont-' /> <span>موبایل</span></button>
                <button className='--styleLessBtn btn_SME' onClick={handle}> <i className='icofont-' /> <span>کیف و کفش</span></button>
                <button className='--styleLessBtn btn_SME' onClick={handle}> <i className='icofont-' /> <span>وسایل خودرو</span></button>
                <button className='--styleLessBtn btn_SME' onClick={handle}> <i className='icofont-' /> <span>آشپزخانه</span></button>
                <button className='--styleLessBtn btn_SME' onClick={handle}> <i className='icofont-' /> <span>حبوبات</span></button>
                <button className='--styleLessBtn btn_SME' onClick={handle}> <i className='icofont-' /> <span>لوازم تحریر</span></button>

            </div>

        </div>
    );
}

export default SubMenu;