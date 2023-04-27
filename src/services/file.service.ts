import { IFileRepository } from "../interfaces";
import { File } from "../models";
import { IFileService } from "../interfaces/IFileService";

export class FileService implements IFileService {
   constructor(private readonly fileRepository: IFileRepository) {}
   async unzipFile(filePath: string): Promise<string> {
      const folderPath = await this.fileRepository.extractZipFile(filePath);
      return folderPath;
   }

   async zipFile(
      sourceFolderPath: string,
      includedPaths?: string[]
   ): Promise<string> {
      const zipOutputPath = await this.fileRepository.createZipFile(
         sourceFolderPath,
         includedPaths
      );
      return zipOutputPath;
   }
}
