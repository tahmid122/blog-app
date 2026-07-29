import express, { Application, Request, Response } from "express";
const app: Application = express();

//default middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// default get
app.get("/", (req: Request, res: Response) => {
  return res.json("Server is running...");
});

export default app;
