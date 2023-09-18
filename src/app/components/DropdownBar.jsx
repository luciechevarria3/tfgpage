"use client"

import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function DropdownBar({ title, values }) {
  const [selected, setSelected] = useState("All");
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
        <p className="pl-4">{selected}</p>
        <RiArrowDropDownLine size={40} />
      </div>

      <ul className={`bg-white mt-2 max-h-28 overflow-auto ${opened ? "block" : "hidden"}`}>
        {values?.map(value => (
          <li key={value} className="p-4 hover:bg-sky-600 hover:text-white cursor-pointer"
            onClick={() => { setSelected(value); setOpened(!opened); }}
          >
            {value}
          </li>
        )
        )}
      </ul>
    </>
  );
}
