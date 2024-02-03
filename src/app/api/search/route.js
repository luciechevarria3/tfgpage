import Extension from "@/app/models/Extension";
import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET(request) {
  connectDB();

  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q").toLowerCase();  // Búsqueda del usuario
  const page = parseInt(searchParams.get("page")) ?? 0;

  const resultsPerPage = 12;

  const extensions = await Extension.find({ name: { $regex: query } }).sort({ rating: -1, ratedBy: -1 }).skip(page * resultsPerPage).limit(resultsPerPage);

  return NextResponse.json(extensions);
}