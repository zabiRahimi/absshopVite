
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Go to the top of the body
 */
const ScrollToTop = () => {

    const { pathname } = useLocation();

    useEffect(() => {

        window.scrollTo(0, 0);

    }, [pathname]);

    return null;

}

export default ScrollToTop;