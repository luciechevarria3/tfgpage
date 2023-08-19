import { BiSearch } from "react-icons/bi";

export default function SearchBar() {
  return (
    <>
      <form>
        <input
          className="bg-white w-96 h-12 px-5 pr-10 rounded-full text-sm"
          type="search"
          placeholder="Search here..."
        />
      </form>
    </>
  );
}
