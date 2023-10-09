import DropdownBar from "./components/DropdownBar";
import ExtensionCard from "./components/ExtensionCard";
import SearchBar from "./components/SearchBar";
import TopBar from "./components/TopBar";

let browserValues = ["Google Chrome", "Microsoft Edge", "Mozilla Firefox"];
const allCats = ['Accesibility', 'Alerts & updates', 'Appearance', 'Blogging', 'Bookmarks', 'Communication', 'Developer tools', 'Download management', 'Entertainment', 'Feeds, news & blogging', 'Fun', 'Games & entertainment', 'Language support', 'News & weather', 'Other', 'Photos', 'Photos, music & videos', 'Privacy & security', 'Productivity', 'Search tools', 'Shopping', 'Social', 'Social & communication', 'Sports', 'Tabs', 'Web development'];
const chromeCats = ['Accesibility', 'Developer tools', 'Fun', 'News & weather', 'Photos', 'Productivity', 'Shopping', 'Social & communication', 'Themes'];
const edgeCats = ['Accesibility', 'Blogging', 'Communication', 'Developer tools', 'Entertainment', 'News & weather', 'Photos', 'Productivity', 'Search tools', 'Shopping', 'Social', 'Sports'];
const firefoxCats = ['Alerts & updates', 'Appearance', 'Bookmarks', 'Download management', 'Feeds, news & blogging', 'Games & entertainment', 'Language support', 'Other', 'Photos, music & videos', 'Privacy & security', 'Search tools', 'Shopping', 'Social & communication', 'Tabs', 'Web development'];
const ratingValues = [1, 2, 3, 4, 5];

const capitalizeWord = (loweredWord) => {
  const capitalizedWord = loweredWord.charAt(0).toUpperCase() + loweredWord.slice(1);
  return capitalizedWord;
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

const setExtensionQtt = (values, extsQtt) => {
  // Lowercasear los browsers, categorías, ...
  let loweredValues = [];
  for (let value of values) {
    loweredValues.push(value.toLowerCase());
  }


  let valuesAndQtt = [];

  let qttOfValue;

  // Si es categorías, hay que acceder de distinta manera a los valores

  if (loweredValues.includes('accesibility') || loweredValues.includes('bookmarks')) {
    for (let loweredValue of loweredValues) {
      // Añadir a cada categoría el número de extensiones que tiene
      // Ejemplo: Social & social (2000)
      qttOfValue = extsQtt['categories'][loweredValue];

      if (!qttOfValue) {
        valuesAndQtt.push(`${capitalizeWord(loweredValue)} (?)`);
      }
      else {
        valuesAndQtt.push(`${capitalizeWord(loweredValue)} (${qttOfValue})`);
      }
    }
  }

  else {
    for (let loweredValue of loweredValues) {
      // Añadir a cada browser el número de extensiones que tiene
      // Ejemplo: Social & social (2000)
      qttOfValue = extsQtt[loweredValue];
      if (!qttOfValue) {
        valuesAndQtt.push(`${capitalizeWord(loweredValue)} (?)`);
      }
      else {
        valuesAndQtt.push(`${capitalizeWord(loweredValue)} (${qttOfValue})`);
      }
    }
  }

  // Devolver resultado
  return valuesAndQtt;
}

export default async function SearchPage({ searchParams }) {
  const extsQtt = await fetchExtsQtt();

  const selectedBrowser = searchParams.browser;
  const selectedCategory = searchParams.category;
  const selectedRating = searchParams.rating;

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

  const extensions = await fetchData(apiURL);

  // console.log("SELECTED BROWSER: ", selectedBrowser);
  // console.log("SELECTED CATEGORY: ", selectedCategory);
  // console.log("SELECTED RATING: ", selectedRating);

  let categories = allCats;

  if (selectedBrowser) {
    if (selectedBrowser.includes("chrome")) {
      categories = chromeCats;
    }

    if (selectedBrowser.includes("edge")) {
      categories = edgeCats;
    }

    if (selectedBrowser.includes("firefox")) {
      categories = firefoxCats;
    }
  }

  return (
    <>
      <TopBar />

      <div className="mx-80 mt-8 flex justify-center">
        <SearchBar />
      </div>

      <ul className="mx-80 my-12 grid grid-cols-3 gap-x-12">
        <li>
          <DropdownBar title="Browser" values={browserValues} />
        </li>
        <li>
          <DropdownBar title="Category" values={categories} />
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
    </>
  );
}
