import { useRef } from "react";

import TopHeader from "./subHeader/TopHeader";
import SliderHeader from "./subHeader/SliderHeader";
import NavHeader from "./subHeader/NavHeader";
import './header.css';

const Header = () => {
  const headerRef = useRef(null)
  return (
    <header className="header_H" ref={headerRef}> 
      <TopHeader />
      <SliderHeader />
      {/* <NavHeader headerRef={headerRef}/> */}
    </header>
  );
};

export default Header;
