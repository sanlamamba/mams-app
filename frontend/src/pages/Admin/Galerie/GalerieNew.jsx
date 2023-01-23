import React from "react";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import galerieList from "../../../data/GalerieList";
import { useState } from "react";
import { Image } from "antd";
import client from "../../../apiConfig/api";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { assetsLocations } from "../../../utils/assetsLocations";

export default function GalerieNew() {
  const [uploading, setUploading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  console.log(token);

  const handleImageUpload = async (e) => {
    let file = e.target.files[0];

    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("type", "images");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${token}`,
      },
    };
    try {
      const apiCall = await client.post(
        "/image/upload-image",
        formData,
        config
      );

      const { data } = apiCall;
      if (apiCall.ok) {
        console.log(data);
      } else {
        // toast.error(data.message);
      }
    } catch (e) {
      // toast.error("Error uploading image");
    }
    setUploading(false);
  };
  const [galerie, setGalerie] = useState([]);

  const loadData = async () => {
    try {
      const apiCall = await client.get("/image");
      const { data } = apiCall.data;
      if (apiCall.ok) {
        console.log(data);
        setGalerie(data);
      } else {
        // toast.error(data.message);
        console.log(data);
      }
    } catch (e) {
      console.log(e);
      // toast.error("Error loading data");
      console.log(e);
    }
  };

  console.log(galerie);
  useEffect(() => {
    loadData();
  }, [uploading]);
  return (
    <div className="container">
      <div className="row">
        <div className="image__new_container">
          {!uploading ? (
            <ImageUploader uploadImage={handleImageUpload} />
          ) : (
            <div className="d-flex jusify-content-center align-items-center flex-column imageUpload">
              <div class="spinner-grow text-danger" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {galerie.map(function (image, i) {
            return (
              <ImageUploaded
                src={`${assetsLocations.images}/${image.path}`}
                index={i}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

const ImageUploaded = ({ src }) => {
  return (
    <div className="admin__image">
      <Image src={src} className="img-fluid uploaded_image " />
    </div>
  );
};

const ImageUploader = ({ uploadImage }) => {
  return (
    <div className="d-flex jusify-content-center align-items-center flex-column imageUpload">
      <label
        for="ImageUpload"
        className="d-flex justify-content-center align-items-center flex-column "
      >
        <PlusOutlined />
        <div
          style={{
            marginTop: 20,
          }}
        >
          Ajouter une image
        </div>
      </label>
      <input
        type="file"
        id="ImageUpload"
        name="ImageUpload"
        accept="image/*"
        onChange={uploadImage}
      />
    </div>
  );
};
