"use client"

import Link from "next/link"

export default function SearchResultList({ searchResults }) {

  return (
    <div className="bg-white ">
      {searchResults != [] && searchResults.map(result => (
        <Link href={`/extension/${result._id}`} key={result._id}>
          <div className="hover:bg-sky-600 p-2 mb-2">{result.name}</div>
        </Link>
      )
      )}
    </div>
  )
}