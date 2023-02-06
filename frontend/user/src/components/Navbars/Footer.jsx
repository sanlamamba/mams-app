import React from "react";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div className="container-fluid footer">
      <div className="row">
        <div className="col-12 col-md-6">
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex  align-items">
              <Link to="/politique">Politique de confidentialite</Link>
              <Link to="/mention">Mention Legale</Link>
            </li>
          </ul>
        </div>
        <div className="col-12 col-md-12  d-flex justify-content-center justify-content-md-end">
          <a
            href="https://fam-digitale.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Developed by FAM Digitale
          </a>
        </div>
      </div>
    </div>
  );
}
