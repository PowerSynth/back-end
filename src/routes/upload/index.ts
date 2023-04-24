import { Request, Response } from "express";
import express from "express";
import AdmZip from "adm-zip";
import multer from "multer";
import fs from "fs";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req: Request, res: Response) => {
	try {
		// Get the uploaded file
		const filePath = req.file.path;

		// Unzip the file using AdmZip
		const zip = new AdmZip(filePath);
		zip.extractAllTo("./uploads", true);

		console.log("Extraction complete!");

		// Delete the temporary file
		fs.unlink(filePath, (err) => {
			if (err) {
				console.error("Error deleting file:", err);
			}
		});

		// Send a success response
		res.status(200).json({ message: "File unzipped and saved" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
	}
});

export default router;
