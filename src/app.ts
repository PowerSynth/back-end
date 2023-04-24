import express, { Application, Request, Response } from "express";
import routes from "./routes";

const app: Application = express();

app.use(express.json());
app.use("/", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the file upload API");
});

export default app;
