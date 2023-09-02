import Extension from "@/app/models/Extension";
import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET(request) {
  connectDB();

  const { searchParams } = new URL(request.url);

  let queryControl = 0;

  const categorySt = searchParams.get("category");

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

  let extensions = await Extension.find(dbQuery);

  extensions = extensions.slice(0, 5);

  return NextResponse.json(extensions);
}