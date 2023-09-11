import Extension from "@/app/models/Extension";
import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";
import { normalizeCategory } from "../chrome/route";

function normalizeBrowser(browser) {
  if (!browser) { return null };
  let normalizedBrowser = browser;

  if (browser.includes("Google")) { normalizedBrowser = "Google Chrome"; }
  if (browser.includes("Microsoft")) { normalizedBrowser = "Microsoft Edge"; }
  if (browser.includes("Mozilla")) { normalizedBrowser = "Mozilla Firefox"; }

  return normalizedBrowser;
}

export async function GET(request) {
  connectDB();

  const { searchParams } = new URL(request.url);

  console.log(searchParams);

  let queryControl = 0;

  const browser = normalizeBrowser(searchParams.get("browser"));

  if (browser) {
    queryControl += 1;
  }

  const category = normalizeCategory(searchParams.get("category"));

  if (category) {
    queryControl += 2;
  }

  const rating = searchParams.get("rating");

  if (rating) {
    queryControl += 4;
  }

  let query;

  switch (queryControl) {
    case 0: // NUM TOTAL DE EXTENSIONES
      query = {};
      break;

    case 1: // CONTAR EXTS SOLO POR BROWSER
      console.log("ONLY BROWSER: ", browser);

      query = { webstore: browser };
      break;

    case 2: // CONTAR EXTS SOLO POR CATEGORIA
      console.log("ONLY CATEGORY: ", category);

      query = { category: category };
      break;

    case 3: // CONTAR EXTS SOLO BROWSER+CATEGORIA
      console.log("BROWSER + CATEGORY: " + browser + " " + category);

      query = { webstore: browser, category: category };
      break;

    case 4: // CONTAR EXTS POR RATING
      console.log("ONLY RATING: ", rating);

      query = { rating: { $gte: rating } };
      break;

    case 5: // CONTAR EXTS POR BROWSER+RATING
      console.log("BROWSER + RATING: " + browser + " " + rating);

      query = { webstore: browser, rating: { $gte: rating } };
      break;

    case 6: // CONTAR EXTS POR CATEGORIA+RATING
      console.log("CATEGORY + RATING: " + category + " " + rating);

      query = { category: category, rating: { $gte: rating } };
      break;

    default:  // CONTAR EXTS POR BROWSER+CATEGORIA+RATING
      console.log("BROWSER + CATEGORY + RATING: " + browser + " " + category + " " + rating);

      query = { webstore: browser, category: category, rating: { $gte: rating } };
      break;
  }

  const numExts = await Extension.countDocuments(query);

  return NextResponse.json({ nExts: numExts });
}