import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function AdminNav() {
  return (
    <div className="admin__container d-flex flex-column">
      <div className="col-12 d-flex justify-content-center flex-column align-items-center  my-2">
        <img src="/assets/images/vinyle.png" alt="" srcset="" width={200} />
        <h4 className="mt-2">Lorem Ipsum</h4>
      </div>
      <div className="col-12">
        <ul className="nav nav-tabs d-flex flex-column">
          <li className="nav-item p-2 my-1">
            <Link to="/admin/projet" className="navbar-brand fs-6">
              Projet
            </Link>
          </li>
          <li className="nav-item p-2 my-1">
            <Link to="/admin/galerie" className="navbar-brand fs-6">
              Galerie
            </Link>
          </li>
          <li className="nav-item p-2 my-1">
            <Link to="/admin/clips" className="navbar-brand fs-6">
              Clips
            </Link>
          </li>
          <li className="nav-item p-2 my-1">
            <Link to="/admin/messages" className="navbar-brand fs-6">
              Messages
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
