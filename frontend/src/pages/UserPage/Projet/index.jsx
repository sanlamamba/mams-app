import React from "react";
import ProjetBox from "../../../components/Projet/ProjetBox";

export default function index() {
  return (
    <div className="container-fluid pt-5 projet__container">
      <div className="row">
        <div className="col-9 px-2">
          <ProjetBox />
        </div>
        <img src="/assets/images/vinyle.png" className="projet__disc" />
      </div>
    </div>
  );
}
