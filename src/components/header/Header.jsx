import { useRef } from "react";

import TopHeader from "./subHeader/TopHeader";
import SliderHeader from "./subHeader/SliderHeader";
import './header.css';

const Header = () => {
  const headerRef = useRef(null)
  return (
    <header className="header_H" ref={headerRef}> 
      <TopHeader />
      <SliderHeader />
    </header>
  );
};

export default Header;
