"use client"

import { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function DropdownBar({ title, values, callback }) {
  const [selected, setSelected] = useState("All");
  const [opened, setOpened] = useState(false);
  const [extensions, setExtensions] = useState({});

  useEffect(() => {
    async function fetchData(apiURL) {
      const res = await fetch(apiURL);

      const data = await res.json();

      setExtensions(data);
    }

    let apiURL = `http://localhost:3000/api/extensions/number`;

    fetchData(apiURL);

  }, [])


  return (
    <>
      <h2 className="text-xl text-white">{title}</h2>

      <div
        className="bg-white border-2 rounded-full h-12 flex items-center justify-between cursor-pointer"
        onClick={() => {
          setOpened(!opened);
        }}
      >
        <p className="pl-4">{selected}</p>
        <RiArrowDropDownLine size={40} />
      </div>

      <ul className={`bg-white mt-2 max-h-28 overflow-auto ${opened ? "block" : "hidden"}`}>
        {values?.map(value => {
          return (
            <li key={value} className="p-4 hover:bg-sky-600 hover:text-white cursor-pointer"
              onClick={() => { setSelected(value); setOpened(!opened); callback(value); }}
            >
              {`${value} (${extensions[value.toString().toLowerCase()]})`}
            </li>
          )

        })}
      </ul>
    </>
  );
}
