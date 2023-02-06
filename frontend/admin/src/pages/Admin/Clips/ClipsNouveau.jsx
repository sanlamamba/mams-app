import React, { useState } from "react";
import ImageUpload from "../../../components/general/ImageUpload";
import { assetsLocations } from "../../../utils/assetsLocations";
import VideoUpload from "../../../components/general/VideoUpload";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import client from "../../../apiConfig/api";

export default function ClipsNouveau() {
  const [loader, setLoader] = useState(false);
  // const navigate = useNavigate();
  const [values, setValues] = useState({
    video: {
      path: "",
      loading: false,
    },
    image: {
      path: "",
      loading: false,
    },
  });
  const setLoading = (type) => {
    setValues({
      ...values,
      [type]: {
        loading: true,
      },
    });
  };

  const setImage = (path) => {
    setValues({
      ...values,
      image: {
        path: path,
        loading: false,
      },
    });
  };
  // const setVideoInput = (path) => {
  //   setValues({
  //     ...values,
  //     video: {
  //       path: path,
  //       loading: false,
  //     },
  //   });
  // };
  const setVideo = (path) => {
    setValues({
      ...values,
      video: {
        path: path,
        loading: false,
      },
    });
  };
  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    try {
      const apiCall = await client.post("/clip/new", values);
      if (apiCall.ok) {
        toast.success("Clip Enregistré");

        setValues({
          video: {
            path: "",
            loading: false,
          },
          image: {
            path: "",
            loading: false,
          },
        });
      }
    } catch (err) {
      toast.error("Une erreur est survenue");
    }
    setLoader(false);
  };
  console.log(values);

  return (
    <div className="container">
      <div className="row ">
        <h3 className="col">Ajouter un nouveau Clip</h3>
        <div className="col d-flex justify-content-end">
          <Link to="/clips" type="button" className="btn btn-outline-danger">
            Liste des clips
          </Link>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12 mt-2">
          <p>Image du clip</p>
          <ImageUpload
            image={
              values.image.path
                ? `${assetsLocations.images}/${values.image.path}`
                : ""
            }
            setLoad={setLoading}
            setImage={setImage}
            loading={values.image.loading}
          />
        </div>
        <div className="col-12 mt-2">
          <p>Video du clip</p>
          <VideoUpload
            video={values.video.path}
            setLoad={setLoading}
            setVideo={setVideo}
            loading={values.video.loading}
          />
        </div>
      </div>
      {values.video.path && values.image.path && (
        <div className="row mt-4">
          <div className="col">
            {loader ? (
              <div class="spinner-grow text-danger" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            ) : (
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleSubmit}
              >
                Enregistrer
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
