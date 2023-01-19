import React, { useState } from "react";
import Lightbox from "../../../components/general/Lightbox";
import galerieList from "../../../data/GalerieList";

export default function Index() {
  const [lightbox, setLightbox] = useState({
    open: false,
    current: 0,
  });
  const lightboxNext = () => {
    setLightbox({
      open: true,
      current: lightbox.current + 1,
    });
  };
  const lightboxPrev = () => {
    setLightbox({
      open: true,
      current: lightbox.current - 1,
    });
  };
  const lightBoxToggle = () => {
    setLightbox({
      ...lightbox,
      open: !lightbox.open,
    });
  };
  const setLightboxCurrent = (index) => {
    setLightbox({
      current: index,
      open: !lightbox.open,
    });
  };
  const [galerie, setGalerie] = useState(galerieList);
  console.log(lightbox);

  return (
    <div className="container-fluid contact_container pb-5">
      <Lightbox
        lightbox={lightbox}
        lightBoxToggle={lightBoxToggle}
        lightboxNext={lightboxNext}
        lightboxPrev={lightboxPrev}
        content={{ type: "image", src: galerie[lightbox.current] }}
      />
      <div className={`galerie-lightbox ${lightbox.open ? "active" : ""}`}>
        <div className="galerie-lightbox_container">
          <div className="lightbox-content">
            <div className="galerie-lightbox-close">
              <button
                type="button"
                className="galerie-lightbox-nav-btn"
                onClick={lightBoxToggle}
              >
                <span className="galerie-icon">X</span>
              </button>
            </div>
            <div className="galerie-lightbox-nav">
              <button
                type="button"
                className="galerie-lightbox-nav-btn"
                onClick={lightboxPrev}
              >
                <span className="galerie-icon">
                  <i class="fa fa-chevron-left" aria-hidden="true"></i>
                </span>
              </button>
              <button
                type="button"
                className="galerie-lightbox-nav-btn"
                onClick={lightboxNext}
              >
                <span className="galerie-icon">
                  <i class="fa fa-chevron-right" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div className="lightbox-img galerie_img">
              <div class="top left"></div>
              <div class="top right"></div>
              <div class="bottom right"></div>
              <div class="bottom left"></div>
              <img src={galerie[lightbox.current]} alt="Mams Galerie" />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 px-2 galerie_grid">
          {galerie.map(function (image, i) {
            return (
              <GalerieImg src={image} click={setLightboxCurrent} index={i} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

const GalerieImg = ({ src, alt = "", click, index }) => {
  const clicked = () => {
    click(index);
  };
  return (
    <div className="galerie_img" onClick={clicked}>
      <div class="top left"></div>
      <div class="top right"></div>
      <div class="bottom right"></div>
      <div class="bottom left"></div>
      <img src={src} alt={alt} />
    </div>
  );
};
