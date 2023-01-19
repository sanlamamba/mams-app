import React from "react";
import ProjetBox from "../../../components/Projet/ProjetBox";

export default function index() {
  return (
    <div className="container-fluid pt-2 projet__container mb-4 d-flex justify-content-center align-items-center">
      <div className="row">
        <div className="col-md-9 col-12 px-2">
          <ProjetBox />
        </div>
        <img
          src="/assets/images/vinyle.png"
          className="projet__disc d-none d-md-block"
          alt="mams vinyle"
        />
      </div>
    </div>
  );
}
