import mongoose from "mongoose";
const { Schema } = mongoose;

export const ClipSchema = new Schema(
  {
    video: {
      path: { type: String, required: true },
    },
    image: {
      path: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Clip", ClipSchema);
