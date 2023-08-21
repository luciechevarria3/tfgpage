import { NextResponse } from "next/server";
import mongojs from "mongojs";

const db = mongojs("extensionsDetails", ["extensions"]);

export async function GET() {
  let extensions;

  db.extensions.find().limit(10, async (err, docs) => {
    if (err) { console.log("DATABASE ERR GETTING 10 EXTS", err); }

    extensions = docs;

    await db.close();
  })

  return NextResponse.json(docs);
}