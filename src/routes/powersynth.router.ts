import { Router } from "express";
import multer from "multer";
import { PowerSynthController } from "../controllers";
import {
   ILoggerService,
   IPowerSynthService,
   IFileService,
} from "../interfaces";
import { FileService } from "../services";
import { LoggerService } from "../services/logger.service";
import { PowerSynthService } from "../services/powersynth.service";
import { FileRepository } from "../data";

const fileService: IFileService = new FileService(new FileRepository());
const loggerService: ILoggerService = new LoggerService();
const powerSynthService: IPowerSynthService = new PowerSynthService();

const powerSynthController = new PowerSynthController(
   fileService,
   powerSynthService,
   loggerService
);

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res) => {
   try {
      const filePath = req.file.path;
      const result = await powerSynthController.runPowerSynth(filePath);
      res.download(result.outputFolderPath);
   } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
   }
});

export { router as powerSynthRouter };
