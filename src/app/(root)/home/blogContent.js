import React from "react";
import { getHomepageBlogs } from "@/lib/blogData";
import BlogCarousel from "@/components/pages/blogBox";

const blogContent = async () => {
  const blogsNew = await getHomepageBlogs();

  return <div>

        <BlogCarousel blogsdata={blogsNew} />

  </div>;
};

export default blogContent;
