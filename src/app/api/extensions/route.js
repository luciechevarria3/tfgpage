import { NextResponse } from "next/server";

import { connectDB } from "@/utils/database";
import Extension from "@/app/models/Extension";


export async function GET() {
  connectDB();

  const extensions = await Extension.countDocuments();

  return NextResponse.json({ extensionsNumber: extensions });
}