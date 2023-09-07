"use client"

import { useState, useEffect } from "react";

import DropdownBar from "./components/DropdownBar";
import ExtensionCard from "./components/ExtensionCard";
import SearchBar from "./components/SearchBar";
import TopBar from "./components/TopBar";

export default function SearchPage() {
  const [browser, setBrowser] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [extensions, setExtensions] = useState([]);

  const browserValues = ["Microsoft Edge", "Google Chrome", "Mozilla Firefox"];
  const categoryValues = ["Accesibility", "Blogging", "Communication", "Entertainment", "News & Weather", "Photos", "Productivity", "Search tools", "Shopping", "Social", "Sports"];
  const ratingValues = [1, 2, 3, 4, 5];

  const handleBrowserChange = (selectedBrowser) => {
    if (selectedBrowser === "All") {
      setBrowser("");
    }
    setBrowser(selectedBrowser);
  }

  const handleCategoryChange = (selectedCategory) => {
    if (selectedCategory === "All") {
      setCategory("");
    }
    setCategory(selectedCategory);
  }

  const handleRatingChange = (selectedRating) => {
    if (selectedRating === "All") {
      setRating("");
    }
    setRating(selectedRating);
  }

  function normalizeBrowser(browser) {
    if (!browser) { return null };
    let normalizedBrowser = browser;

    if (browser.includes("Google")) { normalizedBrowser = "chrome"; }
    if (browser.includes("Microsoft")) { normalizedBrowser = "edge"; }
    if (browser.includes("Mozilla")) { normalizedBrowser = "firefox"; }

    return normalizedBrowser;
  }

  useEffect(() => {
    async function fetchData(apiURL) {
      const res = await fetch(apiURL);

      const data = await res.json();

      setExtensions(data);
    }

    let apiURL = `http://localhost:3000/api/extensions`;

    if (browser !== "") {
      const normalBrowser = normalizeBrowser(browser);
      apiURL += `/${normalBrowser}?`;
    }

    if (category !== "") {
      apiURL += `?&category=${category}`;
    }

    if (rating !== "") {
      apiURL += `?&rating=${rating}`;
    }

    fetchData(apiURL);

    alert(apiURL);

  }, [browser, category, rating]);


  return (
    <>
      <TopBar />

      <div className="mx-80 mt-8 flex justify-center">
        <SearchBar />
      </div>

      <ul className="mx-80 my-12 grid grid-cols-3 gap-x-12">
        <li>
          <DropdownBar title="Browser" values={browserValues} callback={handleBrowserChange} />
        </li>
        <li>
          <DropdownBar title="Category" values={categoryValues} callback={handleCategoryChange} />
        </li>
        <li>
          <DropdownBar title="Rating" values={ratingValues} callback={handleRatingChange} />
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
