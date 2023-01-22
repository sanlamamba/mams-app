import mongoose from "mongoose";
const { Schema } = mongoose;

export const imageSchema = new Schema(
  {
    path: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Image", imageSchema);
