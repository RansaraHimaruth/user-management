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
        if (userId != topic.creator) {
            return NextResponse.json({ message: "You are not authorized to update this topic" }, { status: 403 });
        }
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

      const topic = await Topic.findById(params.id);
    //   if (userId != topic.creator) {
    //     return NextResponse.json({ message: "You are not authorized to see this topic" }, { status: 403 });
    // }
  
      return NextResponse.json({ topic }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Failed to fetch topic" },
        { status: 500 }
      );
    }
  }