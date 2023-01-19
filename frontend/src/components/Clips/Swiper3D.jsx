import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, EffectCoverflow } from "swiper";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/effect-coverflow/effect-coverflow.scss";
import clipList from "../../data/ClipList";
import Lightbox from "../general/Lightbox";

SwiperCore.use([Navigation, Pagination, EffectCoverflow]);

export default function SwiperCoverflow() {
  const [clips, setClips] = useState(clipList);
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

  return (
    <div className="App">
      <Lightbox
        lightbox={lightbox}
        lightBoxToggle={lightBoxToggle}
        lightboxNext={lightboxNext}
        lightboxPrev={lightboxPrev}
        content={{ type: "video", src: clips[lightbox.current].video }}
      />
      <Swiper
        className="d-block d-md-none "
        navigation
        pagination={{ clickable: true }}
        effect="coverflow"
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        slidesPerView={1}
        centeredSlides
      >
        {clips.map((clip, index) => {
          return (
            <SwiperSlide>
              <div
                className="swiper-child"
                style={{
                  backgroundImage: `url(${clip.image})`,
                }}
                onClick={() => {
                  setLightboxCurrent(index);
                }}
              >
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
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        slidesPerView={4}
        centeredSlides
      >
        {clips.map((clip, index) => {
          return (
            <SwiperSlide>
              <div
                className="swiper-child"
                style={{
                  backgroundImage: `url(${clip.image})`,
                }}
                onClick={() => {
                  setLightboxCurrent(index);
                }}
              >
                <button className="swiper-button">
                  <i className="fas fa-play" />
                </button>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
