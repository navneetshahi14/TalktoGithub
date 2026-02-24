import { Schema, model } from "mongoose";

const repoSummarySchema = new Schema(
  {
    repoId: { type: String, required: true, unique: true },
    summary: { type: String, required: true },
  },
  { timestamps: true },
);

export const RepoSummaryModel = model("RepoSummary", repoSummarySchema);
