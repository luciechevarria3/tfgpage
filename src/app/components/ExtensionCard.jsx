import Link from "next/link";

export default function ExtensionCard({ name, image, publisher, extID }) {
  return (
    <>
      <Link href={`/${extID}`}>
        <div className="border-4 border-slate-300 rounded-lg w-fit p-4 text-white hover:bg-slate-600 hover:cursor-pointer">


          <div className="flex justify-center">
            <img
              className="rounded-full w-24 h-24 border-4 border-white scale-75"
              src={image}
              alt={`${name} icon`}
            />
          </div>

          <div className="mb-10 w-48 h-48 text-center">
            <h2 className="font-bold text-lg text-ellipsis overflow-hidden">
              {name}
            </h2>

            <br />

            <span>
              <p>By:</p>
              <h3 className="text-ellipsis overflow-hidden">{publisher}</h3>
            </span>
          </div>

          <div className="flex justify-center">
            <img className="inline w-8 h-8" src="/chrome.png" alt="chrome icon" />
            <img className="inline w-8 h-8" src="/edge.png" alt="edge icon" />
            <img className="inline w-8 h-8" src="/firefox.png" alt="firefox icon" />
          </div>

        </div >
      </Link>
    </>
  );
}
