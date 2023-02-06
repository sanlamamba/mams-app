import React from "react";
import { Link } from "react-router-dom";

export default function NavBtn({ path, text }) {
  return (
    <div className="nav-btn">
      <Link to={path} type="button" className="btn-nav">
        {text}
      </Link>
    </div>
  );
}
