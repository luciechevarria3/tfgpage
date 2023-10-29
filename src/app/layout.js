import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ExtensionSearch",
  description: "Search information about extensions from Chrome, Edge and Firefox.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-800`}>{children}</body>
    </html>
  );
}
