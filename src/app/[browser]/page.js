import { connectDB } from "@/utils/database";
import DropdownBar from "../components/DropdownBar";
import ExtensionCard from "../components/ExtensionCard";
import SearchBar from "../components/SearchBar";
import TopBar from "../components/TopBar";

import Extension from "../models/Extension";

async function loadExtensions(browser) {
  connectDB();
  const extensions = await Extension.find({ name: { "$exists": true }, webstore: browser }).limit(12);
  return extensions
}

export default async function FilteredSearchPage({ params }) {
  const browserValues = ["Microsoft Edge", "Google Chrome", "Mozilla Firefox"];
  const categoryValues = ["Accesibility", "Blogging", "Communication", "Entertainment", "News & Weather", "Photos", "Productivity", "Search tools", "Shopping", "Social", "Sports"];

  const browser = params.browser;

  let selectedBrowser;
  if (browser.includes("Microsoft")) { selectedBrowser = "Microsoft Edge" };
  if (browser.includes("Google")) { selectedBrowser = "Google Chrome" };
  if (browser.includes("Mozilla")) { selectedBrowser = "Mozilla Firefox" };

  const extensions = await loadExtensions(selectedBrowser);

  return (
    <>
      <TopBar />

      <div className="mx-80 mt-8 flex justify-center">
        <SearchBar />
      </div>

      <ul className="mx-80 my-12 grid grid-cols-3 gap-x-12">
        <li>
          <DropdownBar title={selectedBrowser} values={browserValues} />
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
