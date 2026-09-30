import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import Blog from "@/models/blog";

const handler = async (req) => {
  

    const fulldata = await Blog.find({})

    if(!fulldata){
        return NextResponse.json(
            { success: false, message: "No data found" },
            { status: 400 }
          );
    }

    

    return NextResponse.json(
      { success: true, data: fulldata },
      { status: 200 }
    );
  
}


export const GET = withDB(handler);
