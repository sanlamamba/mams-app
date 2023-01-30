import React from "react";
import clipList from "../../../data/ClipList";
import { Link, useLocation } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import client from "../../../apiConfig/api";
import { useEffect } from "react";
import { assetsLocations } from "../../../utils/assetsLocations";
export default function ClipsList() {
  const [clips, setClips] = React.useState([]);

  const loadData = async () => {
    try {
      const apiCall = await client.get("/clip/");
      if (apiCall.ok) {
        setClips(apiCall.data.data);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const requestDelete = async (id) => {
    try {
      const apiCall = await client.delete(`/clip/delete/`, {
        id: id,
      });
      if (apiCall.ok) {
        toast.success("Clip deleted successfully");
        loadData();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col my-2 d-flex justify-content-end">
          <Link
            to={"/admin/clips/nouveau"}
            type="button"
            className="btn btn-outline-danger"
          >
            Nouveau Clip
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 clips__admin_grid">
          {clips.map(function (clip, i) {
            return (
              <ClipBox
                video={`${assetsLocations.videos}/${clip.video.path}`}
                image={`${assetsLocations.images}/${clip.image.path}`}
                id={clip._id}
                requestDelete={requestDelete}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ClipBox({ video, image, id, requestDelete }) {
  return (
    <div className="clip__container">
      <div className="clip__video_container">
        <video loop controls muted>
          <source src={video} type="video/mp4" />
        </video>
      </div>
      <div className="clip__image_container">
        <div className="clip__controls_container">
          <button className="admin__btn" onClick={() => requestDelete(id)}>
            <DeleteOutlined
              style={{
                fontSize: "18px",
              }}
            />
          </button>
          <Link to={`/admin/clips/${id}`} className="admin__btn">
            <EditOutlined
              style={{
                fontSize: "18px",
              }}
            />
          </Link>
        </div>
        <div className="clip__image">
          <img src={image} alt="Mams lightbox" className="img-fluid" />
        </div>
      </div>
    </div>
  );
}
