// lib/blogData.js
import { DBConnection } from "./db.js";
import Blog from "@/models/blog.js";

export const getAllBlogs = async () => {
  try {
    await DBConnection();
    const blogs = await Blog.aggregate([
      {
        $addFields: {
          effectiveSortDate: { $ifNull: ["$publishedAt", "$createdAt"] },
        },
      },
      { $sort: { effectiveSortDate: -1 } },
      { $project: { effectiveSortDate: 0 } },
    ]);
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
    const blogs = await Blog.aggregate([
      {
        $addFields: {
          effectiveSortDate: { $ifNull: ["$publishedAt", "$createdAt"] },
        },
      },
      { $sort: { effectiveSortDate: -1 } },
      { $limit: 6 },
      {
        $project: {
          pageUrl: 1,
          blogTitle: 1,
          pageTitle: 1,
          pageImageUrl: 1,
          pageImageAlt: 1,
          createdAt: 1,
          publishedAt: 1,
        },
      },
    ]);
    return JSON.parse(JSON.stringify(blogs || []));
  } catch (error) {
    console.error("getHomepageBlogs error:", error.message);
    return [];
  }
};

export const getBlogBySlug = async (slug) => {
  try {
    await DBConnection();
    const cleanSlug = decodeURIComponent(slug).trim();
    const stripped = cleanSlug.replace(/^\/+/, "").replace(/\/+$/, "");

    let blog = await Blog.findOne({
      $or: [
        { pageUrl: cleanSlug },
        { pageUrl: stripped },
        { pageUrl: `/${stripped}` },
      ],
    }).lean();

    if (!blog) {
      const escaped = stripped.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      blog = await Blog.findOne({
        pageUrl: { $regex: new RegExp(`^/?${escaped}/?$`, "i") },
      }).lean();
    }
    return blog ? JSON.parse(JSON.stringify(blog)) : null;
  } catch (error) {
    console.error("getBlogBySlug error:", error.message);
    return null;
  }
};
