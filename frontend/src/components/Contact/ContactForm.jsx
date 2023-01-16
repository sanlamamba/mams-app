import React from "react";

export default function ContactForm() {
  const [value, setValue] = React.useState({
    nom: "",
    prenom: "",
    mail: "",
    sujet: "",
    message: "",
  });

  const handleChange = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", value.nom);
    formData.append("prenom", value.prenom);
    formData.append("email", value.mail);
    formData.append("mail", value.mail);
    formData.append("sujet", value.sujet);
    formData.append("message", value.message);

    console.log(formData);
  };

  return (
    <>
      <div className="row mt-5">
        <div className="col-6 input__container">
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={value.nom}
            onChange={handleChange}
          />
        </div>
        <div className="col-6 input__container">
          <input
            type="text"
            name="prenom"
            placeholder="Prenom"
            value={value.prenom}
            onChange={handleChange}
          />
        </div>
        <div className="col-6 input__container">
          <input
            type="text"
            name="mail"
            placeholder="Mail"
            value={value.mail}
            onChange={handleChange}
          />
        </div>
        <div className="col-6 input__container">
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

            <img src="/assets/images/btn-image.png" width={150} />
          </button>
        </div>
      </div>
    </>
  );
}
