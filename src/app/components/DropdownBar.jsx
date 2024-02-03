"use client"

import { useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
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

  let selectedBrowser = searchParams.get("browser") || "all";
  let selectedCategory = searchParams.get("category") || "all";
  let selectedRating = searchParams.get("rating") || "all";
  let selectedValue = searchParams.get(title.toLowerCase()) || "all";

  selectedCategory = selectedCategory.replace("&", "and");

  let url;

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
        {values?.map(value => {
          if (title === "Browser") {
            url = `?browser=${value}&category=${selectedCategory}&rating=${selectedRating}`;
          }

          if (title === "Category") {
            url = `?browser=${selectedBrowser}&category=${value.replace("&", "and")}&rating=${selectedRating}`;
          }

          if (title === "Rating") {
            url = `?browser=${selectedBrowser}&category=${selectedCategory}&rating=${value}`;
          }

          return (
            <Link key={value} href={url}>
              <li key={value} className="p-4 hover:bg-sky-600 hover:text-white cursor-pointer"
                onClick={() => { setOpened(!opened); }}
              >
                {value}
              </li>
            </Link>
          )
        }
        )}
      </ul>
    </>
  );
}
