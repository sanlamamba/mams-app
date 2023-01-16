import React from "react";
import MainNav from "../components/Navbars/MainNav";
export default function UserLayout({ children }) {
  return (
    <div className="container-fluid" id="content-container">
      <div className="row">
        <MainNav />
      </div>
      <div className="row" id="content">
        {children}
      </div>
    </div>
  );
}
