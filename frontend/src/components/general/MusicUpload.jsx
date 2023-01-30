import {
  DeleteOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { message, Upload } from "antd";
import { useState } from "react";
import client from "../../apiConfig/api";
import { toast } from "react-toastify";
import { assetsLocations } from "../../utils/assetsLocations";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isMusic = file.type === "audio/mp3" || file.type === "audio/mpeg";
  if (!isMusic) {
    message.error("This is not an audio file!");
  }

  return isMusic;
};

const MusicUpload = ({ music, setMusic, setLoad, loading }) => {
  const handleDelete = async () => {
    const filename = music.split("/")[music.split("/").length - 1];

    const data = {
      music: filename,
    };
    try {
      const apiCall = await client.delete(`/music/delete-music/`, data);

      if (apiCall.ok) {
        setMusic("");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = async (info) => {
    setLoad();
    const data = new FormData();
    data.append("music", info.file.originFileObj);
    data.append("type", "music");
    try {
      const apiCall = await client.post("/music/upload-music", data);
      if (apiCall.ok) {
        setMusic(apiCall.data.path);
        toast.success("La musique a été ajouté avec succès");
      }
    } catch (ee) {
      console.log(ee);
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Televerser le fichier audio
      </div>
    </div>
  );
  return (
    <>
      {music === "" ? (
        <Upload
          listType="text"
          name="music"
          className="music-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {uploadButton}
        </Upload>
      ) : (
        <div className="image__upload_preview">
          <audio controls>
            <source
              src={`${assetsLocations.music}/${music}`}
              type="audio/mpeg"
            />
          </audio>
          <div className="image__upload_preview_controls">
            <button className="admin__btn" onClick={handleDelete}>
              <DeleteOutlined />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default MusicUpload;
