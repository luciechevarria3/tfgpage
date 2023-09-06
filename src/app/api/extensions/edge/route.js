import Extension from "@/app/models/Extension";
import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";

function normalizeCategory(category) {
  if (!category) { return null };
  let normalizedCategory = category;

  if (category.includes("Developer")) { normalizedCategory = "Developer tools"; }
  if (category.includes("News")) { normalizedCategory = "News & weather"; }
  if (category.includes("Search")) { normalizedCategory = "Search tools"; }

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
      dbQuery = { name: { "$exists": true }, webstore: "Microsoft Edge" };
      break;

    case 1:
      dbQuery = { name: { "$exists": true }, webstore: "Microsoft Edge", category: categorySt };
      break;

    case 2:
      dbQuery = { name: { "$exists": true }, webstore: "Microsoft Edge", rating: { $gte: ratingSt } };
      break;

    default:
      dbQuery = { name: { "$exists": true }, webstore: "Microsoft Edge", category: categorySt, rating: { $gte: ratingSt } };
      break;
  }

  console.log(dbQuery);

  let extensions = await Extension.find(dbQuery);

  extensions = extensions.slice(0, 20);

  return NextResponse.json(extensions);
}