import AdmZip from "adm-zip";
import path from "path";
import { IFileRepository } from "../interfaces";
import fs from "fs";

export class FileRepository implements IFileRepository {
   async extractZipFile(filePath: string): Promise<string> {
      // Log where the file is being extracted
      console.log(`Extracting file ${filePath}...`);
      const zip = new AdmZip(filePath);
      // Extract file to its current directory
      zip.extractAllTo(path.dirname(filePath), true);
      console.log("Extraction complete!");

      // Log deleting the zip file
      console.log(`Deleting file ${filePath}...`);

      // Delete the zip file
      fs.unlinkSync(filePath);

      // return path to the extracted folder
      return path.join(path.dirname(filePath), path.basename(filePath, ".zip"));
   }

   async createZipFile(
      sourceFolderPath: string,
      includedPaths: string[] = []
   ): Promise<string> {
      const zipOutputPath = `${sourceFolderPath}.zip`;
      const zipFile = new AdmZip();

      const walkSync = (dir: string, fileList: string[] = []) => {
         const files = fs.readdirSync(dir);
         files.forEach((file) => {
            const filePath = path.join(dir, file);
            if (fs.statSync(filePath).isDirectory()) {
               fileList = walkSync(filePath, fileList);
            } else {
               fileList.push(filePath);
            }
         });
         return fileList;
      };

      const allFiles = walkSync(sourceFolderPath);

      const filesToAdd =
         includedPaths.length > 0
            ? allFiles.filter((file) => {
                 const relativePath = path.relative(sourceFolderPath, file);
                 return includedPaths.some((pattern) =>
                    minimatch(relativePath, pattern)
                 );
              })
            : allFiles;

      filesToAdd.forEach((file) => {
         const relativePath = path.relative(sourceFolderPath, file);
         zipFile.addLocalFile(file, path.dirname(relativePath));
      });

      zipFile.writeZip(zipOutputPath);

      console.log("Zipping complete!");

      return zipOutputPath;
   }
}
