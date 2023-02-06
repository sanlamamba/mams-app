import {
  DeleteOutlined,
  EditOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import client from "../../../apiConfig/api";
import { useEffect } from "react";
import { assetsLocations } from "../../../utils/assetsLocations";

export default function MusicContainer() {
  const requestDelete = async (id) => {
    try {
      const apiCall = await client.delete(`/music/delete/`, {
        id: id,
      });
      if (apiCall.ok) {
        toast.success("music deleted successfully");
        loadData();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  const [music, setMusic] = useState([]);
  const loadData = async () => {
    try {
      const apiCall = await client.get("music");
      if (apiCall.ok) {
        const { data } = apiCall.data;
        setMusic(data);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  console.log(music);
  return (
    <div className="music__list_containers">
      {music.map(function (music, i) {
        return (
          <SoloMusic
            requestDelete={requestDelete}
            title={music.title}
            src={`${assetsLocations.music}/${music.audio}`}
            id={music._id}
            read={music.meta.read}
          />
        );
      })}
    </div>
  );
}

function SoloMusic({ title, src, id, requestDelete, read }) {
  return (
    <div className="solo__music_container">
      <span className="mb-1 d-flex align-items-center">
        <h4 className="mx-1">{title}</h4>
        <h6 className="mx-1 d-flex align-items-center fs-6">
          <PlayCircleOutlined
            style={{
              margin: "0 5px",
            }}
          />
          {read}
        </h6>
      </span>

      <audio controls>
        <source src={src} type="audio/mpeg" />
      </audio>
      <div className="mt-3 d-flex">
        <button className="admin__btn mx-2" onClick={() => requestDelete(id)}>
          <DeleteOutlined />
        </button>
        <Link to={`/admin/projet/${id}`} className="admin__btn mx-2">
          <EditOutlined />
        </Link>
      </div>
    </div>
  );
}
