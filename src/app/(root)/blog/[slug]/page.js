import PageBanner from "@/components/layouts/pageBanner";
import ContactForm from "@/components/pages/contactForm";
import { getBlogBySlug } from "@/lib/blogData";
import { sanitizeContent } from "@/lib/utils";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found | Ryan Clinic",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: blog.metaTitle || blog.pageTitle || blog.blogTitle || "Hair Transplant Guide | Ryan Clinic",
    description: blog.metaDiscription || blog.pageDiscription || "Expert hair transplant insights from Ryan Clinic — India's only Turkey Sapphire FUE specialists.",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `https://www.clinicryan.com/blog/${slug}`,
    },
    openGraph: {
      type: "article",
      locale: "en_IN",
      siteName: "Ryan Clinic",
      url: `https://www.clinicryan.com/blog/${slug}`,
      title: blog.metaTitle || blog.pageTitle,
      description: blog.metaDiscription || blog.pageDiscription,
      images: [
        {
          url: blog.pageImageUrl || "/uploads/logo.png",
          width: 1200,
          height: 630,
          alt: blog.pageImageAlt || "Hair transplant blog — Ryan Clinic",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.metaTitle || blog.pageTitle,
      description: blog.metaDiscription || blog.pageDiscription,
      images: [blog.pageImageUrl || "/uploads/logo.png"],
    },
  };
}

export default async function BlogPage({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) notFound();

  return (
    <div>
      {/* Page Banner */}
      <PageBanner
        title={blog?.pageTitle}
        description={blog?.pageDiscription}
        bgImage={blog?.pageImageUrl}
        alt={blog?.pageImageAlt}
      />

      {/* Blog Content */}
      <section>
        <div className="containerFull">
          <div className="new-pageLayout pageLayout">
            <div
              className="pageLayoutBox"
              dangerouslySetInnerHTML={{
                __html: sanitizeContent(blog?.blogContent),
              }}
            ></div>

            {/* Contact Form */}
            <div className="md:px-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
