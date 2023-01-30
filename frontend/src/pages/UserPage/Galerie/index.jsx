import React, { useState } from "react";
import Lightbox from "../../../components/general/Lightbox";
import galerieList from "../../../data/GalerieList";
import client from "../../../apiConfig/api";
import { useEffect } from "react";
import { assetsLocations } from "../../../utils/assetsLocations";
import { useRef } from "react";

export default function Index() {
  const [galerie, setGalerie] = useState([]);

  const loadData = async () => {
    try {
      const apiCall = await client.get("/image");
      const { data } = apiCall.data;
      if (apiCall.ok) {
        console.log(data);
        setGalerie(data);
      } else {
        // toast.error(data.message);
        console.log(data);
      }
    } catch (e) {
      console.log(e);
      // toast.error("Error loading data");
      console.log(e);
    }
  };
  const [lightbox, setLightbox] = useState({
    open: false,
    current: 0,
  });
  const lightboxNext = () => {
    if (lightbox.current + 1 < galerie.length) {
      setLightbox({
        open: true,
        current: lightbox.current + 1,
      });
    } else {
      setLightbox({
        open: true,
        current: 0,
      });
    }
  };
  const lightboxPrev = () => {
    if (lightbox.current - 1 > 0) {
      setLightbox({
        open: true,
        current: lightbox.current - 1,
      });
    } else {
      setLightbox({
        open: true,
        current: galerie.length - 1,
      });
    }
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

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="container-fluid contact_container pb-5">
      {galerie.length > 0 && (
        <Lightbox
          lightbox={lightbox}
          lightBoxToggle={lightBoxToggle}
          lightboxNext={lightboxNext}
          lightboxPrev={lightboxPrev}
          content={{
            type: "image",
            src: galerie[lightbox.current].path
              ? galerie[lightbox.current].path
              : "",
          }}
        />
      )}

      <div className="row">
        <div className="col-12 px-2 galerie_grid">
          {galerie.map(function (image, i) {
            return (
              <GalerieImg
                src={image.path}
                click={setLightboxCurrent}
                index={i}
              />
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
  const imgBox = useRef(null);
  useEffect(() => {
    imgBox.current.addEventListener("mouseenter", () => {
      imgBox.current.classList.add("hover");
    });

    imgBox.current.addEventListener("mouseleave", () => {
      imgBox.current.classList.remove("hover");
    });
  }, []);

  return (
    <div className="galerie_img" onClick={clicked} ref={imgBox}>
      <div class="top left"></div>
      <div class="top right"></div>
      <div class="bottom right"></div>
      <div class="bottom left"></div>
      <img src={`${assetsLocations.images}/${src}`} alt={alt} />
      <img
        src={"/assets/images/plus-mark.png"}
        className="plus_mark"
        alt="plus-mark"
      />
    </div>
  );
};
