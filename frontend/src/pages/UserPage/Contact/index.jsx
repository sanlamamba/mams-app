import React from "react";
import ContactForm from "../../../components/Forms/ContactForm";

export default function index() {
  return (
    <div className="contact_container">
      <div className="row">
        <div className="col-md-5 col-0 d-none d-md-block px-2 contact__img">
          <img src="/assets/images/contact-background.png" alt="" srcset="" />
        </div>
        <div className="col-md-7 col-12 form__container">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
