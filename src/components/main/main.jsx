import { useEffect, useState } from "react";
import localforage from "localforage";
import Footer from "../footer/Footer";
import NormalShowProduct from "../normalShowProduct/NormalShowProduct";
import SliderSliding from "../sliderSliding/SliderSliding";
import ProductSlider from "./ProductSlider";
import { useLoaderData } from "react-router";

const Main = () => {
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [dataAll, setDataAll] = useState(null);

  /**
   * واکشی داده‌ها برای اسلایدر پیشنهادها
   */
  useEffect(() => {
    const fetchData = async () => {
      let arraySlider;

      await localforage.getItem("proSliderM").then((value) => {
        arraySlider = value.filter((item) => item.slider == 1);
      });

      arraySlider = arraySlider[0].products.split(","); //تبدیل رشته به آرایه

      await localforage.getItem("products").then((value) => {
        const newArray = value.filter((item) => arraySlider.includes(item.id));

        if (newArray.length > 0) {
          setData1(newArray);
        }
      });
    };

    fetchData(); // فراخوانی تابع
  }, []);

  /**
   * واکشی داده‌ها برای اسلایدر محصولات پربازدید
   */
  useEffect(() => {
    const fetchData = async () => {
      let arraySlider;

      await localforage.getItem("proSliderM").then((value) => {
        arraySlider = value.filter((item) => item.slider == 2);
      });

      arraySlider = arraySlider[0].products.split(","); //تبدیل رشته به آرایه

      await localforage.getItem("products").then((value) => {
        const newArray = value.filter((item) => arraySlider.includes(item.id));

        if (newArray.length > 0) {
          setData2(newArray);
        }
      });
    };

    fetchData(); // فراخوانی تابع
  }, []);

  /**
   * واکشی داده‌ها برای  محصولات کلی
   */
  useEffect(() => {
    const fetchData = async () => {
      await localforage.getItem("products").then((value) => {
        if (value.length > 0) {
          setDataAll(value);
        }
      });
    };

    fetchData(); // فراخوانی تابع
  }, []);

  // اسلایدها باید به صورت پویا از دیتابیس خوانده شوند که به زودی انجام خواهد شد
  // const slides = {
  //   slide1: {
  //     name: "مداد",
  //     img: "normal1.jpg",
  //     price: "25300",
  //     oldPrice: "31000",
  //     shop: "شاپرک",
  //   },
  //   slide2: {
  //     name: "برگ A4",
  //     img: "normal2.jpg",
  //     price: "150000",
  //     oldPrice: "161000",
  //     shop: "شریفی",
  //   },
  //   slide3: {
  //     name: "کلاسور",
  //     img: "normal3.jpg",
  //     price: "84200",
  //     oldPrice: "125000",
  //     shop: "گسترش",
  //   },
  //   slide4: {
  //     name: "مداد تراش رومیزی",
  //     img: "normal4.jpg",
  //     price: "41500",
  //     oldPrice: "36000",
  //     shop: "مرزبوم",
  //   },
  //   slide5: {
  //     name: "دفتر نقاشی",
  //     img: "normal5.jpg",
  //     price: "42600",
  //     oldPrice: "65200",
  //     shop: "سیفور",
  //   },
  //   slide6: {
  //     name: "خودکار",
  //     img: "normal6.jpg",
  //     price: "18500",
  //     oldPrice: "23000",
  //     shop: "برگ ناز",
  //   },
  //   slide7: {
  //     name: "میز تحریر",
  //     img: "normal7.jpg",
  //     price: "18000",
  //     oldPrice: "25000",
  //     shop: "برگ ناز",
  //   },
  //   slide8: {
  //     name: "پرگار",
  //     img: "normal8.jpg",
  //     price: "28500",
  //     oldPrice: "43000",
  //     shop: "برگ ناز",
  //   },
  //   slide9: {
  //     name: "خط کش",
  //     img: "normal9.jpg",
  //     price: "19500",
  //     oldPrice: "21500",
  //     shop: "برگ ناز",
  //   },
  //   slide10: {
  //     name: "ماژیک آبی نگین گستر",
  //     img: "normal10.jpg",
  //     price: "18500",
  //     oldPrice: "23000",
  //     shop: "برگ ناز",
  //   },
  //   slide11: {
  //     name: "لاستیک",
  //     img: "normal11.jpg",
  //     price: "18500",
  //     oldPrice: "23000",
  //     shop: " اتو بنز",
  //   },
  //   slide12: {
  //     name: "پتو",
  //     img: "normal12.jpg",
  //     price: "18500",
  //     oldPrice: "23000",
  //     shop: " نرمینه",
  //   },
  //   slide13: {
  //     name: "بیل",
  //     img: "normal13.jpg",
  //     price: "18500",
  //     oldPrice: "23000",
  //     shop: " باغبان",
  //   },
  //   slide14: {
  //     name: "گیربکس آ12",
  //     img: "normal8.jpg",
  //     price: "18500",
  //     oldPrice: "23000",
  //     shop: "اتو بنز ",
  //   },
  // };

  // const slides2 = {
  //   slide1: {
  //     name: "بوق",
  //     img: "normal3.jpg",
  //     price: "25326749",
  //     oldPrice: "31865210",
  //     shop: "شاپرک",
  //   },
  //   slide2: {
  //     name: "برگ A4",
  //     img: "normal4.jpg",
  //     price: "150000",
  //     oldPrice: "161000",
  //     shop: "شریفی",
  //   },
  //   slide3: {
  //     name: "کلاسور",
  //     img: "normal1.jpg",
  //     price: "84200",
  //     oldPrice: "125000",
  //     shop: "گسترش",
  //   },
  //   slide4: {
  //     name: "مداد تراش رومیزی",
  //     img: "normal2.jpg",
  //     price: "41500",
  //     oldPrice: "36000",
  //     shop: "مرزبوم",
  //   },
  //   slide5: {
  //     name: "دفتر نقاشی",
  //     img: "normal7.jpg",
  //     price: "42600",
  //     oldPrice: "65200",
  //     shop: "سیفور",
  //   },
  //   slide6: {
  //     name: "خودکار",
  //     img: "normal8.jpg",
  //     price: "18500",
  //     oldPrice: "23000",
  //     shop: "برگ ناز",
  //   },
  //   slide7: {
  //     name: "صفحه کلاچ ",
  //     img: "normal5.jpg",
  //     price: "18000",
  //     oldPrice: "25000",
  //     shop: "برگ ناز",
  //   },
  //   slide8: {
  //     name: "پرگار",
  //     img: "normal6.jpg",
  //     price: "28500",
  //     oldPrice: "43000",
  //     shop: "برگ ناز",
  //   },
  //   slide9: {
  //     name: "خط کش",
  //     img: "normal9.jpg",
  //     price: "19500",
  //     oldPrice: "21500",
  //     shop: "برگ ناز",
  //   },
  //   slide10: {
  //     name: "ماژیک آبی نگین گستر",
  //     img: "normal10.jpg",
  //     price: "18500",
  //     oldPrice: "23000",
  //     shop: "برگ ناز",
  //   },
  //   slide11: {
  //     name: "لاستیک",
  //     img: "normal11.jpg",
  //     price: "18500",
  //     oldPrice: "23000",
  //     shop: " اتو بنز",
  //   },
  //   slide12: {
  //     name: "پتو",
  //     img: "normal12.jpg",
  //     price: "18500",
  //     oldPrice: "23000",
  //     shop: " نرمینه",
  //   },
  //   slide13: {
  //     name: "بیل",
  //     img: "normal13.jpg",
  //     price: "18500",
  //     oldPrice: "23000",
  //     shop: " باغبان",
  //   },
  //   slide14: {
  //     name: "گیربکس آ12",
  //     img: "normal8.jpg",
  //     price: "18500",
  //     oldPrice: "23000",
  //     shop: "اتو بنز ",
  //   },
  // };

  /**
   * برای هر اسلایدر باید آبجکتی از تنظیمات به صورت زیر ایجاد شود
   * نام هر آبجکتی باید منحصر بفرد باشد و چنانچه قرار است اسلایدر دیگری اضافه شود
   * باید نام آبجکت آن منحصر بفرد باشد
   * برای هر کدام از اعضا زیر در کامپوننت sliderMe توضیحاتی ارائه شده است
   * همه اعضای آبجکت زیر اجباری هستند و باید اعمال شوند
   * هر اسلایدری باید یک className منحصربفردی داشته باشد
   * در حال حاضر برای typeClass فقط نوع normal در دسترس است
   * به زودی انواع دیگری نیز برای typeClass در دسترس خواهد بود
   */
  const settings = {
    className: "offers",
    typeClass: "normal",
    bgColor: "red",
    title: "پیشنهادات برای شما",
    symbol: "offer",
    slides: data1,
  };

  const settings2 = {
    className: "offers2",
    typeClass: "normal",
    bgColor: "blue",
    title: "محصولات پربازدید",
    symbol: "offer",
    slides: data2,
  };

  const slideForSliderSliding = {
    slide1: {
      name: "خودرو",
      img: "digi1",
      link: "",
    },

    slide2: {
      name: "کیف و کفش",
      img: "digi2",
      link: "",
    },

    slide3: {
      name: "موبایل",
      img: "digi3",
      link: "",
    },

    slide4: {
      name: "کامپیوتر و لب تاب",
      img: "digi4",
      link: "",
    },

    slide5: {
      name: "خانه و آشپزخانه",
      img: "digi5",
      link: "",
    },

    slide6: {
      name: "گیاهان آپرتمانی",
      img: "digi6",
      link: "",
    },

    slide7: {
      name: "آرایشی بهداشتی",
      img: "digi7",
      link: "",
    },

    slide8: {
      name: "نوشت افزار",
      img: "digi8",
      link: "",
    },

    slide9: {
      name: "لوازم جانبی موبایل",
      img: "digi9",
      link: "",
    },

    slide10: {
      name: "پوشاک ",
      img: "digi10",
      link: "",
    },

    slide11: {
      name: "دخترانه",
      img: "digi11",
      link: "",
    },

    slide12: {
      name: "پسرانه",
      img: "digi12",
      link: "",
    },

    slide13: {
      name: "قالی و پتو",
      img: "digi3",
      link: "",
    },

    slide14: {
      name: "لیوان و بشقاب",
      img: "digi1",
      link: "",
    },

    slide15: {
      name: "ابراز صنعتی",
      img: "digi7",
      link: "",
    },

    slide16: {
      name: "تزیینات خودرو",
      img: "digi2",
      link: "",
    },

    slide17: {
      name: "خوار و بار",
      img: "digi9",
      link: "",
    },

    slide18: {
      name: "آجیل",
      img: "digi5",
      link: "",
    },

    slide19: {
      name: "وسایل برقی",
      img: "digi3",
      link: "",
    },

    slide20: {
      name: "یخچال و فریزر",
      img: "digi6",
      link: "",
    },

    slide21: {
      name: "لاستیک و تایر",
      img: "digi11",
      link: "",
    },
  };

  const settingSliderSliding = {
    title: "دسته بندی ها",
    row: 2,
    more: true,
    bgColor: "#fff",
    color: "#fff",
    typeClass: "circle",
    id: "cateG1",
    paginate: true,
    slides: slideForSliderSliding,
  };
  // const getProduct = {
  //   product1: {
  //     name: "تلوزیون",
  //     img: "zanbil2.jpg",
  //     price: "14520000",
  //     oldPrice: "16200000",
  //     shop: "نورآباد دهلران",
  //     brand: "ال‌جی",
  //   },
  //   product2: {
  //     name: "میز تحریر",
  //     img: "zanbil2.jpg",
  //     price: "955000",
  //     oldPrice: "",
  //     shop: "سرزمین‌تخت",
  //     brand: "",
  //   },
  //   product3: {
  //     name: "موبایل",
  //     img: "zanbil20.jpg",
  //     price: "12300000",
  //     oldPrice: "13020000",
  //     shop: "طاها موبایل گیران",
  //     brand: "سامسونگ",
  //   },
  //   product4: {
  //     name: "تلفن بی سیم",
  //     img: "zanbil4.jpg",
  //     price: "3450000",
  //     oldPrice: "3720000",
  //     shop: "شاپرک",
  //     brand: "LG",
  //   },
  //   product5: {
  //     name: "پرده نمایش",
  //     img: "zanbil5.jpg",
  //     price: "3500000",
  //     oldPrice: "",
  //     shop: "آداک",
  //     brand: "boofrack",
  //   },
  //   product6: {
  //     name: "موبایل",
  //     img: "zanbil6.jpg",
  //     price: "7860000",
  //     oldPrice: "",
  //     shop: "آوا",
  //     brand: "nokia",
  //   },
  //   product7: {
  //     name: "پرینتر",
  //     img: "zanbil7.jpg",
  //     price: "4520000",
  //     oldPrice: "",
  //     shop: "آداک",
  //     brand: "LG",
  //   },
  //   product8: {
  //     name: "دوربین",
  //     img: "zanbil8.jpg",
  //     price: "3210000",
  //     oldPrice: "",
  //     shop: "نورا",
  //     brand: "canon",
  //   },
  //   product9: {
  //     name: "تلفن",
  //     img: "zanbil9.jpg",
  //     price: "3120000",
  //     oldPrice: "4000000",
  //     shop: "شاپرک",
  //     brand: "گیگاست",
  //   },
  //   product10: {
  //     name: "تلوزیون",
  //     img: "zanbil10.jpg",
  //     price: "7560000",
  //     oldPrice: "",
  //     shop: "میهن‌لارج",
  //     brand: "ال‌جی",
  //   },
  //   product11: {
  //     name: "تلفن",
  //     img: "zanbil11.jpg",
  //     price: "1650000",
  //     oldPrice: "",
  //     shop: "شاپرک",
  //     brand: "گیگاست",
  //   },
  //   product12: {
  //     name: "Tv",
  //     img: "zanbil12.jpg",
  //     price: "15900000",
  //     oldPrice: "16100000",
  //     shop: "کلبه",
  //     brand: "ال‌جی",
  //   },
  //   product13: {
  //     name: "تلوزیون",
  //     img: "zanbil13.jpg",
  //     price: "6500000",
  //     oldPrice: "",
  //     shop: "گیتی",
  //     brand: "سونی",
  //   },
  //   product14: {
  //     name: "تلفن",
  //     img: "zanbil14.jpg",
  //     price: "3620000",
  //     oldPrice: "",
  //     shop: "میهن‌لارج",
  //     brand: "LG",
  //   },
  //   product15: {
  //     name: "تلوزیون",
  //     img: "zanbil15.jpg",
  //     price: "7850000",
  //     oldPrice: "",
  //     shop: "گیتی",
  //     brand: "ال‌جی",
  //   },
  //   product16: {
  //     name: "دوربین",
  //     img: "zanbil16.jpg",
  //     price: "2500000",
  //     oldPrice: "",
  //     shop: "آرژانتین",
  //     brand: "canon",
  //   },
  //   product17: {
  //     name: "تلوزیون",
  //     img: "zanbil17.jpg",
  //     price: "8450000",
  //     oldPrice: "",
  //     shop: "گیتی",
  //     brand: "LG",
  //   },
  //   product18: {
  //     name: "تلفن",
  //     img: "zanbil18.jpg",
  //     price: "3100000",
  //     oldPrice: "3940000",
  //     shop: "شاپرک",
  //     brand: "پاناسونیک",
  //   },
  //   product19: {
  //     name: "تلوزیون",
  //     img: "zanbil19.jpg",
  //     price: "9850000",
  //     oldPrice: "",
  //     shop: "شهرآرا",
  //     brand: "ال‌جی",
  //   },
  //   product20: {
  //     name: "پرینتر",
  //     img: "zanbil20.jpg",
  //     price: "4560000",
  //     oldPrice: "5100000",
  //     shop: "آداک",
  //     brand: "Lcp",
  //   },
  //   product21: {
  //     name: "پرینتر",
  //     img: "zanbil21.jpg",
  //     price: "5700000",
  //     oldPrice: "",
  //     shop: "نورا",
  //     brand: "Lcp",
  //   },
  //   product22: {
  //     name: "تلوزیون",
  //     img: "zanbil22.jpg",
  //     price: "9200000",
  //     oldPrice: "9560000",
  //     shop: "شهرآرا",
  //     brand: "سونی",
  //   },
  //   product23: {
  //     name: "پرینتر",
  //     img: "zanbil23.jpg",
  //     price: "3500000",
  //     oldPrice: "3850000",
  //     shop: "نورا",
  //     brand: "manTal",
  //   },
  //   product24: {
  //     name: "پرینتر",
  //     img: "zanbil24.jpg",
  //     price: "5600000",
  //     oldPrice: "",
  //     shop: "آداک",
  //     brand: "manTal",
  //   },
  //   product25: {
  //     name: "پرینتر",
  //     img: "zanbil25.jpg",
  //     price: "7400000",
  //     oldPrice: "",
  //     shop: "رایانه‌گستر",
  //     brand: "Lcp",
  //   },
  //   product26: {
  //     name: "تلفن",
  //     img: "zanbil26.jpg",
  //     price: "2750000",
  //     oldPrice: "",
  //     shop: "میهن‌لارج",
  //     brand: "گیگاست",
  //   },
  //   product27: {
  //     name: "پرینتر",
  //     img: "zanbil27.jpg",
  //     price: "3400000",
  //     oldPrice: "",
  //     shop: "آداک",
  //     brand: "Lcp",
  //   },
  //   product28: {
  //     name: "تلوزیون",
  //     img: "zanbil28.jpg",
  //     price: "9950000",
  //     oldPrice: "10800000",
  //     shop: "سونی",
  //   },
  //   product29: {
  //     name: "تلفن",
  //     img: "zanbil29.jpg",
  //     price: "1250000",
  //     oldPrice: "",
  //     shop: "کیمیا",
  //     brand: "گیگاست",
  //   },
  //   product30: {
  //     name: "تلفن",
  //     img: "zanbil30.jpg",
  //     price: "6000000",
  //     oldPrice: "6530000",
  //     shop: "کمانه",
  //     brand: "پاناسونیک",
  //   },
  //   product31: {
  //     name: "موبایل",
  //     img: "zanbil31.jpg",
  //     price: "5150000",
  //     oldPrice: "5720000",
  //     shop: "آوا",
  //     brand: "نوکیا",
  //   },
  //   product32: {
  //     name: "موبایل",
  //     img: "zanbil32.jpg",
  //     price: "4560000",
  //     oldPrice: "",
  //     shop: "قاصدک",
  //     brand: "اپل",
  //   },
  //   product33: {
  //     name: "nokia25",
  //     img: "zanbil33.jpg",
  //     price: "8040000",
  //     oldPrice: "8500000",
  //     shop: "نگین",
  //     brand: "nokia",
  //   },
  //   product34: {
  //     name: "samsong A12",
  //     img: "zanbil34.jpg",
  //     price: "7400000",
  //     oldPrice: "",
  //     shop: "ترمه",
  //     brand: "",
  //   },
  //   product35: {
  //     name: "samsong A22",
  //     img: "zanbil35.jpg",
  //     price: "6200000",
  //     oldPrice: "6500000",
  //     shop: "آوا",
  //     brand: "samsong",
  //   },
  // };
  const settingsNormalShowProduct = {
    hasTitle: true,
    title: "محصولات دیجیتال",
    hasMore: true,
    linkMore: "",
    bgColor: "#363636",
    products: dataAll,
  };

  return (
    <main>
      {/* کامپوننت زیر در واقع یک سکو برای اسلایدر است، به زودی سکوهای دیگری ارائه خواهد شد */}
      {/* اسلایدر محصولات پیشنهادات */}
      {data1 && <ProductSlider {...settings} />}

      {/* اسلایدر محصولات پرقروش */}
      {data2 && <ProductSlider {...settings2} />}

      {/* اسلایدر دسته بندی ها */}
      <SliderSliding {...settingSliderSliding} />

      {/* محصولات */}
      {dataAll && <NormalShowProduct {...settingsNormalShowProduct} />}

      <Footer />
    </main>
  );
};

export default Main;

/**
 * از افکت زیر برای اصلاح آی‌دی‌های محصولات استفاده شد
 */
// useEffect(() => {
//   const fetchData = async () => {
//     let val;
//     await localforage.getItem("products").then((value) => {
//       value.map((objs, b) => {
//         objs.id = b + 1;
//
//       });
//       val = value;
//     });
//     await localforage.setItem("products", val);
//   };

//   fetchData();
// }, []);
