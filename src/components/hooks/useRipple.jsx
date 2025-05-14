import { useEffect } from 'react';

const useRipple = () => {
  useEffect(() => {
    const handleClick = (event) => {
      
      // پیدا کردن نزدیک‌ترین المانی با کلاس 'ripple-btn'
      const rippleBtn = event.target.closest('.ripple-btn');
      
      if (!rippleBtn) return;

      // ایجاد عنصر موج
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');

      // قرار دادن موج در وسط دکمه
      ripple.style.left = '50%';
      ripple.style.top = '50%';

      // محاسبه مقدار مقیاس پویای موج:
      // فرض می‌کنیم اندازه اولیه موج در CSS 20px تعیین شده است.
      const initSize = 5; // اندازه اولیه موج (width و height)
      const extra = 8;    // فاصله اضافی (می‌توان تغییر داد)
      const btnWidth = rippleBtn.offsetWidth;
      // به عنوان مثال: می‌خواهیم موج تا کمی بیشتر از پهنای دکمه گسترش یابد
      const desiredDiameter = btnWidth - extra;
      
      const scaleFactor = desiredDiameter / initSize;

      // تنظیم custom property برای استفاده در CSS keyframes
      ripple.style.setProperty('--scale-factor', scaleFactor);

      // اضافه کردن موج به دکمه
      rippleBtn.appendChild(ripple);

      // پس از پایان انیمیشن، عنصر موج حذف شود
      ripple.addEventListener('animationend', () => {
        ripple.remove();
      });
    };

    // استفاده از event delegation روی document
    document.addEventListener('click', handleClick);

    // پاکسازی Event Listener در هنگام unmount‌ شدن
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
};

export default useRipple;


// import { useEffect } from 'react';

// const useRipple = () => {
//   useEffect(() => {
//     // handler با استفاده از event delegation
//     const handleClick = (event) => {
//       // پیدا کردن نزدیک‌ترین المانی با کلاس 'ripple-btn'
//       const rippleBtn = event.target.closest('.ripple-btn');
//       if (!rippleBtn) return;

//       // ایجاد عنصر موج
//       const ripple = document.createElement('span');
//       ripple.classList.add('ripple');

//       // قرار دادن موج در وسط دکمه
//       ripple.style.left = '50%';
//       ripple.style.top = '50%';

//       // اضافه کردن موج به دکمه
//       rippleBtn.appendChild(ripple);

//       // پس از پایان انیمیشن، موج حذف شود
//       ripple.addEventListener('animationend', () => {
//         ripple.remove();
//       });
//     };

//     // اضافه کردن listener به document به صورت سراسری
//     document.addEventListener('click', handleClick);

//     // Cleanup در هنگام unmount شدن
//     return () => {
//       document.removeEventListener('click', handleClick);
//     };
//   }, []);
// };

// export default useRipple;
