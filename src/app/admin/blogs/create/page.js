"use client";

import { useRef, useState } from "react";
import AdminHeader from "@/components/admin/adminHeader";
import dynamic from "next/dynamic";
import ImageUploader from "@/components/admin/ImageUploader";

const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });
import "suneditor/dist/css/suneditor.min.css";

const Blog = () => {
  const editorRef = useRef(null);

  const [formData, setFormData] = useState({
    metaTitle: "",
    metaDiscription: "",
    pageTitle: "",
    pageDiscription: "",
    pageUrl: "",
    pageImageUrl: "",
    pageImageAlt: "",
    blogTitle: "",
    blogContent: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditorChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      blogContent: content,
    }));
  };

  const handleImageUpload = (url) => {
    setFormData((prev) => ({
      ...prev,
      pageImageUrl: url,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/blog/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    console.log(data);

    if (data.status === 200) {
      alert("Blog created successfully");
      setFormData({
        metaTitle: "",
        metaDiscription: "",
        pageTitle: "",
        pageDiscription: "",
        pageUrl: "",
        pageImageUrl: "",
        pageImageAlt: "",
        blogTitle: "",
        blogContent: "",
      });
      if (editorRef.current) {
        editorRef.current.setContents("");
      }
    }
  };

  return (
    <section className="p-4">
      <AdminHeader title="/ Create Blog" />

      <form onSubmit={handleSubmit} className="space-y-6 px-6 mx-auto ">
        <h3 className="text-2xl font-bold underline mb-5">Meta Details</h3>

        <div className="flex gap-6 flex-col md:flex-row">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">
              Meta Title
            </label>
            <input
              type="text"
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-md"
              placeholder="Enter meta title"
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">
              Meta Description
            </label>
            <input
              type="text"
              name="metaDiscription"
              value={formData.metaDiscription}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-md"
              placeholder="Enter meta description"
              required
            />
          </div>
        </div>

        <h3 className="text-2xl font-bold underline mb-5">Banner Content</h3>

        <div className="flex gap-6 flex-col md:flex-row">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">
              Page URL
            </label>
            <input
              type="text"
              name="pageUrl"
              value={formData.pageUrl}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-md"
              placeholder="https://your-page-url.com"
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">
              Banner Title
            </label>
            <input
              type="text"
              name="pageTitle"
              value={formData.pageTitle}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-md"
              placeholder="Enter page title"
              required
            />
          </div>
        </div>
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">
            Banner Description
          </label>
          <input
            type="text"
            name="pageDiscription"
            value={formData.pageDiscription}
            onChange={handleChange}
            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-md"
            placeholder="Enter page Discription"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Banner Image URL
          </label>

          <ImageUploader onUpload={handleImageUpload} />
        </div>
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">
            Image Alt
          </label>
          <input
            type="text"
            name="pageImageAlt"
            value={formData.pageImageAlt}
            onChange={handleChange}
            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-md"
            placeholder="Enter image Alt"
            required
          />
        </div>

        <h3 className="text-2xl font-bold underline mt-10 mb-5">
          Blog Body Content
        </h3>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Blog Title
          </label>
          <input
            type="text"
            name="blogTitle"
            value={formData.blogTitle}
            onChange={handleChange}
            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-md"
            placeholder="Enter blog title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Blog Content (HTML)
          </label>
          <SunEditor
            getSunEditorInstance={(sunEditor) => {
              editorRef.current = sunEditor;
            }}
            onChange={handleEditorChange}
            defaultValue=""
            setOptions={{
              height: "400px",
              buttonList: [
                ["undo", "redo"],
                ["font", "fontSize", "formatBlock"],
                [
                  "bold",
                  "underline",
                  "italic",
                  "strike",
                  "subscript",
                  "superscript",
                ],
                ["fontColor", "hiliteColor"],
                ["align", "horizontalRule", "list", "table"],
                ["link", "image", "video"],
                ["fullScreen", "showBlocks", "codeView"],
                ["preview", "print"],
              ],
              defaultStyle:
                "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; font-size: 16px;",
            }}
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default Blog;
