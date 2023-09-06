import Extension from "@/app/models/Extension";
import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET() {
  connectDB();

  const extensions = await Extension.find({ name: { "$exists": true } }).sort({ _id: 1 }).limit(4 * 8);

  return NextResponse.json(extensions);
}