import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll directly to the top of the page when the location (route) changes
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

export default ScrollToTop;

