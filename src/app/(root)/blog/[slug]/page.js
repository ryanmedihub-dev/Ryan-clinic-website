import PageBanner from "@/components/layouts/pageBanner";
import ContactForm from "@/components/pages/contactForm";
import { getBlogBySlug } from "@/lib/blogData";

// 🧠 Step 1: Dynamic Metadata Function
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  return {
    title: blog?.metaTitle || blog?.pageTitle || "Default Blog Title",
    description: blog?.metaDiscription || blog?.pageDiscription || "Default Blog Description",
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
                __html: blog?.blogContent || "",
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
