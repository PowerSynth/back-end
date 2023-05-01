import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import httpProxy from "http-proxy";
import cors from "cors";
import { AppConfig } from "./types";
import { powerSynthRouter } from "./routes/powersynth.router";

class App {
   public express: express.Application;
   public config: AppConfig;
   private proxy: httpProxy;

   constructor(config: AppConfig) {
      this.express = express();
      this.config = config;

      this.initMiddleware();
      this.initRoutes();
      this.initErrorHandling();
   }

   private initMiddleware(): void {
      this.express.use(express.json());
      this.express.use(helmet());
      this.express.use(morgan("dev"));
      this.express.use(cors());
   }

   private initRoutes(): void {
      this.express.use("/ps2/api/power-synth", powerSynthRouter);
   }

   private initErrorHandling(): void {
      // Handle 404 errors
      this.express.use((req, res, next) => {
         res.status(404).json({ message: "Not found" });
      });

      // Handle other errors
      this.express.use((err, req, res, next) => {
         console.error(err.stack);
         res.status(500).json({ message: "Internal server error" });
      });
   }

   public start(): void {
      this.express.listen(this.config.port, () => {
         console.log(`Server listening on port ${this.config.port}`);
      });
   }
}

export default App;
