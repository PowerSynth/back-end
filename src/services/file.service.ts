import { IFileService } from '@/interfaces';
import AdmZip from 'adm-zip';
import fs from 'fs';
import path from 'path';

export class FileService implements IFileService {
   createZipFile(folderPath: string): Promise<Buffer> {
      return new Promise((resolve, reject) => {
         // Log zipping process
         console.log('Zipping folder...');
         try {
            const zip = new AdmZip();
            zip.addLocalFolder(folderPath);

            // Get the folder name of the folder we want to zip
            const folderName = path.basename(folderPath);
            const zipFileName = `${folderName}.zip`;
            const zipFilePath = path.resolve(`./uploads/${zipFileName}`);

            // Write the zip file to the uploads folder
            zip.writeZip(zipFilePath);

            // Read the file back as a buffer
            fs.readFile(zipFilePath, (err, data) => {
               if (err) {
                  reject('Error occurred while reading the file.');
               }

               fs.unlink(zipFilePath, (err) => {
                  if (err) {
                     console.log('Error occurred while deleting temporary file:', err);
                  }
               });

               // Log zipping process
               console.log('Zipping completed.');
               resolve(data);
            });
         } catch (err) {
            reject('Error occurred while zipping the file.');
         }
      });
   }

   async unzipAndSaveFile(tempFilePath: string): Promise<string> {
      return new Promise((resolve, reject) => {
         // Log unzipping process
         console.log('Unzipping file...');
         try {
            const zip = new AdmZip(tempFilePath);

            // Get the folder name of the zip file
            zip.extractAllTo(path.dirname(tempFilePath), true);
            console.log("Extraction complete!");

            // Log deleting the zip file
            console.log(`Deleting file ${tempFilePath}...`);

            fs.unlinkSync(tempFilePath);

            // Return the folder path of the unzipped folder with trailing slash
            resolve(path.join(path.dirname(tempFilePath), path.basename(tempFilePath, ".zip")));
         } catch (err) {
            reject('Error occurred while unzipping the file.');
         }
      });
   }
}
