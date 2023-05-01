import { Router } from "express";
import multer from "multer";
import path from "path";
import { PowerSynthController } from "../controllers";
import {
   ILoggerService,
   IPowerSynthService,
   IFileService,
} from "../interfaces";
import { FileService } from "../services";
import { LoggerService } from "../services/logger.service";
import { PowerSynthService } from "../services/powersynth.service";

const fileService: IFileService = new FileService();
const loggerService: ILoggerService = new LoggerService();
const powerSynthService: IPowerSynthService = new PowerSynthService();

const powerSynthController = new PowerSynthController(
   fileService,
   powerSynthService,
   loggerService
);

const router = Router();

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, "./uploads/");
   },
   filename: function (req, file, cb) {
      cb(null, file.originalname);
   },
});

const upload = multer({
   storage: storage,
   limits: { fileSize: 1024 * 1024 * 30 },
});

router.post("/", upload.single("file"), async (req, res) => {
   try {
      // Run the PowerSynth operation
      const zipBuffer = await powerSynthController.runPowerSynth(req.file.path);

      // Set headers for the response
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename=result.zip');

      // Send the buffer as a response
      res.send(zipBuffer);
   } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
   }
});

export { router as powerSynthRouter };
