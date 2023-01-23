import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export default function AdminNav() {
  const { nom, prenom, email } = useSelector((state) => state.auth);
  const location = useLocation();

  const isActivePage = (pageArray) => {
    if (pageArray.includes(location.pathname.split("/")[2])) {
      return "active";
    } else {
      return "";
    }
  };

  return (
    <div className="admin__container d-flex flex-column">
      <div className="col-12 d-flex justify-content-center flex-column align-items-center  my-2">
        <img src="/assets/images/vinyle.png" alt="" srcset="" width={200} />
        <h4 className="mt-2">
          {nom} {prenom}
        </h4>
        <h5 className="text-muted">{email}</h5>
      </div>
      <div className="col-12">
        <ul className="nav nav-tabs admin__nav_container d-flex flex-column">
          <li
            className={`nav-item p-2 my-1 admin__nav ${isActivePage("projet")}`}
          >
            <Link to="/admin/projet" className="navbar-brand fs-6">
              Projet
            </Link>
          </li>
          <li
            className={`nav-item p-2 my-1 admin__nav ${isActivePage(
              "galerie"
            )}`}
          >
            <Link to="/admin/galerie" className="navbar-brand fs-6">
              Galerie
            </Link>
          </li>
          <li
            className={`nav-item p-2 my-1 admin__nav ${isActivePage("clips")}`}
          >
            <Link to="/admin/clips" className="navbar-brand fs-6">
              Clips
            </Link>
          </li>
          <li
            className={`nav-item p-2 my-1 admin__nav ${isActivePage(
              "messages"
            )}`}
          >
            <Link to="/admin/message" className="navbar-brand fs-6">
              Messages
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
