import React from "react";
import ContactForm from "../../../components/Contact/ContactForm";

export default function index() {
  return (
    <div className="container-fluid contact_container pb-5">
      <div className="row">
        <div className="col-md-5 col-0 d-none d-md-block px-2 contact__img">
          <img
            src="/assets/images/contact-background.png"
            alt=""
            srcset=""
            width={350}
          />
        </div>
        <div className="col-md-7 col-12">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
