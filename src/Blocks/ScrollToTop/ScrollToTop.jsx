import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // прокрутка в начало
  }, [pathname]);

  return null;
}

export default ScrollToTop;
