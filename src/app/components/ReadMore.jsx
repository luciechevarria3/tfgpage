"use client"

import { useState } from "react"

const paragraphStyles = { WebkitLineClamp: 5, WebkitBoxOrient: "vertical", overflow: "hidden", display: "-webkit-box", whiteSpace: "pre-line" }

export default function ReadMore({ extensionDescription }) {

  const [isOpen, setIsOpen] = useState(false);

  const ShowReadMoreButton = () => {
    if (extensionDescription.length > 60) {
      return (
        <button className="h-10 w-24 bg-[#205295] hover:bg-[#2C74B3] text-white rounded-sm" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "Read Less" : "Read More"}
        </button>
      );
    }
  }

  return (<>
    <p style={isOpen ? null : paragraphStyles}>
      {extensionDescription}
    </p>
    <ShowReadMoreButton />
  </>)
}