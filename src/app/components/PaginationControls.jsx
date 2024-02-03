import Link from "next/link"

export default async function PaginationControls({ searchParams, extensionsNum }) {
  const selectedPage = parseInt(searchParams.page) || 1;

  const selectedBrowser = searchParams.browser || "all";
  const selectedCategory = searchParams.category || "all";
  const selectedRating = searchParams.rating || "all";

  function PreviousPageButton({ selectedPage }) {
    if (selectedPage > 1) {
      const previousPageURL = `/?browser=${selectedBrowser}&category=${selectedCategory}&rating=${selectedRating}&page=${selectedPage - 1}`;
      return (<Link href={previousPageURL}>
        <div className="bg-slate-600 w-fit border-2 border-red-500 rounded-md hover:bg-slate-500 p-1">
          Prev
        </div>
      </Link>);
    }
  }

  function NextPageButton({ selectedPage }) {
    if (extensionsNum == 12) {
      const nextPageURL = `/?browser=${selectedBrowser}&category=${selectedCategory}&rating=${selectedRating}&page=${selectedPage + 1}`;
      return (<Link href={nextPageURL}>
        <div className="bg-slate-600 w-fit border-2 border-red-500 rounded-md hover:bg-slate-500 p-1">
          Next
        </div>
      </Link>);
    }
  }


  return (
    <div className="flex flex-row space-x-4 items-center justify-center w-full h-10 my-8">
      <PreviousPageButton selectedPage={selectedPage} />
      <div>{selectedPage}</div>
      <NextPageButton selectedPage={selectedPage} />
    </div>
  )
}