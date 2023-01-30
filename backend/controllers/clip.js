import Clip from "../models/clip";
import transporter from "../utils/nodemailer/transporter";
const fs = require("fs");

const imageRemover = async (image) => {
  const path = "public/images/" + image;
  await fs.unlink(path, (err) => {
    if (err) {
      return false;
    }
    return true;
  });
};

const videoRemover = async (video) => {
  const path = "public/videos/" + video;
  await fs.unlink(path, (err) => {
    if (err) {
      return false;
    }
    return true;
  });
};
export const createClip = async (req, res, next) => {
  try {
    const clip = new Clip(req.body);
    const savedClip = await clip.save();
    res.status(201).json({
      message: "Message successfully created",
      data: savedClip,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating clip",
      error: err,
    });
  }
};

export const uploadImage = async (req, res, next) => {
  try {
    const image = req.file;
    res.status(200).json({
      message: "Image uploaded successfully",
      path: `${image.filename}`,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error uploading image",
      error: err,
    });
  }
};

export const deleteImage = async (req, res, next) => {
  try {
    res.status(200).json({
      message: "Image deleted successfully",
    });
  } catch (e) {
    res.status(500).json({
      message: "Error deleting image.",
      error: e,
    });
  }
};

export const uploadVideo = async (req, res, next) => {
  try {
    const image = req.file;
    res.status(200).json({
      message: "Video uploaded successfully",
      path: `${image.filename}`,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error uploading video",
      error: err,
    });
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    res.status(200).json({
      message: "Video deleted successfully",
    });
  } catch (e) {
    res.status(500).json({
      message: "Error deleting video.",
      error: e,
    });
  }
};
export const getAllClips = async (req, res, next) => {
  try {
    const clips = await Clip.find({});
    res.status(200).json({
      message: "Clips fetched successfully",
      data: clips,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching clips",
      error: err,
    });
  }
};

export const getClip = async (req, res, next) => {
  try {
    const clip = await Clip.findById(req.params.id);
    console.log(clip);

    res.status(200).json({
      message: "Clips fetched successfully",
      data: clip,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting clip",
      data: err,
    });
  }
};

export const deleteClip = async (req, res, next) => {
  try {
    const clip = await Clip.find({ _id: req.query.id });
    const video = clip[0].video.path;
    const image = clip[0].image.path;

    await videoRemover(video);
    await imageRemover(image);
    const deletedClip = await Clip.deleteOne({ _id: req.query.id });

    res.status(200).json({
      message: "Clip deleted successfully",
      data: deletedClip,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting clip",
      data: err,
    });
  }
};

export const updateClip = async (req, res, next) => {
  try {
    const updatedClip = await Clip.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({
      message: "Clip deleted successfully",
      data: updatedClip,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting clip",
      data: err,
    });
  }
};
