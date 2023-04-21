import express, { Application, Request, Response } from "express";
import uploadRoutes from "./routes/uploadRoutes";

const app: Application = express();

app.use(express.json());
app.use("/api", uploadRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the file upload API");
});

export default app;
