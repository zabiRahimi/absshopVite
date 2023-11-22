
import { createRef, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import './subMenuHorizontal.css';
import ItemsMenuHorizontal from './itemsMenuHorizontal/ItemsMenuHorizontal';


const SubMenuHorizontal = forwardRef(({ modelSubMenu, arraySubMenu }, ref) => {

    const subItemsRef = useRef(null);

    const products = {
        pro1: ['mobile', 'موبایل'],
        pro2: ['carSpareParts', 'لوازم یدکی خودرو'],
        pro3: ['foodstuffs', 'مواد غذایی'],
        pro4: ['sportsAndTravel', 'ورزش و سفر '],
        pro5: ['fashionAndClothing', 'مد و لباس'],
        pro6: ['homeAndKitchen', 'خانه و آشپزخانه'],
        pro7: ['sportsAndTravel', 'ورزش و سفر  2'],
        pro8: ['mobile', 'موبایل 2'],
        pro9: ['homeAndKitchen', 'خانه و آشپزخانه 2'],
        pro10: ['fashionAndClothing', 'مد و لباس 2'],
        pro11: ['foodstuffs', 'مواد غذایی 2'],
        pro12: ['carSpareParts', 'لوازم یدکی خودرو 2'],
        pro13: ['fashionAndClothing', 'مد و لباس 3'],
    }


    let array;

    switch (arraySubMenu) {

        case 'products':
            array = products;
            break;

        default:
            array = {};

            break;
    }


    const btnRef = useRef([]);
    const downRef = useRef([]);
    const upRef = useRef([]);

    let subMenuItem;

    if (modelSubMenu == 'subMenu') {

        btnRef.current = Object.values(array).map((_, i) => btnRef.current[i] ?? createRef());
        downRef.current = Object.values(array).map((_, i) => downRef.current[i] ?? createRef());
        upRef.current = Object.values(array).map((_, i) => upRef.current[i] ?? createRef());


        subMenuItem = Object.keys(array).map((key, i) => (

            <div className='divItemSMH' key={i}>

                <button className='--styleLessBtn btnItemSMH' ref={btnRef.current[i]} onClick={() => showItems(array[key][1], array[key][0], btnRef.current[i], downRef.current[i], upRef.current[i])}>

                    <i className='icofont-rounded-down  iDown_SMH ' ref={downRef.current[i]} />
                    <i className='icofont-rounded-up  iUp_SMH  --displayNone ' ref={upRef.current[i]} />
                    <span>  {array[key][1]}</span>

                </button>

            </div>

        ));

    }


    const [nameItem, setNameItem] = useState('');
    const [arrayItems, setArrayItems] = useState(null);


    useImperativeHandle(ref, () => ({
        closeAllItemsChild() {
            closeAllItems();
        }
    }

    ));


    const showItems = (nameItem, array, btn, down, up) => {

        const showItem = down.current.classList.contains('--displayNone');

        if (!showItem) {
            setNameItem(nameItem);
            setArrayItems(array)

            closeAllItems();

            btn.current.classList.toggle('colorBorder');
            down.current.classList.toggle('--displayNone');
            up.current.classList.toggle('--displayNone');

            subItemsRef.current && subItemsRef.current.classList.toggle('--displayNone');

        } else {

            closeAllItems();

        }
    }


    const closeAllItems = () => {

        const btns = Array.from(document.getElementsByClassName('btnItemSMH'));
        const downs = Array.from(document.getElementsByClassName('iDown_SMH'));
        const ups = Array.from(document.getElementsByClassName('iUp_SMH'));


        btns.forEach((btn) => {

            btn.classList.remove('colorBorder');

        });


        downs.forEach((down) => {

            down.classList.remove('--displayNone');

        });


        ups.forEach((up) => {

            up.classList.add('--displayNone');

        });


        subItemsRef.current && subItemsRef.current.classList.add('--displayNone');

    }



    return (
        <div className='container_SMH'>

            {
                modelSubMenu == 'subMenu' ? <>

                    <div className='containerItems_SMH'>
                        {subMenuItem}

                    </div>

                    <div className='containerSubItems_SMH --displayNone' ref={subItemsRef}>

                        <div className='divNameItem_SMH'>

                            <button className='--styleLessBtn btnNameItem_SMH' onClick={closeAllItems}> <i className='icofont-close ' /> <span>  {nameItem}</span></button>

                        </div>

                        <div>

                            <ItemsMenuHorizontal array={arrayItems} closeAllItems={closeAllItems} />

                        </div>

                    </div>

                    </>

                    :

                    <div className='containerSubItems_SMH ' >

                        <div>

                            <ItemsMenuHorizontal array={arraySubMenu} closeAllItems={closeAllItems} />

                        </div>

                    </div>

            }


        </div>
    )
});


export default SubMenuHorizontal;