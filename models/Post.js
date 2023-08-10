const { model, Schema } = require("mongoose");
// Everything with the word temp is a placeholder that you'll change in accordance with your project

const PostSchema = new Schema(
  {
    image: { type: String, required: true },

    //relation
    user: { type: Schema.Types.ObjectId, ref: "User" },
    place: { type: Schema.Types.ObjectId, ref: "Place" },
  },
  { timestamps: true }
);

module.exports = model("Post", PostSchema);
