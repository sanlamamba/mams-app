import {
  DeleteOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { message, Upload } from "antd";
import { useState } from "react";
import client from "../../apiConfig/api";
import { toast } from "react-toastify";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const ImageUpload = ({ image, setImage, setLoad, loading }) => {
  const handleDelete = async () => {
    const filename = image.split("/")[image.split("/").length - 1];

    const data = {
      image: filename,
    };
    try {
      const apiCall = await client.delete(`/clip/delete-image/`, data);

      if (apiCall.ok) {
        setImage("");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = async (info) => {
    setLoad("image");
    const data = new FormData();
    data.append("image", info.file.originFileObj);
    data.append("type", "images");
    try {
      const apiCall = await client.post("/clip/upload-image", data);
      if (apiCall.ok) {
        setImage(apiCall.data.path);
        toast.success("L'image a été ajouté avec succès");
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
        Televerser
      </div>
    </div>
  );
  return (
    <>
      {image === "" ? (
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {uploadButton}
        </Upload>
      ) : (
        <div className="image__upload_preview">
          <img
            src={image}
            alt="avatar"
            style={{
              width: "150px",
            }}
          />
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
export default ImageUpload;
