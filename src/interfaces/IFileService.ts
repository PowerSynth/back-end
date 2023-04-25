import { File } from "../models";

export interface IFileService {
   unzipFile(filePath: string): Promise<File>;
   zipFile(sourceFolderPath: string): Promise<string>;
}
