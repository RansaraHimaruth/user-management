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
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
        }
        await connectDB();
        const user = await User.findOne({ clerkId: userId });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        const topic = new Topic({ creator: user._id, title, description });
        await topic.save();

        return NextResponse.json({message: "Topic created successfully"}, {status: 201});
    } catch (error) {
        return NextResponse.json({message: "Failed to create topic"}, {status: 500});
    }
}

export async function GET(request: any) {
    try {
        const { userId } = auth();
        console.log(userId);
        if (!userId) {
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
        }
        await connectDB();
        const topics = await Topic.findById({ clerkId: userId }).populate("creator");
        return NextResponse.json({topics}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Failed to fetch topics"}, {status: 500});
    }
}