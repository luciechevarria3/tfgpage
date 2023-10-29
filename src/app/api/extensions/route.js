import Extension from "@/app/models/Extension";
import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";

export function normalizeCategory(category) {

  if (category === null) { return null; }

  let normalizedCategory;

  if (category.includes("developer")) { normalizedCategory = "developer tools"; }
  if (category.includes("news")) { normalizedCategory = "news & weather"; }
  if (category.includes("social")) { normalizedCategory = "social & communication"; }
  if (category.includes("alerts")) { normalizedCategory = "alerts & updates"; }
  if (category.includes("download")) { normalizedCategory = "download management"; }
  if (category.includes("feeds")) { normalizedCategory = "feeds, news & blogging"; }
  if (category.includes("games")) { normalizedCategory = "games & entertainment"; }
  if (category.includes("language")) { normalizedCategory = "language support"; }
  if (category.includes("music")) { normalizedCategory = "photos, music & videos"; }
  if (category.includes("privacy")) { normalizedCategory = "privacy & security"; }
  if (category.includes("search")) { normalizedCategory = "search tools"; }
  if (category.includes("web")) { normalizedCategory = "web development"; }

  if (!normalizedCategory) { normalizedCategory = category.toLowerCase().replace(/[()]/g, '').replace(/[0-9]/g, '').replace(/\s+/g, ' ').trim(); }

  return normalizedCategory;

}

export function normalizeBrowser(browser) {
  if (browser == null) { return null; }

  let normalizedBrowser;

  if (browser.includes("google") || browser.includes("chrome")) {
    normalizedBrowser = "Google Chrome";
  }

  if (browser.includes("microsoft") || browser.includes("edge")) {
    normalizedBrowser = "Microsoft Edge";
  }

  if (browser.includes("mozilla") || browser.includes("firefox")) {
    normalizedBrowser = "Mozilla Firefox";
  }

  return normalizedBrowser;
}

export async function GET(request) {
  connectDB();


  const { searchParams } = new URL(request.url);
  // PROCESO DE PAGINACIÓN
  const page = parseInt(searchParams.get("page")) ?? 0;
  const extensionsPerPage = 12;

  let queryControl = 0;

  const categorySt = normalizeCategory(searchParams.get("category"));

  if (categorySt) { queryControl += 1; };

  const ratingSt = parseInt(searchParams.get("rating"));

  if (ratingSt) { queryControl += 2; };

  const browserSt = normalizeBrowser(searchParams.get("browser"));

  if (browserSt) { queryControl += 4; };

  const idSt = searchParams.get("id");

  let dbQuery;
  let extensions;

  if (idSt) {
    dbQuery = { _id: idSt };
    extensions = await Extension.findOne(dbQuery);
    return NextResponse.json(extensions);
  }

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

    case 3:
      dbQuery = { name: { "$exists": true }, category: categorySt, rating: { $gte: ratingSt } };
      break;

    case 4:
      dbQuery = { name: { "$exists": true }, webstore: browserSt };
      break;

    case 5:
      dbQuery = { name: { "$exists": true }, category: categorySt, webstore: browserSt };
      break;

    case 6:
      dbQuery = { name: { "$exists": true }, webstore: browserSt, rating: { $gte: ratingSt } };
      break;

    default:
      dbQuery = { name: { "$exists": true }, webstore: browserSt, category: categorySt, rating: { $gte: ratingSt } };
      break;
  }

  extensions = await Extension.find(dbQuery).skip(page * extensionsPerPage).limit(extensionsPerPage);

  return NextResponse.json(extensions);
}