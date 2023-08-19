import TopBar from "../components/TopBar";

export default function ExtensionPage() {
  return (
    <>
      <TopBar />
      <div className="mx-80">
        <div className="p-4 my-4 text-white grid grid-cols-6 gap-4">
          <img className="row-span-2" src="/adobe.jpg" />

          <h1 className="text-4xl col-span-4">Adobe Acrobat Reader</h1>
          <div className="border-2">
            <h2>Dropdown bar SCRAPING DATE</h2>
          </div>
          <div className="border-2">
            <h2 className="text-xl">Publisher</h2>
            <p>Lorem ipsum dolor sit amet</p>
          </div>
          <div className="border-2">
            <h2 className="text-xl">Category</h2>
            <p>Lorem ipsum dolor sit amet</p>
          </div>
          <div className="border-2">
            <h2 className="text-xl">Rating</h2>
            <p>Lorem ipsum dolor sit amet</p>
          </div>
          <div className="border-2">
            <h2 className="text-xl">Installs</h2>
            <p>Lorem ipsum dolor sit amet</p>
          </div>
          <div className="border-2">
            <h2 className="text-xl">Last time updated</h2>
            <p>Lorem ipsum dolor sit amet</p>
          </div>
        </div>

        <div className="bg-zinc-400 p-4 rounded-2xl">
          <h1 className="text-4xl">About this extension</h1>
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
            <br />
            <br />
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
            sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
            aliquid ex ea commodi consequatur? Quis autem vel eum iure
            reprehenderit qui in ea voluptate velit esse quam nihil molestiae
            consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
            pariatur?
          </p>
        </div>
      </div>
    </>
  );
}
