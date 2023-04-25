import dotenv from "dotenv";
import App from "./app";

dotenv.config();

const config = {
   port: parseInt(process.env.PORT || "3000"),
   env: process.env.NODE_ENV || "development",
};

const app = new App(config);
app.start();
