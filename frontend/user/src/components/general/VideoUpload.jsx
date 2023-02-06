import {
  DeleteOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Upload } from "antd";
import client from "../../apiConfig/api";
import { toast } from "react-toastify";

// const getBase64 = (img, callback) => {
//   const reader = new FileReader();
//   reader.addEventListener("load", () => callback(reader.result));
//   reader.readAsDataURL(img);
// };
// const beforeUpload = (file) => {
//   const isVideo =
//     file.type === "video/mp4" ||
//     file.type === "video/webm" ||
//     file.type === "video/ogg" ||
//     file.type === "video/flv" ||
//     file.type === "video/avi";

//   if (isVideo) {
//     message.error("You can only upload videos");
//   }
//   console.log(file.type);

//   return isVideo;
// };

const VideoUpload = ({ video, setVideo, setLoad, loading }) => {
  const handleDelete = async () => {
    const filename = video.split("/")[video.split("/").length - 1];

    const data = {
      video: filename,
    };
    try {
      const apiCall = await client.delete(`/clip/delete-video/`, data);

      if (apiCall.ok) {
        setVideo("");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = async (info) => {
    setLoad("video");
    const data = new FormData();
    data.append("video", info.file.originFileObj);
    data.append("type", "videos");
    try {
      const apiCall = await client.post("/clip/upload-video", data);
      if (apiCall.ok) {
        setVideo(apiCall.data.path);
        toast.success("La video a été ajouté avec succès");
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
      {/* {video === "" ? ( */}
      <div className="video_uploader">
        <p>Lien Youtube</p>
        {/* input for youtube link */}
        <input
          type="text"
          name="video"
          id="video"
          value={video}
          onChange={(e) => {
            setVideo(e.target.value);
          }}
          placeholder="https://www.youtube.com/embed/xxxxxxxxxx"
        />

        {/* <Upload
          name="video"
          listType="picture-card"
          className="video-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          // beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {uploadButton}
        </Upload> */}
      </div>
      {/* ) : (
        <div className="image__upload_preview">
          <video loop controls muted width={"480"} height={"auto"}>
            <source src={video} type="video/mp4" />
          </video>

          <div className="image__upload_preview_controls">
            <button className="admin__btn" onClick={handleDelete}>
              <DeleteOutlined />
            </button>
          </div>
        </div>
      )} */}
    </>
  );
};
export default VideoUpload;
