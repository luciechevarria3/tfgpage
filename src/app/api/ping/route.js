import { NextResponse } from "next/server";
import { connectDB } from "@/utils/database";
import Extension from "@/app/models/Extension";

export async function GET() {
  connectDB();

  const extensions = await Extension.find().limit(3);
  return NextResponse.json(extensions)
}