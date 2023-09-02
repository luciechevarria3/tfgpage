import DropdownBar from "./components/DropdownBar";
import ExtensionCard from "./components/ExtensionCard";
import SearchBar from "./components/SearchBar";
import TopBar from "./components/TopBar";

async function loadExtensions() {
  const res = await fetch("http://localhost:3000/api/extensions");

  let data = await res.json();

  data = data.slice(0, 12);

  return data;
}

export default async function SearchPage() {
  const browserValues = ["Microsoft Edge", "Google Chrome", "Mozilla Firefox"];
  const categoryValues = ["Accesibility", "Blogging", "Communication", "Entertainment", "News & Weather", "Photos", "Productivity", "Search tools", "Shopping", "Social", "Sports"];

  const extensions = await loadExtensions();

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
          <DropdownBar title="Category" values={categoryValues} />
        </li>
        <li>
          <DropdownBar title="Rating" />
        </li>
      </ul>

      <div className="mx-64 grid grid-cols-4 gap-4 justify-items-center">
        {extensions.map(extension => (
          <ExtensionCard id={extension._id} name={extension.name} image={extension.image} publisher={extension.publisher} extID={extension._id} />
        ))}
      </div>
    </>
  );
}
