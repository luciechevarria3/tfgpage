import { connectDB } from "@/utils/database";
import DropdownBar from "./components/DropdownBar";
import ExtensionCard from "./components/ExtensionCard";
import SearchBar from "./components/SearchBar";
import TopBar from "./components/TopBar";

import Extension from "./models/Extension";

async function loadExtensions() {
  connectDB();
  const extensions = await Extension.find({ name: { "$exists": true } }).limit(12);
  return extensions
}

export default async function SearchPage() {
  const extensions = await loadExtensions();

  return (
    <>
      <TopBar />

      <div className="bg-red-200 mx-80 mt-8 flex justify-center">
        <SearchBar />
      </div>

      <ul className="mx-80 my-12 grid grid-cols-3 gap-x-12">
        <li>
          <DropdownBar text="Browser" />
        </li>
        <li>
          <DropdownBar text="Category" />
        </li>
        <li>
          <DropdownBar text="Rating" />
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
