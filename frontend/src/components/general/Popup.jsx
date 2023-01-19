import React from "react";
import { useDispatch } from "react-redux";

export default function Popup({ open }) {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const followClicked = () => {
    window.open("https://www.instagram.com/p/nhqlv/", "_blank");
    setLoading(true);
    // after 5 seconds, set loading to false and dispatch redux action grant permission
    setTimeout(() => {
      setLoading(false);
      dispatch({
        type: "GRANT_PERMISSION_REQUEST",
      });
    }, 5000);
  };

  return (
    <>
      {!open && (
        <div className="popup__container">
          <div className="popup container">
            <div className="row">
              <div className="col-3 p-0 m-0 popup_image">
                <img src="/assets/images/album-cover.jpg" alt="" srcset="" />
                <div className="popup_separator"></div>
              </div>
              <div className="col-9 d-flex justify-content-evenly align-items-center flex-column">
                <p>Suis moi sur instagram pour decouvrir l'album</p>
                <h2>
                  <i class="fa fa-instagram px-3" aria-hidden="true"></i>
                  @nhqlv
                </h2>
                {loading ? (
                  <>
                    Verification
                    <div class="spinner-border text-danger" role="status">
                      <span class="visually-hidden">Verfication...</span>
                    </div>
                  </>
                ) : (
                  <button
                    type="button"
                    className="follow-button btn border-radius-0"
                    onClick={followClicked}
                  >
                    Follow
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
