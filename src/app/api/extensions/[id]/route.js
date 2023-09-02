import Extension from "@/app/models/Extension";
import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  connectDB();

  const extension = await Extension.findOne({ _id: params.id });

  return NextResponse.json(extension);
}