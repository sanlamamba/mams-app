import React from "react";
import MusicList from "../../data/MusicList";

export default function ProjetBox() {
  console.log(MusicList);

  return (
    <div className="row projectbox__container p-4">
      <div className="col-md-4 col-12 music__player_container px-3 ">
        <div className="row mb-2">
          <div className="col-md-10 col-12">
            <img
              src="/assets/images/album-cover.jpg"
              alt=""
              srcset=""
              className="projet_img"
            />
            <h3>Baby Mama</h3>
            <h5 className="mt-1">Back Home</h5>
          </div>
          <div className="col-md-2 col-12 d-flex flex-md-column flex-row  justify-content-md-center justify-content-between  align-items-center">
            <button type="button" className="projet-btn mt-2">
              <i class="fas fa-download"></i>
            </button>
            <button type="button" className="projet-btn mt-3">
              <i class="fa fa-share" aria-hidden="true"></i>
            </button>
            <button type="button" className="projet-btn mt-3">
              <i class="fa fa-arrow-circle-left" aria-hidden="true"></i>
            </button>
            <button type="button" className="projet-btn mt-3">
              <i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
            </button>
            <button type="button" className="projet-btn-main primary-btns mt-3">
              <i
                class="fa fa-play"
                aria-hidden="true"
                style={{
                  fontSize: "30px",
                }}
              ></i>
            </button>
            <h6 className="mt-3 projet__timing d-none d-md-block">2:03</h6>
          </div>
        </div>
        <div className="row">
          <div className="music__progress_container">
            <div
              className="music__progress_handle"
              style={{ width: "0%" }}
            ></div>
          </div>
        </div>
      </div>
      <div className="col-md-8 col-12 mt-3 music__list_container">
        {MusicList.map((music, index) => {
          return (
            <MusicSolo
              title={music.title}
              downloads={music.stats.download}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}

function MusicSolo({ title, downloads, link }) {
  return (
    <div className="d-flex align-items-end">
      <button type="button" className="music_list_btn primary-btns">
        <i class="fa fa-play text-white" aria-hidden="true"></i>
      </button>
      <h6 className="music_list_title text-dark">{title}</h6>
      <p className="music_list_meta">
        {downloads}
        <i class="fa fa-download" aria-hidden="true"></i>
      </p>
    </div>
  );
}
