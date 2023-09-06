"use client"

import { useState, useEffect } from "react";

import DropdownBar from "./components/DropdownBar";
import ExtensionCard from "./components/ExtensionCard";
import SearchBar from "./components/SearchBar";
import TopBar from "./components/TopBar";

async function loadExtensions({ browser, category, rating }) {
  let res;
  if (browser === "Google Chrome") {
    res = await fetch(`http://localhost:3000/chrome/${category}`)
  }
}

export default function SearchPage() {
  const [browser, setBrowser] = useState("All");
  const [category, setCategory] = useState("All");
  const [rating, setRating] = useState("All");
  const [extensions, setExtensions] = useState([]);

  const browserValues = ["Microsoft Edge", "Google Chrome", "Mozilla Firefox"];
  const categoryValues = ["Accesibility", "Blogging", "Communication", "Entertainment", "News & Weather", "Photos", "Productivity", "Search tools", "Shopping", "Social", "Sports"];
  const ratingValues = [1, 2, 3, 4, 5];

  useEffect(async () => {
    const res = await fetch("http://localhost:3000/api/extensions");

    const data = await res.json();

    setExtensions(data);
  }, []);


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
