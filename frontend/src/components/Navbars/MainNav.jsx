import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function MainNav() {
  const location = useLocation();
  const [currPath, setCurrPath] = useState("");
  const [mobileNavToggled, setMobileNavToggled] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavToggled(!mobileNavToggled);
  };
  const changeCurrentPath = (path) => {
    setCurrPath(path.split("/")[1]);
    setMobileNavToggled(false);
  };

  useEffect(() => {
    changeCurrentPath(location.pathname);
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid d-flex">
        <div className="d-flex" id="navbarSupportedContent">
          <Link to="/" className="navbar-brand mt-2 mt-lg-0">
            <img
              src="/assets/images/logo.png"
              alt="MDB Logo"
              loading="lazy"
              width={50}
              className="mx-md-4 m-0"
            />
          </Link>
          <ul
            className={`navbar-nav me-auto mb-2 mb-lg-0 mx-3 ${
              mobileNavToggled ? "toggled" : ""
            }`}
          >
            <li className="nav-item nav-toggle">
              <button
                className="navbar-toggler text-white "
                type="button"
                data-bs-toggle="collapse"
                onClick={toggleMobileNav}
              >
                X
              </button>
            </li>
            <li
              className={`nav-item mx-4 ${currPath === "projet" && "active"}`}
            >
              <Link className="nav-link" to="/projet">
                PROJET
              </Link>
              <img src="/assets/images/btn-image.png" alt="mams button" />
            </li>
            <li
              className={`nav-item mx-4 ${currPath === "galerie" && "active"}`}
            >
              <Link className="nav-link" to="/galerie">
                GALERIE
              </Link>
              <img src="/assets/images/btn-image.png" alt="mams button" />
            </li>
            <li className={`nav-item mx-4 ${currPath === "clips" && "active"}`}>
              <Link className="nav-link" to="/clips">
                CLIPS
              </Link>
              <img src="/assets/images/btn-image.png" alt="mams button" />
            </li>
            <li
              className={`nav-item mx-4 ${currPath === "contact" && "active"}`}
            >
              <Link className="nav-link" to="/contact">
                CONTACT
              </Link>
              <img src="/assets/images/btn-image.png" alt="mams button" />
            </li>
          </ul>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMobileNav}
        >
          <i className="fas fa-bars text-white"></i>
        </button>
      </div>
    </nav>
  );
}
