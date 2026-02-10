import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import repositoryRoutes from './modules/repositories/repository.route'
const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/repositories", repositoryRoutes)

app.get("/health", (_, res) => {
  res.json({ status: "OK" });
});

export default app;
