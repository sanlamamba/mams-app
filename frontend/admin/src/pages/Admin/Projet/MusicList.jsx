import React from "react";
import MusicContainer from "./MusicContainer";
import { Link } from "react-router-dom";

export default function MusicList() {
  return (
    <div className="container">
      <div className="row mb-2">
        <div className="col d-flex justify-content-end">
          <Link to={"/projet/nouveau"} className="btn btn-outline-danger">
            Ajouter une musique
          </Link>
        </div>
      </div>
      <div className="row">
        <MusicContainer />
      </div>
    </div>
  );
}
