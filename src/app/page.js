import DropdownBar from "./components/DropdownBar";
import ExtensionCard from "./components/ExtensionCard";
import SearchBar from "./components/SearchBar";
import TopBar from "./components/TopBar";

export default function SearchPage() {
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

      <div className="mx-80 grid grid-cols-4 gap-y-8 justify-items-center">
        <ExtensionCard />
        <ExtensionCard />
        <ExtensionCard />
        <ExtensionCard />
        <ExtensionCard />
        <ExtensionCard />
        <ExtensionCard />
        <ExtensionCard />
        <ExtensionCard />
        <ExtensionCard />
      </div>
    </>
  );
}
