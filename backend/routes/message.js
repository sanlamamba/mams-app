import express from "express";

const ENDPOINT = "message";
const router = express.Router();

const messageController = require("../controllers/message");

router.post(`/${ENDPOINT}/new`, messageController.newMessage);

// router.post(
//   `/${ENDPOINT}/remove-image`,
//   imageRemover,
//   courseController.removeImage
// );
// router.post(
//   `/${ENDPOINT}/upload-video`,
//   upload.single("video"),
//   courseController.uploadVideo
// );
// router.post(
//   `/${ENDPOINT}/remove-video`,
//   requireToken,
//   isInstructor,
//   videoRemover,
//   courseController.removeVideo
// );

// router.post(
//   `/${ENDPOINT}/view`,
//   requireToken,
//   isInstructor,
//   courseController.viewCourse
// );

// router.post(
//   `/${ENDPOINT}/create-course`,
//   requireToken,
//   isInstructor,
//   courseController.createCourse
// );
// router.post(
//   `/${ENDPOINT}/update-course/:slug`,
//   requireToken,
//   isInstructor,
//   courseController.updateCourse
// );
// router.post(
//   `/${ENDPOINT}/create-lesson/:slug`,
//   requireToken,
//   isInstructor,
//   courseController.createLesson
// );

// router.post(
//   `/${ENDPOINT}/lesson/:slug`,
//   requireToken,
//   isInstructor,
//   courseController.createLesson
// );

module.exports = router;
