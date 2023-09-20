"use client"

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { RiArrowDropDownLine } from "react-icons/ri";
import Link from "next/link";

function capitalizeValue(sentence) {
  const sentenceWords = sentence.split(" ");
  let capitalizedWords = [];
  for (let word of sentenceWords) {
    capitalizedWords.push(word.charAt(0).toUpperCase() + word.slice(1));
  }

  let capitalizedSentence = "";

  for (let word of capitalizedWords) {
    if (word !== capitalizedWords[capitalizedWords.length - 1]) {
      capitalizedSentence += word + " ";
    }
    else {
      capitalizedSentence += word;
    }
  }

  return capitalizedSentence;
}

export default function DropdownBar({ title, values }) {
  const searchParams = useSearchParams();

  let url = "?";

  const selectedBrowser = searchParams.get("browser");
  const selectedCategory = searchParams.get("category");
  const selectedRating = searchParams.get("rating");

  if (selectedBrowser) {
    url += `&browser=${selectedBrowser.toLowerCase()}`
  }

  if (selectedCategory) {
    url += `&category=${selectedCategory.toLowerCase()}`
  }

  if (selectedRating) {
    url += `&rating=${selectedRating}`
  }

  const selectedValue = searchParams.get(title.toLowerCase());

  // console.log(`${title} DROPDOWN:\n`);
  // console.log(`SELECTED BROWSER: ${selectedBrowser}`);
  // console.log(`SELECTED CATEGORY: ${selectedCategory}`);
  // console.log(`SELECTED RATING: ${selectedRating} \n`);

  // const [selected, setSelected] = useState("All");
  const [opened, setOpened] = useState(false);

  return (
    <>
      <h2 className="text-xl text-white">{title}</h2>

      <div
        className="bg-white border-2 rounded-full h-12 flex items-center justify-between cursor-pointer"
        onClick={() => {
          setOpened(!opened);
        }}
      >
        <p className="pl-4">{selectedValue ? capitalizeValue(selectedValue.toString()) : "All"}</p>
        <RiArrowDropDownLine size={40} />
      </div>

      <ul className={`bg-white mt-2 max-h-28 overflow-auto ${opened ? "block" : "hidden"}`}>
        {values?.map(value => (
          <Link key={value} className="p-4 hover:bg-sky-600 hover:text-white cursor-pointer"
            href={`?${title?.toLowerCase()}=${value.toString().toLowerCase()}`}
            // href={url}
            onClick={() => { setOpened(!opened); }}
          >
            {value}
          </Link>
        )
        )}
      </ul>
    </>
  );
}
