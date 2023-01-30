import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import MusicUpload from "../../../components/general/MusicUpload";
import { toast } from "react-toastify";
import client from "../../../apiConfig/api";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function EditMusic() {
  const id = useParams().id;

  const [loaded, setLoaded] = useState(false);
  const [title, setTitle] = useState("");
  const [music, setMusic] = useState("");
  const [loading, setLoading] = useState(false);
  const setLoad = () => setLoading(true);
  const loadData = async () => {
    try {
      const apiCall = await client.get(`/music/${id}`);

      if (apiCall.ok) {
        const { data } = apiCall.data;

        setTitle(data.title);
        setMusic(data.audio);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const setMusicFile = (path) => {
    setMusic(path);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        title: title,
        audio: music,
      };
      const apiCall = await client.put(`/music/${id}`, body);
      if (apiCall.ok) {
        toast.success("Musique modifié avec succès");
      } else {
        toast.error("Erreur lors de la modification de la musique");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container music__add_container">
      <div className="music__form_container">
        <h3 className="mb-4">Modifier la musique</h3>
        <div className="input_group d-flex flex-column mb-4">
          {/* input for title  */}
          <label htmlFor="title" className="mb-2">
            Titre
          </label>

          <input
            name="title"
            value={title}
            onChange={handleTitle}
            type="text"
            placeholder="Titre"
          />
        </div>
        <div className="input_group d-flex flex-column mb-4">
          {/* input for title  */}
          <label htmlFor="title" className="mb-2">
            Fichier Audio
          </label>

          <MusicUpload
            music={music}
            setMusic={setMusic}
            setLoad={setLoad}
            loading={loading}
          />
        </div>

        <div className="">
          <button
            className="btn btn-danger d-flex align-items-center"
            onClick={handleSubmit}
          >
            <span className="px-2">Enregistrer</span>
            <PlusOutlined />
          </button>
        </div>
      </div>
    </div>
  );
}
