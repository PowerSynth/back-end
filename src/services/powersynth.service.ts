import { IPowerSynthService } from "../interfaces/IPowerSynthService";
import { spawn } from "child_process";

export class PowerSynthService implements IPowerSynthService {
  async runScript(macroScriptPath: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const child = spawn("PowerSynth2", [macroScriptPath]);

      child.on("error", (err) => {
        console.error("PowerSynth script execution failed:", err);
        reject(err);
      });

      child.on("close", (code) => {
        console.log(`PowerSynth script exited with code ${code}`);
        resolve(code);
      });
    });
  }
}
