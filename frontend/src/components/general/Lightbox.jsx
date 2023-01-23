import React from "react";
import { useEffect } from "react";
import { assetsLocations } from "../../utils/assetsLocations";

function Lightbox({
  lightbox,
  lightBoxToggle,
  lightboxNext,
  lightboxPrev,
  content,
}) {
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [content.src]);

  return (
    <div
      className={`galerie-lightbox ${lightbox.open ? "active" : ""}`}
      onClick={lightBoxToggle}
    >
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
          {content.type === "image" && (
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
          )}
          <div className="lightbox-img galerie_img">
            {loading ? (
              <div className="loader-container d-flex justify-content-center align-items-center">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                {content.type === "image" && (
                  <>
                    <div class="top left"></div>
                    <div class="top right"></div>
                    <div class="bottom right"></div>
                    <div class="bottom left"></div>
                  </>
                )}
                {content.type === "image" ? (
                  <img
                    src={`${assetsLocations.images}/${content.src}`}
                    alt="Mams lightbox"
                  />
                ) : content.type === "video" ? (
                  <iframe
                    autoplay
                    width="560"
                    height="315"
                    src={content.src}
                    title="Mams Video"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lightbox;
