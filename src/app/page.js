import { connectDB } from "@/utils/database";
import DropdownBar from "./components/DropdownBar";
import ExtensionCard from "./components/ExtensionCard";
import SearchBar from "./components/SearchBar";
import TopBar from "./components/TopBar";

import Extension from "./models/Extension";

export default async function SearchPage() {

  connectDB();

  const extensions10 = await Extension.find().limit(10);

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

      <div className="mx-64 grid grid-cols-4 gap-y-8 justify-items-center">
        {extensions10.map(extension => {
          return <ExtensionCard key={extension._id} name={extension.name} image={extension.image} />
        })}
      </div>
    </>
  );
}
