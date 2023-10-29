import DropdownBar from "./components/DropdownBar";
import ExtensionCard from "./components/ExtensionCard";
import PaginationControls from "./components/PaginationControls";
import SearchBar from "./components/SearchBar";
import TopBar from "./components/TopBar";

const browserValues = ["All", "Google Chrome", "Microsoft Edge", "Mozilla Firefox"];
let allCats = ['Accesibility', 'Alerts & Updates', 'Appearance', 'Blogging', 'Bookmarks', 'Communication', 'Developer Tools', 'Download Management', 'Entertainment', 'Feeds, News & Blogging', 'Fun', 'Games & Entertainment', 'Language Support', 'News & Weather', 'Other', 'Photos', 'Photos, Music & Videos', 'Privacy & Security', 'Productivity', 'Search Tools', 'Shopping', 'Social', 'Social & Communication', 'Sports', 'Tabs', 'Web Development'];
let chromeCats = ['Accesibility', 'Developer Tools', 'Fun', 'News & Weather', 'Photos', 'Productivity', 'Shopping', 'Social & Communication', 'Themes'];
let edgeCats = ['Accesibility', 'Blogging', 'Communication', 'Developer Tools', 'Entertainment', 'News & Weather', 'Photos', 'Productivity', 'Search Tools', 'Shopping', 'Social', 'Sports'];
let firefoxCats = ['Alerts & Updates', 'Appearance', 'Bookmarks', 'Download Management', 'Feeds, News & Blogging', 'Games & Entertainment', 'Language Support', 'Other', 'Photos, Music & Videos', 'Privacy & Security', 'Search Tools', 'Shopping', 'Social & Communication', 'Tabs', 'Web Development'];
let ratingValues = [1, 2, 3, 4, 5];

const capitalizeWord = (loweredWord) => {
  const capitalizedWord = loweredWord.charAt(0).toUpperCase() + loweredWord.slice(1);
  return capitalizedWord;
}

const lowerWords = (words) => {
  const loweredWords = words.map(capitalizedWord => capitalizedWord.toLowerCase());

  return loweredWords;
}

const setBrowsersExtensionQtt = (browsers, qttExts) => {
  let browsersExtensionNum;
  let normalizedBrowser;

  let result = [];
  for (let browser of browsers) {
    switch (browser) {
      case "Google Chrome":
        normalizedBrowser = "chrome";
        break;

      case "Microsoft Edge":
        normalizedBrowser = "edge";
        break;

      case "Mozilla Firefox":
        normalizedBrowser = "firefox";
        break;

      default:
        normalizedBrowser = "all";
        break;
    }

    if (normalizedBrowser === "all") {
      browsersExtensionNum = qttExts["total"];
      result.push(`${browser} (${browsersExtensionNum})`);
    }

    else {
      browsersExtensionNum = qttExts[normalizedBrowser]['total'];
      result.push(`${browser} (${browsersExtensionNum})`);
    }

  }

  return result;
}

const setCategoriesNums = (browser, categories, qttExts) => {
  let categoriesWithNums = [];

  if (browser === "all") {
    categoriesWithNums = categories.map(category => `${category} (${qttExts["categories"][category.toLowerCase()]})`)
    return categoriesWithNums;
  }

  categoriesWithNums = categories.map(category => `${category} (${qttExts[browser][category.toLowerCase()]})`);

  return categoriesWithNums;
}

const fetchData = async (URL) => {
  const res = await fetch(URL);
  const data = await res.json();

  return data;
}

const fetchExtsQtt = async () => {
  const res = await fetch("http://localhost:3000/api/extensions/number");
  const data = await res.json();

  return data;
}

