import connectDB from "@/libs/database";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(request: any) {
    try {
        const { title, description } = await request.json();

        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
        }
        await connectDB();
        const topic = new Topic({ userId, title, description });
        await topic.save();

        return NextResponse.json({message: "Topic created successfully"}, {status: 201});
    } catch (error) {
        return NextResponse.json({message: "Failed to create topic"}, {status: 500});
    }
}

export async function GET() {
    try {
        await connectDB();
        const topics = await Topic.find();
        return NextResponse.json(topics, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Failed to fetch topics"}, {status: 500});
    }
}