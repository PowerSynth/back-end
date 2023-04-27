export interface IFileRepository {
   extractZipFile(filePath: string): Promise<string>;
   createZipFile(
      sourceFolderPath: string,
      includedPaths?: string[]
   ): Promise<string>;
}
