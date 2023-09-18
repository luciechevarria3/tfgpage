import DropdownBar from "./components/DropdownBar";
import ExtensionCard from "./components/ExtensionCard";
import SearchBar from "./components/SearchBar";
import TopBar from "./components/TopBar";

const browserValues = ["Google Chrome", "Microsoft Edge", "Mozilla Firefox"];
const allCats = ['Accesibility', 'Alerts & updates', 'Appearance', 'Blogging', 'Bookmarks', 'Communication', 'Developer tools', 'Download management', 'Entertainment', 'Feeds, news & blogging', 'Fun', 'Games & entertainment', 'Language support', 'News & weather', 'Other', 'Photos', 'Photos, music & videos', 'Privacy & security', 'Productivity', 'Search tools', 'Shopping', 'Social', 'Social & communication', 'Sports', 'Tabs', 'Web development'];
const chromeCats = ['Accesibility', 'Developer tools', 'Fun', 'News & weather', 'Photos', 'Productivity', 'Shopping', 'Social & communication', 'Themes'];
const edgeCats = ['Accesibility', 'Blogging', 'Communication', 'Developer tools', 'Entertainment', 'News & weather', 'Photos', 'Productivity', 'Search tools', 'Shopping', 'Social', 'Sports'];
const firefoxCats = ['Alerts & updates', 'Appearance', 'Bookmarks', 'Download management', 'Feeds, news & blogging', 'Games & entertainment', 'Language support', 'Other', 'Photos, music & videos', 'Privacy & security', 'Search tools', 'Shopping', 'Social & communication', 'Tabs', 'Web development'];
const ratingValues = [1, 2, 3, 4, 5];

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
  const selectedBrowser = searchParams.browser;
  const selectedCategory = searchParams.category;
  const selectedRating = searchParams.rating;

  let apiURL = `http://localhost:3000/api/extensions?`;

  if (selectedBrowser) {
    apiURL += `&browser=${selectedBrowser.toLowerCase()}`
  }

  if (selectedCategory) {
    apiURL += `&category=${selectedCategory.toLowerCase()}`
  }

  if (selectedRating) {
    apiURL += `&rating=${selectedRating}`
  }

  const extsQtt = await fetchExtsQtt();
  const extensions = await fetchData(apiURL);

  console.log("SELECTED BROWSER: ", selectedBrowser);
  console.log("SELECTED CATEGORY: ", selectedCategory);
  console.log("SELECTED RATING: ", selectedRating);


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
          <DropdownBar title="Category" values={allCats} />
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
