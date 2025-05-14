import React, { useState } from 'react';
import VerticalSubmenu from "./verticalSubmenu/VerticalSubmenu";


const ItemBtn = ({ item }) => {
    
  // وضعیت تعیین می‌کند کدام آیکون نمایش داده شود.
  // به عنوان مثال: false: نمایش آیکون پایین، true: نمایش آیکون بالا.
  const [isToggled, setIsToggled] = useState(false);

  // تابع کلیک برای تغییر وضعیت
  const handleClick = () => {
    setIsToggled(prev => !prev);
    console.log('sss');
    
  };

  return (
    <>
    <button onClick={handleClick} className="--styleLessBtn btnItem_VMe">
      <i className="icofont-tasks-alt" />
      <span>{item.title}</span>
      {/* آیکون پایین: وقتی isToggled false است نمایش داده می‌شود */}
      <i
        className={`icofont-rounded-down down_VMe lastChild_VMe ${isToggled ? '--displayNone' : ''}`}
      />
      {/* آیکون بالا: وقتی isToggled true است نمایش داده می‌شود */}
      <i
        className={`icofont-rounded-up up_VMe lastChild_VMe ${isToggled ? '' : '--displayNone'}`}
      />
    </button>
    <div className={`divItems_VMe  ${isToggled ? '' : '--displayNone'}`}>
        {
           item.category&& 
           <VerticalSubmenu
            subItems={item.category}
          />
    }
    </div>
    </>
  );
};

export default ItemBtn;
