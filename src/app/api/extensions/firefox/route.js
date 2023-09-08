import Extension from "@/app/models/Extension";
import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";

function normalizeCategory(category) {
  if (!category) { return null };
  let normalizedCategory = category;

  if (category.includes("Alerts")) { normalizedCategory = "Alerts & Updates"; }
  if (category.includes("Download")) { normalizedCategory = "Download Management"; }
  if (category.includes("Feeds")) { normalizedCategory = "Feeds, News & Blogging"; }
  if (category.includes("Games")) { normalizedCategory = "Games & Entertainment"; }
  if (category.includes("Language")) { normalizedCategory = "Language Support"; }
  if (category.includes("Photos")) { normalizedCategory = "Photos, Music & Videos"; }
  if (category.includes("Privacy")) { normalizedCategory = "Privacy & Security"; }
  if (category.includes("Search")) { normalizedCategory = "Search Tools"; }
  if (category.includes("Social")) { normalizedCategory = "Social & Communication"; }
  if (category.includes("Web")) { normalizedCategory = "Web Development"; }

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
      dbQuery = { name: { "$exists": true }, webstore: "Mozilla Firefox" };
      break;

    case 1:
      dbQuery = { name: { "$exists": true }, webstore: "Mozilla Firefox", category: categorySt };
      break;

    case 2:
      dbQuery = { name: { "$exists": true }, webstore: "Mozilla Firefox", rating: { $gte: ratingSt } };
      break;

    default:
      dbQuery = { name: { "$exists": true }, webstore: "Mozilla Firefox", category: categorySt, rating: { $gte: ratingSt } };
      break;
  }

  let extensions = await Extension.find(dbQuery).limit(12);

  return NextResponse.json(extensions);
}