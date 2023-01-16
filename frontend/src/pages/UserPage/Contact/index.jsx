import React from "react";
import ProjetBox from "../../../components/Projet/ProjetBox";
import ContactForm from "../../../components/Contact/ContactForm";

export default function index() {
  return (
    <div className="container-fluid contact_container">
      <div className="row">
        <div className="col-5 px-2 contact__img">
          <img
            src="/assets/images/contact-background.png"
            alt=""
            srcset=""
            width={350}
          />
        </div>
        <div className="col-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
