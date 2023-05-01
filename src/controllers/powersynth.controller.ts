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
   ) { }

   async runPowerSynth(filePath: string): Promise<Buffer> {
      try {
         console.log("Running PowerSynth operation...");
         // Unzip the file
         const folderPath = await this.fileService.unzipAndSaveFile(filePath);

         // Run the PowerSynth script on the unzipped folder/macro_script.txt
         await this.powerSynthService.runScript(`${folderPath}/macro_script.txt`);

         // Create a zip file of the output folder
         const outputZip = await this.fileService.createZipFile(folderPath);

         // Log successful operation
         this.loggerService.log(
            `PowerSynth operation on file ${folderPath} was successful`
         );

         // Return outputzip path as Path
         return outputZip;
      } catch (err) {
         // Log error
         this.loggerService.error(
            `Error running PowerSynth operation: ${err.message}`
         );

         throw err;
      }
   }
}
