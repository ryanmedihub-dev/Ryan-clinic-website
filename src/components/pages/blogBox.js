"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const BlogCarousel = ({ blogsdata }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoplayRef = useRef(null);

  const blogs = blogsdata || [];

  // Auto-play
  useEffect(() => {
    if (!blogs.length) return;
    autoplayRef.current = setInterval(() => {
      if (!isHovered) {
        setActiveIndex((prevIndex) => (prevIndex + 1) % blogs.length);
      }
    }, 5000);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [blogs.length, isHovered]);

  const goToSlide = (index) => {
    setActiveIndex(index);
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = setInterval(() => {
        if (!isHovered) {
          setActiveIndex((prevIndex) => (prevIndex + 1) % blogs.length);
        }
      }, 5000);
    }
  };

  const goToPrevious = () => {
    setActiveIndex(activeIndex === 0 ? blogs.length - 1 : activeIndex - 1);
  };

  const goToNext = () => {
    setActiveIndex(activeIndex === blogs.length - 1 ? 0 : activeIndex + 1);
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "";
    }
  };

  if (!blogs.length) {
    return <p className="text-center text-gray-500">No blogs available</p>;
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mt-4 md:mt-0">
              Latest Articles
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl">
              Stay updated with our latest blogs and articles.
            </p>
          </div>
          {/* <Link href="/blog" className="hidden lg:flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors group">
            View All Blogs
            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link> */}
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute md:block hidden -left-14 top-1/2 -translate-y-1/2 z-10  rounded-full p-3 text-7xl hover:bg-gray-100 transition-all"
          >
            <svg
              className="w-10 h-10 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute md:block hidden -right-14 top-1/2 -translate-y-1/2 z-10 rounded-full p-3 text-7xl hover:bg-gray-100 transition-all"
          >
            <svg
              className="w-10 h-10 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Slides */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {blogs.map((blog) => (
                <div key={blog._id} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:bg-white rounded-2xl md:p-8 md:shadow-lg">
                    {/* Main Post */}
                    <div className="relative overflow-hidden rounded-xl h-96">
                      <Image
                        src={blog.pageImageUrl || "/api/placeholder/400/250"}
                        alt={blog.blogTitle}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/100 to-transparent p-6 text-white">
                        <div className="flex items-center text-sm mb-3">
                          <span>{formatDate(blog.createdAt)}</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-3">
                          {blog.blogTitle}
                        </h3>
                        <p className="text-gray-200 mb-4">
                          {blog.metaDiscription}
                        </p>
                        <Link
                          href={`/blog/${blog.pageUrl}`}
                          className="inline-flex items-center text-white font-medium group"
                        >
                          Read More
                          <svg
                            className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>

                    {/* Sidebar: latest 3 excluding current */}
                    <div className="flex flex-col space-y-6">
                      {blogs
                        .filter((b) => b._id !== blog._id)
                        .slice(0, 3)
                        .map((sideBlog) => (
                          <Link
                            href={`/blog/${sideBlog.pageUrl}`}
                            key={sideBlog._id}
                          >
                            <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 shadow-md transition-colors">
                              <div className="flex-shrink-0 relative w-20 h-20 rounded-lg overflow-hidden">
                                <Image
                                  src={
                                    sideBlog.pageImageUrl ||
                                    "/api/placeholder/100/100"
                                  }
                                  alt={sideBlog.blogTitle}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-sm font-semibold text-gray-800 mt-1 line-clamp-2">
                                  {sideBlog.blogTitle}
                                </h4>
                                <div className="flex items-center text-xs text-gray-500 mt-2">
                                  <span>{formatDate(sideBlog.createdAt)}</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}

                      {/* <div className="mt-auto pt-6 border-t border-gray-200">
                        <Link href="/blog" className="flex items-center justify-center text-blue-600 hover:text-blue-800 font-medium group">
                          Browse all articles
                          <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </div> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8 space-x-3">
            {blogs.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-10 h-2 rounded-full transition-all ${
                  index === activeIndex
                    ? "bg-blue-600"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Mobile view link */}
        <div className="mt-8 text-center lg:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium group"
          >
            View All Blogs
            <svg
              className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogCarousel;
