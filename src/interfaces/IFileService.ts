export interface IFileService {
   unzipAndSaveFile(tempFilePath: string): Promise<string>;
   createZipFile(folderPath: string): Promise<Buffer>;
}
