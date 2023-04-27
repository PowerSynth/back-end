export interface IFileService {
   unzipFile(filePath: string): Promise<string>;
   zipFile(sourceFolderPath: string, includedPaths?: string[]): Promise<string>;
}
