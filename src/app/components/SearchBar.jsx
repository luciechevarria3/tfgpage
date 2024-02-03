"use client"
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import SearchResultList from "./SearchResultList";

export default function SearchBar({ allExtensions }) {

  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const results = allExtensions.filter(extension => {
      return input && extension && extension.name.toLowerCase().includes(input.toLowerCase());
    }).slice(0, 6);

    setSearchResults(results);

    console.log("Your search: ", input);

    console.log("Search results: ", results);
  }, [input])

  const handleChange = async (value) => {
    setInput(value);
  }

  return (
    <div className="grid grid-cols-1 gap-5">
      <form>
        <input
          className="bg-white w-96 h-12 px-5 pr-10 rounded-full text-sm"
          placeholder="Search here..."
          onChange={(e) => handleChange(e.target.value)}
        />
      </form>
      <SearchResultList searchResults={searchResults} />
    </div>
  );
}
