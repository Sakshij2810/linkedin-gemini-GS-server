import mongoose from "mongoose";

const { Schema } = mongoose;

const dataSchema = new Schema({
  end_year: { type: String },
  intensity: { type: Number },
  sector: { type: String },
  topic: { type: String },
  insight: { type: String },
  url: { type: String },
  region: { type: String },
  start_year: { type: String },
  impact: { type: String },
  added: { type: String },
  published: { type: String },
  country: { type: String },
  relevance: { type: String },
  pestle: { type: String },
  source: { type: String },
  title: { type: String },
  likelihood: { type: String },
});

const BlackofferCollectionGUI = mongoose.model(
  "BlackofferCollectionGUI",
  dataSchema
);

export default BlackofferCollectionGUI;
