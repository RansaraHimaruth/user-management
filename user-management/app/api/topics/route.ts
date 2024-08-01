import connectDB from "@/libs/database";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import User from "@/models/user.modal";

export async function POST(request: any) {
  try {
    const { title, description } = await request.json();

    // const { userId } = getAuth(request);
    const { userId } = auth();
    console.log(userId);
    if (!userId) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }
    await connectDB();
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const topic = new Topic({ creator: user._id, title, description });
    await topic.save();

    return NextResponse.json(
      { message: "Topic created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create topic" },
      { status: 500 }
    );
  }
}

export async function GET(request: any) {
  try {
    const { userId } = auth();
    console.log(userId);
    if (!userId) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }
    await connectDB();
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const topics = await Topic.find({ creator: user._id }).populate("creator");
    return NextResponse.json({ topics }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch topics" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: any) {
  try {
    // const { userId } = auth();
    // console.log(userId);
    // if (!userId) {
    //   return NextResponse.json(
    //     { message: "User not authenticated" },
    //     { status: 401 }
    //   );
    // }
    await connectDB();
    // const user = await User.findOne({ clerkId: userId });
    // if (!user) {
    //   return NextResponse.json({ message: "User not found" }, { status: 404 });
    // }
    const id = request.query.id;
    console.log(id);
    await Topic.findByIdAndDelete(id);
    // if (!topic) {
    //   return NextResponse.json({ message: "Topic not found" }, { status: 404 });
    // }
    // if (topic.creator.toString() !== user._id.toString()) {
    //   return NextResponse.json(
    //     { message: "You are not authorized to delete this topic" },
    //     { status: 403 }
    //   );
    // }
    // await topic.remove();
    return NextResponse.json(
      { message: "Topic deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete topic" },
      { status: 500 }
    );
  }
}
