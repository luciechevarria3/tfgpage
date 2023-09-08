import Extension from "@/app/models/Extension";
import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";

function normalizeCategory(category) {
  if (!category) { return null };
  let normalizedCategory = category;

  if (category.includes("Developer")) { normalizedCategory = "Developer Tools"; }
  if (category.includes("News")) { normalizedCategory = "News & Weather"; }
  if (category.includes("Social")) { normalizedCategory = "Social & Communication"; }

  return normalizedCategory;
}

export async function GET(request) {
  connectDB();

  const { searchParams } = new URL(request.url);
  let queryControl = 0;

  const categorySt = normalizeCategory(searchParams.get("category"));

  if (categorySt) { queryControl += 1; };

  const ratingSt = parseInt(searchParams.get("rating"));

  if (ratingSt) { queryControl += 2; };

  let dbQuery;
  switch (queryControl) {
    case 0:
      dbQuery = { name: { "$exists": true } };
      break;

    case 1:
      dbQuery = { name: { "$exists": true }, category: categorySt };
      break;

    case 2:
      dbQuery = { name: { "$exists": true }, rating: { $gte: ratingSt } };
      break;

    default:
      dbQuery = { name: { "$exists": true }, category: categorySt, rating: { $gte: ratingSt } };
      break;
  }

  let extensions = await Extension.find(dbQuery).limit(12);

  return NextResponse.json(extensions);
}