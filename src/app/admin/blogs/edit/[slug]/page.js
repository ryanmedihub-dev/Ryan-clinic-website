
import { getBlogBySlug } from "@/lib/blogData";
import EditBlog from "./EditBlog";

export default async function EditBlogPage({ params }) {

  const { slug } = await params;
  
  
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return <div className="p-4 text-red-500">Blog post not found</div>;
  }

  return <EditBlog initialData={blog} />;
}