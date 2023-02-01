import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  EffectCoverflow,
  Autoplay,
} from "swiper";
import { assetsLocations } from "../../utils/assetsLocations.js";
// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/effect-coverflow/effect-coverflow.scss";
import Lightbox from "../general/Lightbox";
import { useEffect } from "react";
import { toast } from "react-toastify";
import client from "../../apiConfig/api";
import { CaretRightFilled } from "@ant-design/icons";

SwiperCore.use([Navigation, Pagination, EffectCoverflow, Autoplay]);

export default function SwiperCoverflow() {
  const [clips, setClips] = useState([]);
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
      open: true,
    });
  };
  const loadData = async () => {
    try {
      const apiCall = await client.get("/clip/");
      if (apiCall.ok) {
        setClips(apiCall.data.data);
      }
    } catch (err) {
      toast.error("Une erreur est survenue ");
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  console.log(clips);

  return (
    <div className="App">
      {clips.length > 0 && (
        <>
          {lightbox.open && (
            <Lightbox
              lightbox={lightbox}
              lightBoxToggle={lightBoxToggle}
              lightboxNext={lightboxNext}
              lightboxPrev={lightboxPrev}
              content={{
                type: "video",
                src: clips[lightbox.current]
                  ? `${assetsLocations.videos}/${
                      clips[lightbox.current].video.path
                    }`
                  : "",
              }}
            />
          )}

          <Swiper
            className="d-block d-md-none"
            pagination={{ clickable: true }}
            effect="coverflow"
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
              scale: 0.9,
            }}
            slidesPerView={1}
            centeredSlides
            loop={true}
            autoplay={{
              delay: 1000,
              disableOnInteraction: true,
            }}
          >
            {clips.map((clip, index) => {
              return (
                <SwiperSlide>
                  <div
                    className="swiper-child"
                    style={{
                      backgroundImage: `url(${assetsLocations.images} }}/${clip.image.path})`,
                    }}
                    onClick={() => {
                      setLightboxCurrent(index);
                    }}
                  >
                    <img
                      src={`${assetsLocations.images}/${clip.image.path}`}
                      alt="img"
                      className="clip__img"
                    />
                    <button className="swiper-button">
                      <i className="fas fa-play" />
                    </button>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <Swiper
            className="d-none d-md-block"
            navigation
            pagination={{ clickable: true }}
            effect="coverflow"
            coverflowEffect={{
              rotate: -10,
              stretch: -50,
              depth: 100,
              modifier: 1,
              slideShadows: false,
              scale: 0.95,
            }}
            slidesPerView={4}
            centeredSlides
            loop={true}
            // autoplay={{
            //   delay: 1000,
            //   disableOnInteraction: true,
            // }}
          >
            {clips.map((clip, index) => {
              return (
                <SwiperSlide>
                  <div
                    className="swiper-child"
                    style={{
                      backgroundImage: `url(${assetsLocations.images} }}/${clip.image.path})`,
                    }}
                    onClick={() => {
                      setLightboxCurrent(index);
                    }}
                  >
                    <img
                      src={`${assetsLocations.images}/${clip.image.path}`}
                      alt="img"
                      className="clip__img"
                    />
                    <button className="swiper-button">
                      <CaretRightFilled />
                    </button>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </>
      )}
    </div>
  );
}
