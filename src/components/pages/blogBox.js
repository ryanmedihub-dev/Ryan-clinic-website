"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const BlogCarousel = ({ blogsdata }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoplayRef = useRef(null);

  const blogs = blogsdata || [];

  useEffect(() => {
    if (!blogs.length) return;
    autoplayRef.current = setInterval(() => {
      if (!isHovered) {
        setActiveIndex((prev) => (prev + 1) % blogs.length);
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
          setActiveIndex((prev) => (prev + 1) % blogs.length);
        }
      }, 5000);
    }
  };

  const goToPrevious = () =>
    setActiveIndex(activeIndex === 0 ? blogs.length - 1 : activeIndex - 1);

  const goToNext = () =>
    setActiveIndex(activeIndex === blogs.length - 1 ? 0 : activeIndex + 1);

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
    return (
      <p className="text-center py-12" style={{ color: "var(--text-muted)" }}>
        No blogs available
      </p>
    );
  }

  return (
    <section className="py-16 md:py-24" style={{ background: "var(--bg-soft)" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            {/* Section label */}
            <div className="flex items-center gap-3 mb-4">
              <span
                className="block w-8 h-px"
                style={{ background: "var(--primary-red)" }}
              />
              <span
                className="text-[11px] font-semibold tracking-[0.22em] uppercase"
                style={{ color: "var(--primary-red)" }}
              >
                Hair Transplant Insights
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Latest{" "}
              <span style={{ color: "var(--primary-red)" }}>Articles</span>
            </h2>
            <p
              className="text-sm md:text-base leading-relaxed mt-3 max-w-lg"
              style={{ color: "var(--text-muted)" }}
            >
              Expert advice on hair restoration, Sapphire FUE, aftercare and
              everything you need to know before your procedure.
            </p>
          </div>

          <Link
            href="/blog"
            className="hidden lg:inline-flex items-center gap-2 font-semibold text-sm py-3 px-6 rounded-xl border transition-colors shrink-0"
            style={{
              borderColor: "var(--primary-red)",
              color: "var(--primary-red)",
            }}
          >
            View All Articles
            <svg
              className="w-4 h-4"
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

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Prev arrow */}
          <button
            onClick={goToPrevious}
            className="absolute hidden md:flex -left-14 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full items-center justify-center transition-colors"
            style={{
              background: "var(--bg-main)",
              border: "1px solid var(--border-light)",
              color: "var(--primary-red)",
            }}
          >
            <svg
              className="w-5 h-5"
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

          {/* Next arrow */}
          <button
            onClick={goToNext}
            className="absolute hidden md:flex -right-14 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full items-center justify-center transition-colors"
            style={{
              background: "var(--bg-main)",
              border: "1px solid var(--border-light)",
              color: "var(--primary-red)",
            }}
          >
            <svg
              className="w-5 h-5"
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
                  <div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6 rounded-2xl p-6 md:p-8"
                    style={{
                      background: "var(--bg-main)",
                      border: "1px solid var(--border-light)",
                    }}
                  >
                    {/* Main featured post */}
                    <div className="relative overflow-hidden rounded-xl h-80 md:h-96 group">
                      <Image
                        src={blog.pageImageUrl || "/api/placeholder/400/250"}
                        alt={blog.blogTitle}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Gradient overlay */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(165,0,0,0.92) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)",
                        }}
                      />

                      {/* Featured badge */}
                      <div className="absolute top-4 left-4">
                        <span
                          className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md"
                          style={{
                            background: "var(--accent-gold)",
                            color: "#000",
                          }}
                        >
                          Featured
                        </span>
                      </div>

                      {/* Bottom content */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                        <div
                          className="text-xs mb-2 font-medium"
                          style={{ color: "var(--accent-gold-light)" }}
                        >
                          {formatDate(blog.createdAt)}
                        </div>
                        <h3 className="text-white text-lg md:text-xl font-bold mb-2 leading-snug line-clamp-2">
                          {blog.blogTitle}
                        </h3>
                        <p className="text-gray-300 text-xs leading-relaxed mb-4 line-clamp-2">
                          {blog.metaDiscription}
                        </p>
                        <Link
                          href={`/blog/${blog.pageUrl}`}
                          className="inline-flex items-center gap-2 text-white font-semibold text-sm group/link"
                        >
                          Read Article
                          <svg
                            className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform"
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

                    {/* Sidebar: 3 related posts */}
                    <div className="flex flex-col gap-4 justify-between">
                      {blogs
                        .filter((b) => b._id !== blog._id)
                        .slice(0, 3)
                        .map((sideBlog) => (
                          <Link
                            href={`/blog/${sideBlog.pageUrl}`}
                            key={sideBlog._id}
                            className="group/card flex items-start gap-4 p-4 rounded-xl transition-all"
                            style={{
                              background: "var(--bg-card)",
                              border: "1px solid var(--border-soft)",
                            }}
                          >
                            {/* Thumbnail */}
                            <div
                              className="shrink-0 relative w-20 h-20 rounded-lg overflow-hidden"
                              style={{ borderLeft: "3px solid var(--primary-red)" }}
                            >
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

                            {/* Text */}
                            <div className="flex-1 min-w-0">
                              <p
                                className="text-[11px] font-semibold uppercase tracking-wider mb-1"
                                style={{ color: "var(--primary-red)" }}
                              >
                                {formatDate(sideBlog.createdAt)}
                              </p>
                              <h4
                                className="text-sm font-semibold leading-snug line-clamp-2 transition-colors group-hover/card:underline"
                                style={{ color: "var(--text-primary)" }}
                              >
                                {sideBlog.blogTitle}
                              </h4>
                            </div>
                          </Link>
                        ))}

                      {/* All blogs link */}
                      <Link
                        href="/blog"
                        className="mt-auto flex items-center justify-center gap-2 font-semibold text-sm py-3 px-5 rounded-xl border transition-colors"
                        style={{
                          borderColor: "var(--primary-red)",
                          color: "var(--primary-red)",
                        }}
                      >
                        Browse All Articles
                        <svg
                          className="w-4 h-4"
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
                </div>
              ))}
            </div>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center mt-7 gap-2">
            {blogs.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: index === activeIndex ? "28px" : "10px",
                  height: "10px",
                  background:
                    index === activeIndex
                      ? "var(--primary-red)"
                      : "var(--border-light)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Mobile view all */}
        <div className="mt-8 text-center lg:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-semibold text-sm py-3 px-6 rounded-xl border"
            style={{
              borderColor: "var(--primary-red)",
              color: "var(--primary-red)",
            }}
          >
            View All Articles
            <svg
              className="w-4 h-4"
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
