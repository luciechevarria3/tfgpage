import Link from "next/link";
import TopBar from "../../components/TopBar";
import ReadMore from "@/app/components/ReadMore";

async function loadExtension(extID) {
  const res = await fetch(`http://localhost:3000/api/extensions?id=${extID}`);

  const data = await res.json();

  return data;
}

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

          <h1 className="text-4xl col-span-5"><a href={extension.url} target="_blank">{extension.name}</a></h1>

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
          <ReadMore extensionDescription={extension.description} />
        </div>
      </div>
    </>
  );
}
