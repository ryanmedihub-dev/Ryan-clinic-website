import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  metaTitle: {
    type: String,
    required: true,
  },
  metaDiscription: {
    type: String,
    required: true,
  },
  pageUrl: {
    type: String,
    required: true,
    unique: true,
  },
  pageTitle: {
    type: String,
    required: true,
    minlength: 3,
  },
  pageDiscription: {
    type: String,
    required: true,
  },
  pageImageUrl: {
    type: String,
  },
  pageImageAlt: {
    type: String,
  },
  blogTitle: {
    type: String,
    required: true,
    minlength: 3,
  },
  blogContent: {
    type: String,
    required: true,
    minlength: 20,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
