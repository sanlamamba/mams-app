import Message from "../models/message";

export const newMessage = async (req, res, next) => {
  try {
    const message = new Message(req.body);
    const savedMessage = await message.save();
    res.status(201).json({
      message: "Message successfully created",
      data: savedMessage,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error sendin message",
      data: err,
    });
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find();
    res.status(200).json({
      message: "Messages fetched successfully",
      data: messages,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching messages",
      data: err,
    });
  }
};

export const getNewMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ isRead: false });
    res.status(200).json({
      message: "Messages fetched successfully",
      data: messages,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching messages",
      data: err,
    });
  }
};

export const getMessagesByEmail = async (req, res, next) => {
  try {
    const messages = await Message.find({ email: req.params.email });
    res.status(200).json({
      message: "Messages fetched successfully",
      data: messages,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching messages",
      data: err,
    });
  }
};
