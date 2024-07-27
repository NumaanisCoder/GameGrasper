const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: [true, "blog title must required"],
  },
  image: {
    type: String,
    required: [true, "blog image must required"],
  },
  content: {
    type: String,
    required: [true, "blog content must required"],
  },
  comment: [
    {
      type: mongoose.Types.ObjectId, ref:"comment"
    },
  ],
  summary: {
    type: String,
  },
  tags: {
    type: String
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
  views: {
    type: Number,
    default: 0,
  }
});

export const Blog = mongoose.models.BLOG || mongoose.model("BLOG", blogSchema);
