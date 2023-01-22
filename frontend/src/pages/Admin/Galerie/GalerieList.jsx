import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import galerieList from "../../../data/GalerieList";

export default function GalerieList() {
  const [galerie, setGalerie] = useState(galerieList);
  return (
    <div className="galerie__container">
      <div className="container my-2 d-flex justify-content-end">
        <Link to={"/admin/galerie/nouveau"} className="btn btn-outline-danger">
          Ajouter une nouvelle photo
        </Link>
      </div>

      <div className="galerie_grid admin_galerie">
        {galerie.map(function (image, i) {
          return <GalerieImg src={image} index={i} />;
        })}
      </div>
    </div>
  );
}

function GalerieImg({ src, deleteImage }) {
  return <img src={src} alt={"Galerie Images"} />;
}
