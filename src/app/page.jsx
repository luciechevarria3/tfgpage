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
  const extsQtt = {
    "total": 2998,
    "chrome": {
      "accesibility": 0,
      "developer tools": 11,
      "fun": 28,
      "news & weather": 18,
      "photos": 3,
      "productivity": 76,
      "shopping": 36,
      "social & communication": 49,
      "themes": 535,
      "total": 998
    },
    "edge": {
      "accesibility": 0,
      "blogging": 7,
      "communication": 18,
      "developer tools": 38,
      "entertainment": 39,
      "news & weather": 6,
      "photos": 14,
      "productivity": 275,
      "search tools": 29,
      "shopping": 33,
      "social": 16,
      "sports": 2,
      "total": 1000
    },
    "firefox": {
      "alerts & updates": 68,
      "appearance": 155,
      "bookmarks": 49,
      "download management": 30,
      "feeds, news & blogging": 58,
      "games & entertainment": 74,
      "language support": 34,
      "other": 126,
      "photos, music & videos": 31,
      "privacy & security": 96,
      "search tools": 89,
      "shopping": 77,
      "social & communication": 31,
      "tabs": 35,
      "web development": 0,
      "total": 1000
    },
    "categories": {
      "accesibility": 0,
      "alerts & updates": 68,
      "appearance": 155,
      "blogging": 7,
      "bookmarks": 49,
      "communication": 18,
      "developer tools": 49,
      "download management": 30,
      "entertainment": 39,
      "feeds, news & blogging": 58,
      "fun": 28,
      "games & entertainment": 74,
      "language support": 34,
      "news & weather": 24,
      "other": 126,
      "photos": 17,
      "photos, music & videos": 31,
      "privacy & security": 96,
      "productivity": 351,
      "search tools": 118,
      "shopping": 146,
      "social": 16,
      "social & communication": 80,
      "sports": 2,
      "tabs": 35,
      "themes": 535,
      "web development": 0
    }
  };

  const selectedBrowser = searchParams.browser;
  const selectedCategory = searchParams.category;
  const selectedRating = searchParams.rating;

  const selectedPage = parseInt(searchParams.page) ?? 1;

  // AÑADIR NUM DE EXTENSIONES DE CADA BROWSER
  const browserValuesWithNums = setBrowsersExtensionQtt(browserValues, extsQtt);

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

  console.log("API CONSULTADA: ", apiURL);

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
