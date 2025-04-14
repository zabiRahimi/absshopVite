import React from "react";
const EnterIcon = ({ }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
    >
        {/* مثلث جهت‌دار به سمت چپ در سمت چپ خط افقی */}
        <polygon points="0,12 10,6 10,18" fill="currentColor" />

        {/* مسیر اصلی شامل خط افقی، آرک منحنی و خط عمودی */}
        <path
            d="M3 12 H19 A4 4 0 0 0 22 10 V4"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export default EnterIcon;