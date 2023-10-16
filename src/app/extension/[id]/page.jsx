import Link from "next/link";
import TopBar from "../../components/TopBar";
import ReadMore from "@/app/components/ReadMore";

async function loadExtension(extID) {
  const res = await fetch(`http://localhost:3000/api/extensions?id=${extID}`);

  const data = await res.json();

  return data;
}

// const showWholeDescription = () => {
//   const firstPartOfDescription = document.getElementById("firstPartOfDescription");

//   const wholeDescription = document.getElementById("wholeDescription");

//   firstPartOfDescription.style.display = "none";

//   wholeDescription.style.display = "block";
// }

// const CutExtensionDescription = ({ extensionDescription }) => {
//   let res = <>{extensionDescription}</>
//   if (extensionDescription.length > 100) {
//     const firstPartOfDescription = `${extensionDescription.substring(0, 100)}...`;
//     res = (
//       <>
//         <p id="firstPartOfDescription">
//           {firstPartOfDescription}
//         </p>
//         <p id="wholeDescription" style="display: none">
//           {extensionDescription}
//         </p>
//         <button onClick={showWholeDescription}>Read More</button>
//       </>
//     )
//   }
//   return res;
// }

// PÁGINA PARA MOSTRAR INFORMACIÓN DE LA EXTENSIÓN

export default async function ExtensionPage({ params }) {
  const extensionID = params.id;

  const extension = await loadExtension(extensionID)

  const lastUpdated = extension.lastUpdated.replace("Updated", "");

  return (
    <>
      <TopBar />
      <div className="mx-64">
        <div className="p-4 my-4 text-white grid grid-cols-6 gap-4 bg-zinc-400 rounded-2xl">
          <img className="row-span-2 h-[120px] w-[120px] border-2 top-3" src={extension.image} />

          <a href={extension.url} target="_blank"><h1 className="text-4xl col-span-5">{extension.name}</h1></a>

          <div>
            <h2 className="text-xl">Publisher</h2>
            <p className="pt-8">{extension.publisher}</p>
          </div>

          <div>
            <h2 className="text-xl">Category</h2>
            <p className="pt-8">{extension.category}</p>
          </div>

          <div>
            <h2 className="text-xl">Rating</h2>
            <p className="pt-8">{extension.rating} stars out of 5</p>
          </div>

          <div>
            <h2 className="text-xl">Installs</h2>
            <p className="pt-8">{extension.installs}</p>
          </div>

          <div>
            <h2 className="text-xl">Last time updated</h2>
            <p className="pt-1">{lastUpdated}</p>
          </div>

        </div>

        <div className="bg-zinc-400 p-4 rounded-2xl">
          <h1 className="text-4xl">About this extension</h1>
          <br />
          {/* <CutExtensionDescription extensionDescription={extension.description} /> */}
          {/* <p style={{ whiteSpace: "pre-line" }}>
            {extension.description}
          </p> */}
          <ReadMore extensionDescription={extension.description} />
        </div>
      </div>
    </>
  );
}
