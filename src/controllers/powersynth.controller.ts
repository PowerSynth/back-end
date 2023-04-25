import { Request } from "express";
import {
   IPowerSynthService,
   IFileService,
   ILoggerService,
} from "../interfaces";
import { File } from "../models";

export class PowerSynthController {
   constructor(
      private readonly fileService: IFileService,
      private readonly powerSynthService: IPowerSynthService,
      private readonly loggerService: ILoggerService
   ) {}

   async runPowerSynth(filePath: string): Promise<File> {
      try {
         // Unzip the file
         const file = await this.fileService.unzipFile(filePath);

         // Run the PowerSynth script
         await this.powerSynthService.runScript(file.outputFolderPath);

         // Create a zip file of the output folder
         const outputZipPath = await this.fileService.zipFile(file.outputFolderPath);

         // Log successful operation
         this.loggerService.log(
            `PowerSynth operation on file ${file.originalNameWithoutExt} was successful`
         );

         return {
            originalNameWithoutExt: file.originalNameWithoutExt,
            outputFolderPath: file.outputFolderPath,
            zipPath: outputZipPath,
         };
      } catch (err) {
         // Log error
         this.loggerService.error(
            `Error running PowerSynth operation: ${err.message}`
         );

         throw err;
      }
   }
}
