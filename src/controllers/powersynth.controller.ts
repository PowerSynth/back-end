import {
   IPowerSynthService,
   IFileService,
   ILoggerService,
} from "../interfaces";
import { Path } from "typescript";

export class PowerSynthController {
   constructor(
      private readonly fileService: IFileService,
      private readonly powerSynthService: IPowerSynthService,
      private readonly loggerService: ILoggerService
   ) {}

   async runPowerSynth(filePath: string): Promise<string> {
      try {
         console.log("Running PowerSynth operation...");
         // Unzip the file
         const folderPath = await this.fileService.unzipFile(filePath);

         // Run the PowerSynth script
         await this.powerSynthService.runScript(folderPath);

         // Create a zip file of the output folder
         const outputZipPath = await this.fileService.zipFile(folderPath);

         // Log successful operation
         this.loggerService.log(
            `PowerSynth operation on file ${folderPath} was successful`
         );
         // Return outputzip path as Path
         return outputZipPath;
      } catch (err) {
         // Log error
         this.loggerService.error(
            `Error running PowerSynth operation: ${err.message}`
         );

         throw err;
      }
   }
}
