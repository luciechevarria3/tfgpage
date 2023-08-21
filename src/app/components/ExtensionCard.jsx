export default function ExtensionCard(props) {
  return (
    <>
      <div className="border-4 border-slate-300 rounded-lg w-60 h-64 p-4 text-white">

        <div className="flex justify-center">
          <img
            className="rounded-full w-24 h-24 border-4 border-white scale-75"
            src={props.image}
            alt="adobe icon"
          />
        </div>

        <h2 className="text-center">
          {props.name}
        </h2>

        <div className="flex justify-center mt-4">
          <img className="inline w-8 h-8" src="/chrome.png" alt="chrome icon" />
          <img className="inline w-8 h-8" src="/edge.png" alt="edge icon" />
          <img
            className="inline w-8 h-8"
            src="/firefox.png"
            alt="firefox icon"
          />
        </div>

      </div>
    </>
  );
}
