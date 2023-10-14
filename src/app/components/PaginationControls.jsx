import Link from "next/link"
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"

export default async function PaginationControls({ searchParams }) {
  const selectedPage = parseInt(searchParams.page) || 1;

  const selectedBrowser = searchParams.browser || "all";
  const selectedCategory = searchParams.category || "all";
  const selectedRating = searchParams.rating || "all";

  function PreviousPage({ selectedPage }) {
    if (selectedPage > 1) {
      const previousPageURL = `/?browser=${selectedBrowser}&category=${selectedCategory}&rating=${selectedRating}&page=${selectedPage - 1}`;
      return <Link href={previousPageURL}><AiOutlineLeft /></Link>;
    }
  }

  function checkIfThereIsNextPage({ selectedPage }) {

  }

  let nextPageURL = `/?browser=${selectedBrowser}&category=${selectedCategory}&rating=${selectedRating}&page=${selectedPage + 1}`;

  return (
    <div className="flex flex-row space-x-4 items-center justify-center bg-gray-500 w-full h-10 my-8">
      <PreviousPage selectedPage={selectedPage} />
      <div>{selectedPage}</div>
      <Link href={nextPageURL}><AiOutlineRight /></Link>
    </div>
  )
}