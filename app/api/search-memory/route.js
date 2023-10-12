import { connectMongoDB } from "@/lib/mongodb";
import myMemories from "@/models/myMemories";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectMongoDB();
  try {
    const { userId, search } = await req.json();
    console.log("searchData: ", userId);
    console.log("searchData: ", search);

    const query = search;
    const memories = await myMemories.find({
      userId: userId,
      $or: [
        { address: { $regex: query, $options: "i" } },
        { full_address: { $regex: query, $options: "i" } },
      ],
    });
    return NextResponse.json({ memories });
  } catch (error) {
    console.log("error: ", error);
    NextResponse.json({ error: error }, { status: 500 }, { success: false });
  }
}
