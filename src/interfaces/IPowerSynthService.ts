export interface IPowerSynthService {
  runScript(scriptPath: string): Promise<number>;
}
