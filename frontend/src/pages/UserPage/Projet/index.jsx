import React, { useEffect } from "react";
import ProjetBox from "../../../components/Projet/ProjetBox";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Popup from "../../../components/general/Popup";

export default function Index() {
  const playing = useSelector((state) => state.auth.playing);
  const followed = useSelector((state) => state.auth.follow);
  const location = useLocation();

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

      <div className="container-fluid pt-2 projet__container mb-4 d-flex justify-content-center align-items-center projet_container">
        <div className="row">
          <div className="col-md-9 col-12 px-2">
            <ProjetBox />
          </div>
          <img
            src="/assets/images/vinyle.png"
            className={`projet__disc d-none d-md-block ${
              playing ? "spin" : ""
            }`}
            alt="mams vinyle"
          />
        </div>
      </div>
    </>
  );
}
