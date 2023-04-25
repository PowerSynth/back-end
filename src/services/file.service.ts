import AdmZip from "adm-zip";
import { IFileRepository } from "../interfaces";
import { File } from "../models";
import { IFileService } from "../interfaces/IFileService";

export class FileService implements IFileService {
   constructor(private readonly fileRepository: IFileRepository) {}

   async unzipFile(filePath: string): Promise<File> {
      const { originalNameWithoutExt, outputFolderPath } =
         await this.fileRepository.extractZipFile(filePath);

      return {
         originalNameWithoutExt,
         outputFolderPath,
      };
   }

   async zipFile(sourceFolderPath: string): Promise<string> {
      const zipOutputPath = await this.fileRepository.createZipFile(
         sourceFolderPath
      );
      return zipOutputPath;
   }
}
