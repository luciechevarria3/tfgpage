import { connect, connection } from "mongoose";

const conn = {
  isConnected: false,
}

export async function connectDB() {
  if (conn.isConnected) return;

  const db = await connect("mongodb://localhost/extensionsDetails");
  conn.isConnected = db.connections[0].readyState;
}

connection.on("connected", () => {
  console.log("MongoDB is connected.");
})

connection.on("error", error => {
  console.log("Connection error.", error);
})