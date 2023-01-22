import React from "react";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import galerieList from "../../../data/GalerieList";
import { useState } from "react";
import { Image } from "antd";
import client from "../../../apiConfig/api";

export default function GalerieNew() {
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    let file = e.target.files[0];
    // setUploadButtonText(file.name);
    // setValues({
    //   ...values,
    //   loading: true,
    // });
    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("type", "images");
    try {
      const apiCall = await client.post("/image/upload-image", formData);
      const { data } = apiCall;
      if (apiCall.ok) {
        console.log(data);

        // setImage(data.path);
        // toast.success(data.message);
      } else {
        // toast.error(data.message);
      }
    } catch (e) {
      // toast.error("Error uploading image");
    }
    setUploading(false);
  };

  return (
    <div className="container">
      <div className="row my-2 d-flex justify-content-end">
        <Link to={"/admin/galerie/"} className="btn btn-outline-danger">
          Voir la galerie
        </Link>
      </div>
      <div className="row">
        <div className="image__new_container">
          {galerieList.map(function (image, i) {
            return <ImageUploaded src={image} index={i} />;
          })}
          {!uploading && <ImageUploader uploadImage={handleImageUpload} />}
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
