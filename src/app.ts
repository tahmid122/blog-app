import express, { Application, Request, Response } from "express";
import { postRoutes } from "./modules/post/post.routes";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
const app: Application = express();

app.all("/api/auth/*splat", toNodeHandler(auth));

//default middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.APP_URL, credentials: true }));

// all routes
app.use("/posts", postRoutes);

// default get
app.get("/", (req: Request, res: Response) => {
  return res.json("Server is running...");
});

export default app;
