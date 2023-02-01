import React from "react";
import { useEffect } from "react";

function BackToTop({ scroll }) {
  const [topOffset, setTopOffset] = React.useState(
    document.documentElement.scrollTop
  );

  const [displayBackToTop, setDisplayBackToTop] = React.useState(false);
  const handleScroll = (scroll) => {
    if (scroll.y < 0) {
      setDisplayBackToTop(true);
    } else {
      setDisplayBackToTop(false);
    }
  };

  useEffect(() => {
    handleScroll(window.pageYOffset);
    setTopOffset(window.pageYOffset);
  }, [topOffset]);

  return (
    <div className={`back-to-top ${displayBackToTop ? "active" : "hidden"}`}>
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <i className="fas fa-arrow-up"></i>
      </button>
    </div>
  );
}

export default BackToTop;
