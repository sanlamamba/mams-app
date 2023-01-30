import React, { useState } from "react";
import client from "../../apiConfig/api";
import { useEffect } from "react";
import { useRef } from "react";
import {
  CaretRightFilled,
  DownloadOutlined,
  PauseOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { assetsLocations } from "../../utils/assetsLocations";
import { toast } from "react-toastify";

export default function ProjetBox() {
  const playing = useSelector((state) => state.auth.playing);
  const currentSong = useSelector((state) => state.auth.projet);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const [music, setMusic] = useState([]);
  const [musicState, setMusicState] = useState({
    currentTime: "00:00",
    currentProgress: 0,
  });

  const setCurrentSong = async ({
    index,
    title,
    link,
    downloads,
    play = true,
  }) => {
    dispatch({ type: "STOP_PLAYING" });
    await setTimeout(() => {}, 500);

    dispatch({
      type: "SET_CURRENT_SONG",
      payload: { index: index, title: title, link: link },
    });
    await setTimeout(() => {}, 500);
    if (play) dispatch({ type: "START_PLAYING" });
  };

  const [playMode, setPlayMode] = useState("once");

  const convertToTime = (time) => {
    return new Date(audioRef.current.currentTime * 1000)
      .toISOString()
      .slice(14, 19);
  };
  const createTimeoutForProgress = () => {
    const currTime = convertToTime(audioRef.current.currentTime);
    const endTime = audioRef.current.duration;
    const progress =
      (audioRef.current.currentTime / audioRef.current.duration) * 100;
    if (audioRef.current.currentTime >= audioRef.current.duration) {
      if (playMode === "loop") {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      } else if (playMode === "once") {
        autoNextSong();
      }
    }
    setMusicState({
      ...musicState,
      currentTime: currTime,
      currentProgress: progress,
    });
  };
  const autoNextSong = () => {
    if (currentSong.index + 1 < music.length) {
      setCurrentSong({
        title: music[currentSong.index + 1].title,
        index: currentSong.index + 1,
        link: music[currentSong.index + 1].audio,
      });
    } else {
      setCurrentSong({
        title: music[0].title,
        index: 0,
        link: music[0].audio,
      });
    }
  };
  const setPlaying = ({ type }) => {
    if (playing) {
      dispatch({ type: "STOP_PLAYING" });
    } else {
      dispatch({ type: "START_PLAYING" });
    }
  };
  const shareMusic = () => {
    navigator.clipboard.writeText(
      `${assetsLocations.music}/${currentSong.link}`
    );
    toast.success("Lien copié ");
  };

  const downloadMusic = () => {
    dispatch({
      type: "INCREMENT_READ_COUNT",
      payload: music[currentSong.index]._id,
    });
    window.open(
      `${assetsLocations.music}/${currentSong.link}`,
      "_blank",
      "noreferrer"
    );
  };
  const loadData = async () => {
    dispatch({ type: "STOP_PLAYING" });

    try {
      const apiCall = await client.get("/music");
      if (apiCall.ok) {
        const { data } = apiCall.data;
        setMusic(data);
        if (data.length > 0) {
          setCurrentSong({
            index: 0,
            title: data[0].title,
            link: data[0].audio,
            play: false,
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
    dispatch({ type: "STOP_PLAYING" });
  };
  useEffect(() => {
    loadData();
  }, []);
  const audioRef = useRef(null);

  useEffect(() => {
    if (playing && musicState.currentProgress !== "100") {
      audioRef.current.play();

      setInterval(() => {
        createTimeoutForProgress();
      }, 1000);
    } else {
      audioRef.current.pause();
    }
  }, [playing]);

  const changeAudioSrc = async () => {
    const link = `${assetsLocations.music}/${currentSong.link}`;
    audioRef.current.children[0].src = link;
    await audioRef.current.load();
  };

  useEffect(() => {
    changeAudioSrc();
  }, [currentSong.link]);

  return (
    <div className="row projectbox__container p-4">
      <div className="col-md-4 col-12 music__player_container px-3 ">
        <div className="row mb-2">
          <audio controls ref={audioRef} hidden>
            {currentSong.link && (
              <source
                src={`${assetsLocations.music}/${currentSong.link}`}
                type="audio/mpeg"
              />
            )}
          </audio>

          <div className="col-md-10 col-12">
            <img
              src="/assets/images/album-cover.jpg"
              alt=""
              srcset=""
              className="projet_img"
            />
            <h3 className="music__player_title">{currentSong.title}</h3>
            <h5 className="mt-1">Back Home</h5>
          </div>
          <div className="col-md-2 col-12 d-flex flex-md-column flex-row  justify-content-md-center justify-content-between  align-items-center">
            <button
              type="button"
              className="projet-btn mt-2"
              onClick={downloadMusic}
            >
              <DownloadOutlined />
            </button>
            <button
              type="button"
              className="projet-btn mt-3"
              onClick={shareMusic}
            >
              <img
                src="/assets/images/share.png"
                className="button__img"
                alt="button mams"
              />
              <img
                src="/assets/images/share-hover.png"
                className="button__img"
                alt="button mams"
              />
            </button>
            <button
              type="button"
              className={`projet-btn mt-3 ${
                playMode === "loop" ? "active" : ""
              }`}
              onClick={() => {
                setPlayMode("loop");
              }}
            >
              <img
                src="/assets/images/loop.png"
                className="button__img"
                alt="button mams"
              />
              <img
                src="/assets/images/loop-hover.png"
                className="button__img"
                alt="button mams"
              />
            </button>
            <button
              type="button"
              className={`projet-btn mt-3 ${
                playMode === "once" ? "active" : ""
              }`}
              onClick={() => {
                setPlayMode("once");
              }}
            >
              <img
                src="/assets/images/fade.png"
                className="button__img"
                alt="button mams"
              />
              <img
                src="/assets/images/fade-hover.png"
                className="button__img"
                alt="button mams"
              />
            </button>
            {playing ? (
              <button
                type="button"
                className="projet-btn-main primary-btns mt-3"
                onClick={() => setPlaying(false)}
              >
                <PauseOutlined
                  style={{
                    fontSize: "2rem",
                    color: "#fafafa",
                  }}
                />
              </button>
            ) : (
              <button
                type="button"
                className="projet-btn-main primary-btns mt-3"
                onClick={() => setPlaying(true)}
              >
                <CaretRightFilled
                  style={{
                    fontSize: "2rem",
                    color: "#fafafa",
                  }}
                />
              </button>
            )}
            <h6 className="mt-3 projet__timing d-none d-md-block">
              {musicState.currentTime}
            </h6>
          </div>
        </div>
        <div className="row">
          <div className="music__progress_container">
            <div
              className="music__progress_handle"
              style={{ width: `${musicState.currentProgress}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="col-md-8 col-12 mt-3 ">
        <div className="music__list_container">
          {music.map((music, index) => {
            return (
              <MusicSolo
                setCurrentSong={setCurrentSong}
                title={music.title}
                downloads={music.meta.read}
                key={index}
                index={index}
                link={music.audio}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MusicSolo({ title, downloads, link, setCurrentSong, index }) {
  return (
    <div className="music__solo d-flex justify-content-start align-items-center">
      <button
        type="button"
        className="music_list_btn primary-btns"
        onClick={() => setCurrentSong({ title, index, link, downloads })}
      >
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
