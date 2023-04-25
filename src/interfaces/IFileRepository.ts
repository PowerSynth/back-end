export interface IFileRepository {
   extractZipFile(filePath: string): Promise<{
      originalNameWithoutExt: string;
      outputFolderPath: string;
   }>;
   createZipFile(sourceFolderPath: string): Promise<string>;
}
