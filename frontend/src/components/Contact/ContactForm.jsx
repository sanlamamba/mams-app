import React from "react";
import api from "../../apiConfig/requests";
import client from "../../apiConfig/api";
import { toast } from "react-toastify";

export default function ContactForm() {
  const [value, setValue] = React.useState({
    sujet: "",
    message: "",
    nom: "",
    prenom: "",
    mail: "",
  });

  const handleChange = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(value);
    try {
      const res = await client.post("/message/new", value);
      console.log(res);
      if (res.ok) {
        toast.success(res.message);
        setValue({
          nom: "",
          sujet: "",
          message: "",
          prenom: "",
          mail: "",
        });
      }
    } catch (e) {
      console.log(e);
      toast.error(e.message);
    }
  };

  return (
    <>
      <div className="row mt-md-5 mt-0 p-md-0 p-3 contact__form">
        <div className="col-md-6  col-12 input__container text-white">
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={value.nom}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6 col-12 input__container">
          <input
            type="text"
            name="prenom"
            placeholder="Prenom"
            value={value.prenom}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6 col-12 input__container">
          <input
            type="text"
            name="mail"
            placeholder="Mail"
            value={value.mail}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6 col-12 input__container">
          <input
            type="text"
            name="sujet"
            placeholder="Sujet"
            value={value.sujet}
            onChange={handleChange}
          />
        </div>
        <div className="col-12 input__container">
          <textarea
            name="message"
            placeholder="Message"
            value={value.message}
            onChange={handleChange}
            rows={5}
          />
        </div>
        <div className="col-12 contact__submit_container">
          <button
            type="button"
            className="btn btn-contact"
            onClick={handleSubmit}
          >
            <h4>Envoyer</h4>

            <img
              src="/assets/images/btn-image.png"
              width={150}
              alt="mams button"
            />
          </button>
        </div>
      </div>
    </>
  );
}
