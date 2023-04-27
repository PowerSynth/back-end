export interface IFileRepository {
   extractZipFile(filePath: string): Promise<{
      originalNameWithoutExt: string;
      outputFolderPath: string;
   }>;
   createZipFile(
      sourceFolderPath: string,
      includedPaths?: string[]
   ): Promise<string>;
}
