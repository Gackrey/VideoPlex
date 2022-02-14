import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
const ScrollToTop = () => {
  return (
    <div className="circle" onClick={() => window.scrollTo(0, 0)}>
      <FontAwesomeIcon icon={faArrowUp} />
    </div>
  );
};

export default ScrollToTop;
