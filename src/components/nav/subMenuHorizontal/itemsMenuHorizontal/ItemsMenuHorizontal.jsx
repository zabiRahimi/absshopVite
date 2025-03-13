
import { useEffect } from 'react';
import './itemsMenuHorizontal.css';

const ItemsMenuHorizontal = ({ array, closeAllItems }) => {
    let arrayItems;

    const mobile = {
        nokia: [
            'nokie 1',
            'nokie 2',
            'nokie 3',
            'nokie 4',
            'nokie 5',
            'nokie 6',
            'nokie 7',
        ],
        samsung: [
            'samsung a',
            'samsung s',
            'samsung d',
            'samsung f',
            'samsung g',
            'samsung n',
            'samsung m',
            'samsung q',
            'samsung w',
            'samsung e',
            'samsung t',
            'samsung y',
            'samsung h',
            'samsung p',
        ],
        sony: [
            'sony sd',
            'sony fd',
            'sony fe',
            'sony io',
            'sony rt',
            'sony er',
            'sony eh',
            'sony ht',
            'sony uy',
            'sony zd',
            'sony xs',
            'sony cf',
            'sony vh',

        ],
        هوآوی: [

            'Huawei P30 Pro ',
            'Huawei Mate 20 Pro',
            'Huawei P30',
            'Huawei P20 Pro',
            'Huawei P20',
            'Huawei Mate 20',
            'Huawei Mate 20 X',
            'Huawei Mate 10 Pro',
            'Huawei Mate 20 Lite',
            'Huawei P Smart (2019)'

        ],

        شیائومی: [

            'sdfe',
            'tefd12',
            'X-sdfh23',
            '23popd',
            'oper56',
            'L-xMoner',
            'yarfer415',
            'sdfr56f',
            'poperf2',

        ],

        اپل: [
            'iPhone XS Max',
            'iPhone XS',
            'iPhone XR',
            'iPhone X',
            'iPhone 8 Plus',
            'iPhone 8',
            'iPhone 7 Plus',
            'iPhone SE',
            'iPhone 7',
            'iPhone 6S'
        ]

    }

    const foodstuffs = {

        'خوار و بار': [
            ' حبوبات و سویا',
            ' روغن‌های خوراکی',
            ' قند و شکر',
            'ماکارونی',
            ' پاستا و رشته',
            'غلات',
            'نان',
            'آرد',
            ' سویق و پودر جوانه',
        ],
        'ادویه': [
            'زرشک',
            'ادویه',
            ' رب ها',
            'آبلیمو',
            'آبغوره',
            'سرکه',
            'سس',
            'خلال‌ها',
            'نشاسته',
            ' سبزی خشک',
        ],

        'ترشیجات': [

            'ترشی',
            'زیتون',
            'خیارشور و شور',
        ],
        'شیرینی': [
            ' شکلات و آبنبات',
            ' کلوچه و نان شیرینی',
            'سوهان',
            'گز',
            'نبات',
            'شیرینی',
            'کیک',
            'تنقلات',
            'دسر',
        ],
        'آجیل و خشکبار': [
            'خرما',
            'پسته',
            'گردو',
            'تخمه',
            ' میوه خشک',
            ' بادام درختی',
            ' بادام زمینی',
            ' بادام هندی',
            'فندق',
            ' کشمش ، نخودچی و مویز',
            ' آلو خشک',
            'سنجد',
        ],
        'نوشیدنی': [

            'چای',
            'دمنوش',
            'عرقیات',
            'قهوه',
            'محصولات کافئین دار',
            'نوشیدنی انرژی زا',
            'نوشابه و ماء الشعیر',
            'آب معدنی',
        ],


    }

    const homeAndKitchen = {
        'یخچال': [
            'فریزر',
            'lg',
            'آزمایش',
            'دوقلو',
            'معمولی',

        ],
        'اجاق گاز': [
            'فردار',
            'معمولی',
            'تخت',

        ],
        'وسایل برقی': [
            ' چای ساز و قهوه ساز',
            ' جاروبرقی',
            ' جاروشارژی و بخارشوی',
            ' کولر گازی و آبی',
            ' بخاری و گرمایشی',
            ' ماشین لباسشویی',
            ' خردکن و غذاساز',
            ' سرخ کن و کباب پز ',
        ],
        'وسایل سرمایشی': [
            'کولر آبی',
            'پنکه',
            'اسکولر',
            'کولر گازی',

        ],

        'وسایل آشپزخانه': [
            'قابلمه',
            'بشقاب',
            'قاشق و چنگال',
            'فلاکس و فنجان',
            'زودپز',
            'لیوان',

        ],

    }

    const carSpareParts = {
        'تزیینات خودرو': [
            'شبرنگ',
            'عکس های زیبا',
            'پرده',
            'انواع ورپوش',
            'لامپ و ال ای دی',
            'رایو ظبط',

        ],
        'لوازم برقی': [
            'استارت',
            'دینام',
            'چراغ',
            'برف پاک کن',
            'دسته راهنما',

        ],
        ' موتور و گیربکس': [
            'شرخ دنده',
            'روغن موتور',
            'پیستون',
            'صفحه کلاچ',
            'میل لنگ',
            'سیلندر',

        ],
        'آچار': [

            'فرانسه',
            'تخت',
            'بکس',

        ],
        'وسایل ایمنی': [
            'زنجیر چرخ',
            'کپسول آتش نشانی',
            'جعبه کمک های اولیه',
            'شبرنگ سه گوش',

        ],
        'چرخ و تایر': [
            'لاستیک',
            'رینگ',
            'تیوپ',
            'قالپاق',

        ],
    }

    const fashionAndClothing = {
        'زنانه': [
            'تی شرت',
            'زیرپوش',
            'شلوار',
            'مجلسی',
            'مانتو',
        ],
        'مردانه': [
            'تی شرت',
            'شلوار',
            'لباس',
            'شرت',

        ],
        'زیر': [
            'شرت',
            'رکابی',
            'مایو',

        ],
        'کوت و شلوار': [
            'کره ای',
            'ترک',
            'ایرانی',

        ],


    }

    const sportsAndTravel = {
        'لوازم سفر': [

            ' تجهیزات پخت و پز مسافرتی',
            'تجهیزات کمپینگ و کوهنوردی',
            'کالای خواب مسافرتی',
            'میز و صندلی مسافرتی',
            'لوازم بهداشتی مسافرتی',
        ],
        'کفش ورزشی': [

            ' لباس ورزشی زنانه و دخترانه',
            'لباس ورزشی مردانه و پسرانه',
        ],
        'تجهیزاد ورزشی': [
            ' تناسب اندام',
            'تجهیزات ورزش های آبی',
            'تجهیزات ورزش های توپی',
            'دستگاه های ورزشی',
            'اکسسوری ورزشی',
            'دوچرخه و تجهیزات دوچرخه',
            'مکمل ورزشی',
        ],
        'چمدان و ساک': [

            ' کیف و کوله ورزشی',
            'ساک',
            'چمدان',
        ],
        'وزش های زمستانی': [
            'کفش اسکی',
            'پوتین سرما',
            'چوب اسکی',
            'لباس گرم',
            'کسیه خواب زمستانه',
            'پیک نیک',

        ],
        'فوتبال': [
            'کفش فوتبال',
            'لباس فوتبال',
            'توپ',
            'ساق بند',
            'گرم کن',
            'شرت',

        ],
        'کوهنوردی': [
            'کفش',
            'کلاه',
            'طناب و قلاب',
            'کوله کوهنوردی',
            'وسایل ایمنی',

        ],


    }


    switch (array) {
        case 'mobile':
            arrayItems = mobile;
            break;
        case 'foodstuffs':
            arrayItems = foodstuffs;
            break;
        case 'homeAndKitchen':
            arrayItems = homeAndKitchen;
            break;
        case 'carSpareParts':
            arrayItems = carSpareParts;
            break;
        case 'fashionAndClothing':
            arrayItems = fashionAndClothing;
            break;
        case 'sportsAndTravel':
            arrayItems = sportsAndTravel;
            break;
        default:
            arrayItems = {};

            break;
    }

    useEffect(() => {
        // for (const [key,value] of mobile) {
        // }

        // Object.keys(mobile).find(key => obj[key].includes(value));
        //    let keyss = Object.keys(mobile).find(key => (<div>{key}</div>,mobile[key].map((m)=>(
        //    )));

        // Object.values(mobile).map((element, i)=>{
        // });
    })

    // const elements = () => {
    //     let m = []
    //      m = Object.keys(mobile).map((key, index) => {
    //        return <div  key={index}>
    //         <div>{key}</div>
    //         {mobile[key].map((item)=>{
    //             return (<div>
    //                 {item}
    //             </div>)
    //         })}
    //         </div>
    //      });

    //     return m


    // }

    const elements = Object.keys(arrayItems).map((key, index) => {
        return <div key={index} className='containerItems_IMH'>
            <div className='titleItems_IMH'>{key}</div>
            <div className='containerDivItems_IMH'>

                {arrayItems[key].map((item, i) => {
                    return (<div key={i} className='divItem_IMH'>
                        <button className='--styleLessBtn btn_IMH' onClick={closeAllItems}>{item}</button>
                    </div>)
                })}

            </div>
        </div>
    });

    return (
        <div className='containerMain_IMH'>
            {elements}
        </div>
    )

}

export default ItemsMenuHorizontal;