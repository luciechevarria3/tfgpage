import Extension from "@/app/models/Extension";
import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET() {
  connectDB();
  const extensions = await Extension.find({ name: { "$exists": true } });

  return NextResponse.json(extensions);
}