import Extension from "@/app/models/Extension";
import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";

export function normalizeCategory(category) {

  if (category === null) { return null; }

  let normalizedCategory;

  if (category.includes("Developer")) { normalizedCategory = "developer tools"; }
  if (category.includes("News")) { normalizedCategory = "news & weather"; }
  if (category.includes("Social")) { normalizedCategory = "social & communication"; }
  if (category.includes("Alerts")) { normalizedCategory = "alerts & updates"; }
  if (category.includes("Download")) { normalizedCategory = "download management"; }
  if (category.includes("Feeds")) { normalizedCategory = "feeds, news & blogging"; }
  if (category.includes("Games")) { normalizedCategory = "games & entertainment"; }
  if (category.includes("Language")) { normalizedCategory = "language support"; }
  if (category.includes("Photos")) { normalizedCategory = "photos, music & videos"; }
  if (category.includes("Privacy")) { normalizedCategory = "privacy & security"; }
  if (category.includes("Search")) { normalizedCategory = "search tools"; }
  if (category.includes("Web")) { normalizedCategory = "web development"; }

  if (!normalizedCategory) { normalizedCategory = category.toLowerCase(); }

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
      dbQuery = { name: { "$exists": true }, webstore: "Google Chrome" };
      break;

    case 1:
      dbQuery = { name: { "$exists": true }, webstore: "Google Chrome", category: categorySt };
      break;

    case 2:
      dbQuery = { name: { "$exists": true }, webstore: "Google Chrome", rating: { $gte: ratingSt } };
      break;

    default:
      dbQuery = { name: { "$exists": true }, webstore: "Google Chrome", category: categorySt, rating: { $gte: ratingSt } };
      break;
  }

  let extensions = await Extension.find(dbQuery).limit(12);


  return NextResponse.json(extensions);
}