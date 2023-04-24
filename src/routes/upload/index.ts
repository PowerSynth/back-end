import { Request, Response } from "express";
import express from "express";
import AdmZip from "adm-zip";
import multer from "multer";
import fs from "fs";
import path from "path";
import { runPowerSynthScript } from "../../services/powersynth2/powerSynthScript";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req: Request, res: Response) => {
	try {
		// Get the uploaded file
		const filePath = req.file.path;

		// Unzip the file using AdmZip
		const zip = new AdmZip(filePath);
		const originalNameWithoutExt = path.basename(req.file.originalname, path.extname(req.file.originalname));
		const outputFolderPath = `./uploads/${originalNameWithoutExt}`;
		zip.extractAllTo('./uploads', true);

		console.log("Extraction complete!");

		// Run the PowerSynth script
		const exitCode = await runPowerSynthScript(`${outputFolderPath}/macro_script.txt`);

		// Delete the temporary file
		fs.unlink(filePath, (err) => {
			if (err) {
				console.error("Error deleting file:", err);
			}
		});

		if (exitCode === 0) {
			// Send a success response
			res.status(200).json({ message: "File unzipped, saved, and script executed" });
		} else {
			res.status(500).json({ message: "Internal server error" });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
	}
});

export default router;
