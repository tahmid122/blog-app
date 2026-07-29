import express, { Application, Request, Response } from "express";
import { postRoutes } from "./modules/post/post.routes";
const app: Application = express();

//default middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// all routes
app.use("/posts", postRoutes);

// default get
app.get("/", (req: Request, res: Response) => {
  return res.json("Server is running...");
});

export default app;
