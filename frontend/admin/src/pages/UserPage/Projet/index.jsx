import React, { useEffect } from "react";
import ProjetBox from "../../../components/Projet/ProjetBox";
import { useSelector } from "react-redux";
import Popup from "../../../components/general/Popup";

export default function Index() {
  const playing = useSelector((state) => state.auth.playing);
  const followed = useSelector((state) => state.auth.follow);
  const screenWidth = window.innerWidth;
  console.log(screenWidth);

  const [isPermitted, setIsPermitted] = React.useState(false);
  useEffect(() => {
    if (followed.state && !followed.justFollowed) {
      setIsPermitted(true);
    } else {
      setIsPermitted(false);
    }
  }, [followed]);
  useEffect(() => {
    const localFollowed = localStorage.getItem("followed");
    console.log(localFollowed !== null);
    if (localFollowed !== null) {
      console.log("HIT");
      setIsPermitted(true);
    }
  }, []);

  console.log("IS PERMITTED: ", isPermitted);
  // console.log("FOLLOWED : ", followed);

  return (
    <>
      {followed && (
        <Popup open={isPermitted} justFollowed={followed.justFollowed} />
      )}

      <div className="container-fluid pt-2 projet__container mb-md-4 d-flex justify-content-center align-items-md-center projet_container">
        <div className="row">
          <div className="col-md-9 col-12 px-2">
            <ProjetBox />
          </div>
          {screenWidth > 600 ? (
            <img
              src="/assets/images/vinyle.png"
              className={`projet__disc ${playing ? "spin" : ""}`}
              alt="mams vinyle"
            />
          ) : (
            <div className="project__disc_container">
              <img
                src="/assets/images/vinyle.png"
                className={`projet__disc_mobile ${playing ? "spin" : ""}`}
                alt="mams vinyle"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
