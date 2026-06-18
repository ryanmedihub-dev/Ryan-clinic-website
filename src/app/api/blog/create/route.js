import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import Blog from "@/models/blog";
import { requireAdmin } from "@/lib/requireAdmin";

const handler = async (req) => {
  const authError = await requireAdmin();
  if (authError) return authError;

  const body = await req.json();

  const {
    metaTitle,
    metaDiscription,
    pageUrl,
    pageTitle,
    pageDiscription,
    pageImageUrl,
    pageImageAlt,
    blogTitle,
    blogContent,
  } = body;

  // ===== VALIDATION =====
  if (
    !metaTitle?.trim() ||
    !metaDiscription?.trim() ||
    !pageUrl?.trim() ||
    !pageTitle?.trim() ||
    !pageDiscription?.trim() ||
    !pageImageUrl?.trim() ||
    !pageImageAlt?.trim() ||
    !blogTitle?.trim() ||
    !blogContent?.trim()
  ) {
    return NextResponse.json(
      { message: "Please fill all the required fields", data: body },
      { status: 400 }
    );
  }

  if (pageTitle.length < 3) {
    return NextResponse.json(
      { message: "Page title must be at least 3 characters long" },
      { status: 400 }
    );
  }

  if (blogTitle.length < 3) {
    return NextResponse.json(
      { message: "Blog title must be at least 3 characters long" },
      { status: 400 }
    );
  }

  if (blogContent.length < 20) {
    return NextResponse.json(
      { message: "Blog content must be at least 20 characters long" },
      { status: 400 }
    );
  }

  // ===== CHECK IF BLOG ALREADY EXISTS =====
  const existedBlog = await Blog.findOne({ pageUrl });

  if (existedBlog) {
    return NextResponse.json(
      { message: "Blog already exists with this page URL", data: body },
      { status: 409 }
    );
  }

  // ===== CREATE NEW BLOG =====
  const newBlog = new Blog({
    metaTitle,
    metaDiscription,
    pageUrl,
    pageTitle,
    pageDiscription,
    pageImageUrl,
    pageImageAlt,
    blogTitle,
    blogContent,
  });

  await newBlog.save();

  return NextResponse.json(
    { message: "Blog created successfully!", status: 200},
  );
};

export const POST = withDB(handler);
