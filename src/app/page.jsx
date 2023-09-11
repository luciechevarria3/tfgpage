"use client"

import { useState, useEffect } from "react";

import DropdownBar from "./components/DropdownBar";
import ExtensionCard from "./components/ExtensionCard";
import SearchBar from "./components/SearchBar";
import TopBar from "./components/TopBar";

export default function SearchPage() {
  const browserValues = ["Microsoft Edge", "Google Chrome", "Mozilla Firefox"];
  const allCats = ['accesibility', 'alerts & updates', 'appearance', 'blogging', 'bookmarks', 'communication', 'developer tools', 'download management', 'entertainment', 'feeds, news & blogging', 'fun', 'games & entertainment', 'language support', 'news & weather', 'other', 'photos', 'photos, music & videos', 'privacy & security', 'productivity', 'search tools', 'shopping', 'social', 'social & communication', 'sports', 'tabs', 'web development'];
  const chromeCats = ["accesibility", "developer tools", "fun", "news & weather", "photos", "productivity", "shopping", "social & communication"];
  const edgeCats = ["accesibility", "blogging", "communication", "developer tools", "entertainment", "news & weather", "photos", "productivity", "search tools", "shopping", "social", "sports"];
  const firefoxCats = ['alerts & updates', 'appearance', 'bookmarks', 'download management', 'feeds, news & blogging', 'games & entertainment', 'language support', 'other', 'photos, music & videos', 'privacy & security', 'search tools', 'shopping', 'social & communication', 'tabs', 'web development'];
  const ratingValues = [1, 2, 3, 4, 5];

  const [browser, setBrowser] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState(allCats);
  const [rating, setRating] = useState("");
  const [extensions, setExtensions] = useState([]);


  const handleBrowserChange = (selectedBrowser) => {
    if (selectedBrowser === "All") {
      setBrowser("");
    }
    else {
      setBrowser(selectedBrowser);
    }
  }

  const handleCategoryChange = (selectedCategory) => {
    if (selectedCategory === "All") {
      setCategory("");
    }
    else {
      setCategory(selectedCategory);
    }
  }

  const handleRatingChange = (selectedRating) => {
    if (selectedRating === "All") {
      setRating("");
    }
    else {
      setRating(selectedRating);
    }
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
      apiURL += `/${normalBrowser}`;
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

  useEffect(() => {
    switch (browser) {
      case "Google Chrome":
        setCategories(chromeCats);
        break;

      case "Microsoft Edge":
        setCategories(edgeCats);
        break;

      case "Mozilla Firefox":
        setCategories(firefoxCats);
        break;

      default:
        setCategories(allCats);
        break;
    }

  }, [browser])



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
          <DropdownBar title="Category" values={categories} callback={handleCategoryChange} />
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
