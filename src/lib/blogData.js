// lib/blogData.js
import { DBConnection } from "./db";
import Blog from "@/models/blog";

export const getAllBlogs = async () => {
  try {
    await DBConnection();
    const blogs = await Blog.find({}).lean();
    return JSON.parse(JSON.stringify(blogs || []));
  } catch (error) {
    console.error("getAllBlogs error:", error.message);
    return [];
  }
};

// Lightweight version for homepage carousel — omits large blogContent HTML field
export const getHomepageBlogs = async () => {
  try {
    await DBConnection();
    const blogs = await Blog.find({})
      .select("pageUrl blogTitle pageTitle pageImageUrl pageImageAlt createdAt")
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();
    return JSON.parse(JSON.stringify(blogs || []));
  } catch (error) {
    console.error("getHomepageBlogs error:", error.message);
    return [];
  }
};

export const getBlogBySlug = async (slug) => {
  try {
    await DBConnection();
    const blog = await Blog.findOne({ pageUrl: slug }).lean();
    return blog ? JSON.parse(JSON.stringify(blog)) : null;
  } catch (error) {
    console.error("getBlogBySlug error:", error.message);
    return null;
  }
};
