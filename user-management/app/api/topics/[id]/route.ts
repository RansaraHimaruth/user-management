import connectDB from "@/libs/database";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import User from "@/models/user.modal";

export async function PUT(request: any, { params }: { params: any }) {
    try {
        const { title, description } = await request.json();
        const { userId } = auth();
        console.log(userId);
        if (!userId) {
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
        }
        await connectDB();
        const topic = await Topic.findById(params.id);
        topic.title = title;
        topic.description = description;

        await topic.save();

        return NextResponse.json({message: "Topic updated successfully"}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Failed to update topic"}, {status: 500});
    }
}

export async function GET(request: any, { params }: { params: any }) {
    try {
        const { userId } = auth();
        console.log(userId);
        if (!userId) {
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
        }
        await connectDB();
  
      // Usage: Topic.findById(params.id)
      // Purpose: Specifically designed to find a document by its _id.
      // Simpler: Directly takes the _id as an argument, making it more straightforward for this use case.
      // Performance: Slightly optimized for finding documents by _id.
      const topic = await Topic.findById(params.id);
  
      //Usage: Topic.findOne({ _id: params.id })
      // Purpose: More general-purpose, can find a document based on any field or combination of fields.
      // Flexibility: Allows for more complex queries beyond just the _id.
      // const topic = await Topic.findOne({ _id: params.id });
  
      return NextResponse.json({ topic }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Failed to fetch topic" },
        { status: 500 }
      );
    }
  }