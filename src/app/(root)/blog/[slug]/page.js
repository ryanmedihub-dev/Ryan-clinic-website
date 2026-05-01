import PageBanner from "@/components/layouts/pageBanner";
import ContactForm from "@/components/pages/contactForm";
import { getBlogBySlug } from "@/lib/blogData";
import { sanitizeContent } from "@/lib/utils";

// 🧠 Step 1: Dynamic Metadata Function
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  return {
    title: blog?.metaTitle || blog?.pageTitle || blog?.blogTitle || "Hair Transplant Guide | Ryan Clinic",
    description: blog?.metaDiscription || blog?.pageDiscription || "Expert hair transplant insights from Ryan Clinic — India's only Turkey Sapphire FUE specialists.",
    alternates: {
      canonical: `https://www.clinicryan.com/blog/${slug}`,
    },
    openGraph: {
      title: blog?.metaTitle || blog?.pageTitle,
      description: blog?.metaDiscription || blog?.pageDiscription,
      images: [
        {
          url: blog?.pageImageUrl || "/default-image.jpg",
          alt: blog?.pageImageAlt || "Blog image",
        },
      ],
    },
  };
}

// 🧠 Step 2: Actual Page Component
export default async function BlogPage({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

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
