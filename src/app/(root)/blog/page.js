import Link from "next/link";
import Image from "next/image";
import PageBanner from "@/components/layouts/pageBanner";
import { getAllBlogs } from "@/lib/blogData";
import AboutBanner from "../../../../public/uploads/blog.jpg";
import BlogCTAButtons from "./BlogCTAButtons";



export const revalidate = 60;

export const metadata = {
  title: "Hair Transplant Blog | Expert Tips & Insights | Ryan Clinic",
  description:
    "Explore Ryan Clinic's expert articles on Sapphire FUE, hair transplant aftercare, cost guides, and everything you need to know before your procedure.",
  alternates: {
    canonical: "https://www.clinicryan.com/blog",
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(dateString) {
  try {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}




function readingTime(content = "") {
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

// ─── Featured Card ────────────────────────────────────────────────────────────

function FeaturedCard({ blog }) {
  return (
    <Link
      href={`/blog/${blog.pageUrl}`}
      className="group relative flex flex-col lg:flex-row rounded-2xl overflow-hidden"
      style={{
        background: "var(--bg-main)",
        border: "1px solid var(--border-light)",
        boxShadow: "0 4px 32px rgba(211,47,47,0.07)",
      }}
    >
      {/* Image */}
      <div className="relative w-full lg:w-3/5 h-64 sm:h-80 lg:h-105 shrink-0 overflow-hidden">
        <Image
          src={blog.pageImageUrl || "/uploads/banner.jpg"}
          alt={blog.pageImageAlt || blog.blogTitle}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)",
          }}
        />
        {/* Featured badge */}
        <div className="absolute top-4 left-4 z-10">
          <span
            className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-md"
            style={{ background: "#D32F2F", color: "#fff" }}
          >
            Featured
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10 flex-1">
        {/* Meta */}
        <div>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span
              className="text-[11px] font-semibold uppercase tracking-widest"
              style={{ color: "var(--primary-red)" }}
            >
              Hair Transplant Insights
            </span>
            <span style={{ color: "var(--border-light)" }}>·</span>
            <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
              {formatDate(blog.createdAt)}
            </span>
            <span style={{ color: "var(--border-light)" }}>·</span>
            <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
              {readingTime(blog.blogContent)} min read
            </span>
          </div>

          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug mb-4 transition-colors group-hover:text-[#D32F2F]"
            style={{ color: "var(--text-primary)" }}
          >
            {blog.blogTitle}
          </h2>

          <p
            className="text-sm md:text-base leading-relaxed line-clamp-3"
            style={{ color: "var(--text-muted)" }}
          >
            {blog.metaDiscription}
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 flex items-center gap-3">
          <span
            className="inline-flex items-center gap-2 font-semibold text-sm py-3 px-6 rounded-xl text-white transition-opacity group-hover:opacity-90"
            style={{ background: "var(--primary-red)" }}
          >
            Read Article
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
          <span
            className="text-xs font-medium"
            style={{ color: "var(--text-muted)" }}
          >
            {readingTime(blog.blogContent)} min read
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Blog Card ────────────────────────────────────────────────────────────────

function BlogCard({ blog }) {
  return (
    <Link
      href={`/blog/${blog.pageUrl}`}
      className="group flex flex-col rounded-2xl overflow-hidden h-full transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "var(--bg-main)",
        border: "1px solid var(--border-light)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
      }}
    >
      {/* Thumbnail */}
      <div className="relative w-full h-52 overflow-hidden shrink-0">
        <Image
          src={blog.pageImageUrl || "/uploads/banner.jpg"}
          alt={blog.pageImageAlt || blog.blogTitle}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Red left accent on hover */}
        <div
          className="absolute top-0 left-0 w-1 h-0 group-hover:h-full transition-all duration-500 rounded-r-full"
          style={{ background: "var(--primary-red)" }}
        />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* Meta row */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: "var(--primary-red)" }}
          >
            Ryan Clinic
          </span>
          <span style={{ color: "var(--border-light)", fontSize: "10px" }}>·</span>
          <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
            {formatDate(blog.createdAt)}
          </span>
          <span style={{ color: "var(--border-light)", fontSize: "10px" }}>·</span>
          <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
            {readingTime(blog.blogContent)} min
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-base sm:text-lg font-bold leading-snug mb-3 line-clamp-2 transition-colors group-hover:text-[#D32F2F]"
          style={{ color: "var(--text-primary)" }}
        >
          {blog.blogTitle}
        </h3>

        {/* Excerpt */}
        <p
          className="text-sm leading-relaxed line-clamp-2 flex-1"
          style={{ color: "var(--text-muted)" }}
        >
          {blog.metaDiscription}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-5 pt-4" style={{ borderTop: "1px solid var(--border-soft)" }}>
          <span
            className="text-xs font-semibold transition-colors group-hover:text-[#D32F2F]"
            style={{ color: "var(--text-secondary)" }}
          >
            Read More →
          </span>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors group-hover:bg-[#D32F2F] group-hover:text-white"
            style={{ background: "var(--bg-card)", color: "var(--primary-red)", border: "1px solid var(--border-light)" }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
        style={{ background: "rgba(211,47,47,0.08)" }}
      >
        <svg className="w-7 h-7" fill="none" stroke="#D32F2F" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
        No articles yet
      </h3>
      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
        Check back soon — expert hair transplant insights are coming.
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogListPage() {
  const blogs = await getAllBlogs();
  const featured = blogs[0] || null;
  const rest = blogs.slice(1);

  return (
    <div style={{ background: "var(--bg-soft)" }}>

      {/* ── Hero Banner ── */}
      {/* <section */}


 {/* ✅ Banner */}
        <PageBanner
          title="Our Blogs"
          description="Regain your confidence with world-class Turkey's Technique hair restoration at Turkey's top-rated Ryan Clinic!"
          bgImage={AboutBanner}
        />






      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

        {!blogs.length ? (
          <EmptyState />
        ) : (
          <>
            {/* ── Featured Post ── */}
            {featured && (
              <div className="mb-14 md:mb-20">
                <div className="flex items-center gap-3 mb-6">
                  <span className="block w-8 h-px bg-[#D32F2F]" />
                  <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#D32F2F]">
                    Featured Article
                  </span>
                </div>
                <FeaturedCard blog={featured} />
              </div>
            )}

            {/* ── All Articles ── */}
            {rest.length > 0 && (
              <div>
                {/* Section header */}
                <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <span className="block w-8 h-px bg-[#D32F2F]" />
                    <h2
                      className="text-xl sm:text-2xl font-bold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      All Articles
                      <span
                        className="ml-2 text-sm font-semibold px-2.5 py-0.5 rounded-full align-middle"
                        style={{ background: "rgba(211,47,47,0.1)", color: "var(--primary-red)" }}
                      >
                        {rest.length}
                      </span>
                    </h2>
                  </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                  {rest.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                  ))}
                </div>
              </div>
            )}

            {/* ── Bottom CTA ── */}
            <div
              className="mt-16 md:mt-24 rounded-2xl p-8 sm:p-12 text-center"
              style={{
                background: "linear-gradient(135deg, #1a0a0a 0%, #3d0f0f 50%, #D32F2F 100%)",
              }}
            >
              <span
                className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] px-3 py-1.5 rounded-full mb-5"
                style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" }}
              >
                Ryan Clinic · Delhi · Mumbai · Hyderabad
              </span>
              <h3
                className="font-bold text-white mb-3 leading-tight"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(22px, 4vw, 38px)",
                }}
              >
                Ready to Start Your
                <br />
                <span className="italic font-normal text-white/60">Hair Transplant Journey?</span>
              </h3>
              <p className="text-sm text-white/55 mb-8 max-w-md mx-auto leading-relaxed">
                Get a free scalp analysis, exact graft count &amp; complete cost breakdown — zero obligation.
              </p>
              <BlogCTAButtons />
            </div>
          </>
        )}
      </div>
    </div>
  );
}


