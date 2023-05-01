import { IPowerSynthService } from "@/interfaces";
import { spawn } from "child_process";

export class PowerSynthService implements IPowerSynthService {
  async runScript(macroScriptPath: string): Promise<number> {
    console.log(`Running PowerSynth script on ${macroScriptPath}...`);
    return new Promise((resolve, reject) => {
      // Log script execution and log the script path
      const child = spawn("PowerSynth2", [macroScriptPath]);

      child.stdout.on("data", (data) => {
        console.log(data.toString());
      });

      child.stderr.on("data", (data) => {
        console.error(`PowerSynth script stderr: ${data}`);
      });

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
