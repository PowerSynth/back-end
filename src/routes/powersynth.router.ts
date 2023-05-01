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

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, "./src/uploads/");
   },
   filename: function (req, file, cb) {
      cb(null, file.originalname);
   },
});

const upload = multer({
   storage: storage,
   limits: { fileSize: 1024 * 1024 * 10 },
});

router.post("/", upload.single("file"), async (req, res) => {
   try {
      const filePath = req.file.path;
      const result = await powerSynthController.runPowerSynth(filePath);
      const absolutePath = path.resolve(result);
      console.log(absolutePath);
      res.sendFile(absolutePath);
   } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
   }
});

export { router as powerSynthRouter };
