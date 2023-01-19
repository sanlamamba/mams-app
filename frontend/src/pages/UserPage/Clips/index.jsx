import React from "react";
import ProjetBox from "../../../components/Projet/ProjetBox";
import ContactForm from "../../../components/Contact/ContactForm";
import Swiper3D from "../../../components/Clips/Swiper3D";

export default function index() {
  return (
    <div className="container-fluid contact_container">
      <div className="row mt-3">
        <div className="col-12">
          <Swiper3D />
        </div>
      </div>
    </div>
  );
}
