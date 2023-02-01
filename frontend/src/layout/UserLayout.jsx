import React from "react";
import MainNav from "../components/Navbars/MainNav";
import Popup from "../components/general/Popup";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import NavBtn from "../components/general/NavBtn";
export default function UserLayout({ children }) {
  // get variables from redux runSaga
  const location = useLocation();

  const blackPages = ["/contact", "/galerie"];
  const token = localStorage.getItem("token") || null;

  console.log(token);

  useEffect(() => {
    const body = document.querySelector("body");
    console.log(location.pathname);
    if (blackPages.includes(location.pathname)) {
      body.classList.add("black");
    } else {
      body.classList.remove("black");
    }
  }, [location]);

  return (
    <div className="container-fluid" id="content-container">
      {token && <NavBtn path={"/admin"} text="Admin" />}
      <div className="row">
        <MainNav />
      </div>
      <div className="row" id="content">
        {children}
      </div>
    </div>
  );
}
