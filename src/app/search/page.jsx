import DropdownBar from "../components/DropdownBar";
import ExtensionCard from "../components/ExtensionCard";
import PaginationControls from "../components/PaginationControls";
import SearchBar from "../components/SearchBar";
import TopBar from "../components/TopBar";

/**
 * Función para conseguir los resultados de la búsqueda del usuario.
 * @param {string} query La búsqueda del usuario. Nombre de la extensión que desea buscar.
 * @param {string} page Número de la página de resultados en la que se encuentra el usuario.
 */
const fetchData = async (query, page) => {
  const res = await fetch(`http://localhost:3000/api/search?${query}&page=${page}`);
  const data = await res.json();

  return data;
}

export default async function SearchPage({ searchParams }) {
  const query = searchParams.q;
  const selectedPage = parseInt(searchParams.page) ?? 1;

  const searchResults = await fetchData(query, selectedPage);
  return (
    <>
      <TopBar />

      <div className="mx-80 mt-8 flex justify-center">
        <SearchBar allExtensions={allExtensions} />
      </div>

      <ul className="mx-80 my-12 grid grid-cols-3 gap-x-12">
        <li>
          <DropdownBar title="Browser" values={browserValuesWithNums} />
        </li>
        <li>
          <DropdownBar title="Category" values={categoriesWithNums} />
        </li>
        <li>
          <DropdownBar title="Rating" values={ratingValues} />
        </li>
      </ul>

      <div className="mx-64 grid grid-cols-4 gap-4 justify-items-center">
        {searchResults.map(extension => (
          <ExtensionCard key={extension._id} name={extension.name} image={extension.image} publisher={extension.publisher} extID={extension._id} />
        ))}
      </div>

      <PaginationControls searchParams={searchParams} extensionsNum={extensions.length} />
    </>
  )
}