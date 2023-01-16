import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function MainNav() {
  const location = useLocation();
  const [currPath, setCurrPath] = useState("");

  useEffect(() => {
    setCurrPath(location.pathname.split("/")[1]);
  }, [location]);

  return (
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button">
          <i class="fas fa-bars"></i>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <Link to="/" class="navbar-brand mt-2 mt-lg-0">
            <img
              src="/assets/images/logo.png"
              alt="MDB Logo"
              loading="lazy"
              width={60}
              className="mx-4"
            />
          </Link>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 mx-3">
            <li class={`nav-item mx-4 ${currPath === "projet" && "active"}`}>
              <Link class="nav-link" to="/projet">
                PROJET
              </Link>
              <img src="/assets/images/btn-image.png" />
            </li>
            <li class={`nav-item mx-4 ${currPath === "galerie" && "active"}`}>
              <Link class="nav-link" to="/galerie">
                GALERIE
              </Link>
              <img src="/assets/images/btn-image.png" />
            </li>
            <li class={`nav-item mx-4 ${currPath === "clips" && "active"}`}>
              <Link class="nav-link" to="/clips">
                CLIPS
              </Link>
              <img src="/assets/images/btn-image.png" />
            </li>
            <li class={`nav-item mx-4 ${currPath === "contact" && "active"}`}>
              <Link class="nav-link" to="/contact">
                CONTACT
              </Link>
              <img src="/assets/images/btn-image.png" />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
