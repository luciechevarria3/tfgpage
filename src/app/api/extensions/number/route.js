import Extension from "@/app/models/Extension";
import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";

function normalizeBrowser(browser) {
  if (!browser) { return null };
  let normalizedBrowser = browser;

  if (browser.includes("Google")) { normalizedBrowser = "chrome"; }
  if (browser.includes("Microsoft")) { normalizedBrowser = "edge"; }
  if (browser.includes("Mozilla")) { normalizedBrowser = "firefox"; }

  return normalizedBrowser;
}

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

  const filter = searchParams.get("filter");

  const value = searchParams.get("value");

  let query;

  switch (filter) {
    case "Browser":
      query = { browser: value };
      break;

    case "Category":
      query = { category: value };
      break;

    default:
      query = { rating: { $gte: value } };
      break;
  }

  const numExts = await Extension.countDocuments(query);

  return NextResponse.json(numExts);
}