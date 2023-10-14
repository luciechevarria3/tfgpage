import Extension from "@/app/models/Extension";
import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";
import { pageExtensions } from "../../../../../next.config";

const lowerWords = (words) => {
  const loweredWords = words.map(word => word.toLowerCase());

  return loweredWords;
}

async function getCategoriesExtensions(browser) {
  const chromeCats = ['accesibility', 'developer tools', 'fun', 'news & weather', 'photos', 'productivity', 'shopping', 'social & communication', 'themes'];
  const edgeCats = ['accesibility', 'blogging', 'communication', 'developer tools', 'entertainment', 'news & weather', 'photos', 'productivity', 'search tools', 'shopping', 'social', 'sports'];
  const firefoxCats = ['alerts & updates', 'appearance', 'bookmarks', 'download management', 'feeds, news & blogging', 'games & entertainment', 'language support', 'other', 'photos, music & videos', 'privacy & security', 'search tools', 'shopping', 'social & communication', 'tabs', 'web development'];

  let numExtsByCat = {};

  if (browser === "chrome") {
    for (let category of chromeCats) {
      numExtsByCat[category] = await Extension.countDocuments({ webstore: 'Google Chrome', category: category });
    }
  }

  if (browser === "edge") {
    for (let category of edgeCats) {
      numExtsByCat[category] = await Extension.countDocuments({ webstore: 'Microsoft Edge', category: category });
    }
  }

  if (browser === "firefox") {
    for (let category of firefoxCats) {
      numExtsByCat[category] = await Extension.countDocuments({ webstore: 'Mozilla Firefox', category: category });
    }
  }

  return numExtsByCat;
}

async function getNumberExtensionsByCategory() {
  const allCategories = ['accesibility', 'alerts & updates', 'appearance', 'blogging', 'bookmarks', 'communication',
    'developer tools', 'download management', 'entertainment', 'feeds, news & blogging', 'fun',
    'games & entertainment', 'language support', 'news & weather', 'other', 'photos', 'photos, music & videos',
    'privacy & security', 'productivity', 'search tools', 'shopping', 'social', 'social & communication', 'sports',
    'tabs', 'themes', 'web development'];

  let categories = {};

  for (let eachCategory of allCategories) {
    categories[eachCategory] = await Extension.countDocuments({ category: eachCategory });
  }

  return categories;
}

export async function GET(request) {
  connectDB();

  // const allCategories = ['accesibility', 'alerts & updates', 'appearance', 'blogging', 'bookmarks', 'communication', 'developer tools', 'download management', 'entertainment', 'feeds, news & blogging', 'fun', 'games & entertainment', 'language support', 'news & weather', 'other', 'photos', 'photos, music & videos', 'privacy & security', 'productivity', 'search tools', 'shopping', 'social', 'social & communication', 'sports', 'tabs', 'web development'];

  const chromeExts = await Extension.countDocuments({ webstore: "Google Chrome" });
  const edgeExts = await Extension.countDocuments({ webstore: "Microsoft Edge" });
  const firefoxExts = await Extension.countDocuments({ webstore: "Mozilla Firefox" });

  const totalExtensions = chromeExts + edgeExts + firefoxExts;

  const chrome = await getCategoriesExtensions("chrome");
  const edge = await getCategoriesExtensions("edge");
  const firefox = await getCategoriesExtensions("firefox");

  const categories = await getNumberExtensionsByCategory();

  chrome["total"] = chromeExts;
  edge["total"] = edgeExts;
  firefox["total"] = firefoxExts;

  return NextResponse.json({ "total": totalExtensions, "chrome": chrome, "edge": edge, "firefox": firefox, categories })


  // const { searchParams } = new URL(request.url);

  // console.log(searchParams);

  // let queryControl = 0;

  // const browser = normalizeBrowser(searchParams.get("browser"));

  // if (browser) {
  //   queryControl += 1;
  // }

  // const category = normalizeCategory(searchParams.get("category"));

  // if (category) {
  //   queryControl += 2;
  // }

  // const rating = searchParams.get("rating");

  // if (rating) {
  //   queryControl += 4;
  // }

  // let query;

  // switch (queryControl) {
  //   case 0: // NUM TOTAL DE EXTENSIONES
  //     query = {};
  //     break;

  //   case 1: // CONTAR EXTS SOLO POR BROWSER
  //     console.log("ONLY BROWSER: ", browser);

  //     query = { webstore: browser };
  //     break;

  //   case 2: // CONTAR EXTS SOLO POR CATEGORIA
  //     console.log("ONLY CATEGORY: ", category);

  //     query = { category: category };
  //     break;

  //   case 3: // CONTAR EXTS SOLO BROWSER+CATEGORIA
  //     console.log("BROWSER + CATEGORY: " + browser + " " + category);

  //     query = { webstore: browser, category: category };
  //     break;

  //   case 4: // CONTAR EXTS POR RATING
  //     console.log("ONLY RATING: ", rating);

  //     query = { rating: { $gte: rating } };
  //     break;

  //   case 5: // CONTAR EXTS POR BROWSER+RATING
  //     console.log("BROWSER + RATING: " + browser + " " + rating);

  //     query = { webstore: browser, rating: { $gte: rating } };
  //     break;

  //   case 6: // CONTAR EXTS POR CATEGORIA+RATING
  //     console.log("CATEGORY + RATING: " + category + " " + rating);

  //     query = { category: category, rating: { $gte: rating } };
  //     break;

  //   default:  // CONTAR EXTS POR BROWSER+CATEGORIA+RATING
  //     console.log("BROWSER + CATEGORY + RATING: " + browser + " " + category + " " + rating);

  //     query = { webstore: browser, category: category, rating: { $gte: rating } };
  //     break;
  // }

  // const numExts = await Extension.countDocuments(query);

  // return NextResponse.json({ nExts: numExts });
}