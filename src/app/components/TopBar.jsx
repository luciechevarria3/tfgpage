import Link from "next/link";

export default function TopBar() {
  return (
    <>
      <nav className="bg-blue-400 w-full h-32 flex justify-center">
        {/* <img src='/extensionsearchLogo.png' width="500px" /> */}
        <Link href="/">
          <img className="w-28 h-28 mt-2" src="/puppeteer-icon.png" />
        </Link>
      </nav>
    </>
  );
}