export default async function SearchPage({ searchParams }) {
  // const extsQtt = await fetchExtsQtt();
  // console.log(extsQtt);
  const extsQtt = {
    "total": 81251,
    "chrome": {
      "accesibility": 0,
      "developer tools": 2729,
      "fun": 3393,
      "news & weather": 497,
      "photos": 225,
      "productivity": 11443,
      "shopping": 1960,
      "social & communication": 2394,
      "themes": 10249,
      "total": 51914
    },
    "edge": {
      "accesibility": 0,
      "blogging": 33,
      "communication": 57,
      "developer tools": 231,
      "entertainment": 188,
      "news & weather": 46,
      "photos": 43,
      "productivity": 1268,
      "search tools": 129,
      "shopping": 113,
      "social": 71,
      "sports": 7,
      "total": 4344
    },
    "firefox": {
      "alerts & updates": 1311,
      "appearance": 3843,
      "bookmarks": 1242,
      "download management": 891,
      "feeds, news & blogging": 1495,
      "games & entertainment": 1947,
      "language support": 794,
      "other": 3375,
      "photos, music & videos": 1293,
      "privacy & security": 2461,
      "search tools": 1977,
      "shopping": 808,
      "social & communication": 1169,
      "tabs": 1147,
      "web development": 2,
      "total": 24993
    },
    "categories": {
      "accesibility": 0,
      "alerts & updates": 1311,
      "appearance": 3843,
      "blogging": 33,
      "bookmarks": 1242,
      "communication": 57,
      "developer tools": 2960,
      "download management": 891,
      "entertainment": 188,
      "feeds, news & blogging": 1495,
      "fun": 3393,
      "games & entertainment": 1947,
      "language support": 794,
      "news & weather": 543,
      "other": 3375,
      "photos": 268,
      "photos, music & videos": 1293,
      "privacy & security": 2461,
      "productivity": 12711,
      "search tools": 2106,
      "shopping": 2881,
      "social": 71,
      "social & communication": 3563,
      "sports": 7,
      "tabs": 1147,
      "themes": 10249,
      "web development": 2
    }
  };

  const selectedBrowser = searchParams.browser;
  const selectedCategory = searchParams.category;
  const selectedRating = searchParams.rating;

  const selectedPage = parseInt(searchParams.page) ?? 1;

  // AÑADIR NUM DE EXTENSIONES DE CADA BROWSER
  const browserValuesWithNums = setBrowsersExtensionQtt(browserValues, extsQtt);

  // CREAR LLAMADA A API
  let apiURL = `http://localhost:3000/api/extensions?`;

  if (selectedBrowser && selectedBrowser !== "all") {
    apiURL += `&browser=${selectedBrowser.toLowerCase()}`
  }

  if (selectedCategory && selectedCategory !== "all") {
    apiURL += `&category=${selectedCategory.toLowerCase()}`
  }

  if (selectedRating && selectedRating !== "all") {
    apiURL += `&rating=${selectedRating}`
  }

  apiURL += `&page=${selectedPage - 1}`;

  const extensions = await fetchData(apiURL);

  let categories = allCats;

  let categoriesWithNums = [];

  if (selectedBrowser) {
    if (selectedBrowser.includes("hrome")) {
      categories = chromeCats;
      categoriesWithNums = setCategoriesNums("chrome", categories, extsQtt);
    }

    if (selectedBrowser.includes("dge")) {
      categories = edgeCats;
      categoriesWithNums = setCategoriesNums("edge", categories, extsQtt);
    }

    if (selectedBrowser.includes("irefox")) {
      categories = firefoxCats;
      categoriesWithNums = setCategoriesNums("firefox", categories, extsQtt);
    }
  }

  if (categoriesWithNums.length === 0) {
    categoriesWithNums = setCategoriesNums("all", categories, extsQtt);
  }

  return (
    <>
      <TopBar />

      <div className="mx-80 mt-8 flex justify-center">
        <SearchBar />
      </div>

      <ul className="mx-80 my-12 grid grid-cols-3 gap-x-12">
        <li>
          <DropdownBar title="Browser" values={browserValuesWithNums} />
        </li>
        <li>
          <DropdownBar title="Category" values={categoriesWithNums} />
        </li>
        <li>
          <DropdownBar title="Rating" values={ratingValues} />
        </li>
      </ul>

      <div className="mx-64 grid grid-cols-4 gap-4 justify-items-center">
        {extensions.map(extension => (
          <ExtensionCard key={extension._id} name={extension.name} image={extension.image} publisher={extension.publisher} extID={extension._id} />
        ))}
      </div>

      <PaginationControls searchParams={searchParams} extensionsNum={extensions.length} />
    </>
  );
}
