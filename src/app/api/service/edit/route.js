import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import Services from "@/models/services";

const handler = async (req) => {
  try {
    if (req.method !== "PUT") {
      return NextResponse.json(
        { success: false, message: "Method not allowed" },
        { status: 405 }
      );
    }

    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      return NextResponse.json(
        { success: false, message: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }




    // Transform the incoming data to match the schema structure
    const formattedUpdate = {
      bannerData: {
        title: updateData.bannerTitle,
        description: updateData.bannerDescription,
        imageurl: updateData.bannerImage,
        imageAlt: updateData.bannerAlt
      },
      benefitsData: {
        title: updateData.benefitsTitle,
        description: updateData.benefitsDescription,
        component: updateData.benefitComponents
      },
      extraFields: {
        detail1: updateData.extraDetail1,
        detail2: updateData.extraDetail2
      },
      faq: updateData.faqs,
      metadata: {
        pageName: updateData.pageName,
        pageType: updateData.pageType,
        description: updateData.description,
        pageurl: updateData.pageUrl,
        title: updateData.serviceTitle,
        overviewData: updateData.overviewContent
      },
      typesData: {
        details: updateData.typesDetails,
        images: updateData.typeImages
      }
    };


    // console.log(first)


    const updatedService = await Services.findByIdAndUpdate(
      id,
      { $set: formattedUpdate },
      { 
        new: true,
        runValidators: true,
        context: 'query'
      }
    ).lean();

    if (!updatedService) {
      return NextResponse.json(
        { success: false, message: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: "Service updated successfully",
        data: updatedService 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Detailed update error:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Update failed",
        error: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined
      },
      { status: 500 }
    );
  }
};

export const PUT = withDB(handler);