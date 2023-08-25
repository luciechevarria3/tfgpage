import { Schema, model, models, mongoose } from "mongoose";

const extensionSchema = new Schema({
  webstore: {
    type: String,
  },
  name: {
    type: String,
  },
  url: {
    type: String,
  },
  publisher: {
    type: String,
  },
  category: {
    type: String,
  },
  rating: {
    type: Number,
  },
  ratedBy: {
    type: Number,
  },
  lastUpdated: {
    type: String,
  },
  image: {
    type: String,
  },
  installs: {
    type: Number,
  },
  availability: {
    type: String,
  },
  description: {
    type: String,
  },
  lastScraped: {
    type: String,
  },
  _id: mongoose.SchemaTypes.ObjectId,

}, { collection: "pruebaextensions" });

export default models.Extension || model("Extension", extensionSchema);