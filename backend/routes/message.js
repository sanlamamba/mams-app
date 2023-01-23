import express from "express";

const ENDPOINT = "message";
const router = express.Router();

const messageController = require("../controllers/message");

router.post(`/${ENDPOINT}/new`, messageController.newMessage);

router.get(`/${ENDPOINT}`, messageController.getMessages);
router.put(`/${ENDPOINT}/read/:id`, messageController.setMessageReadByID);
module.exports = router;
