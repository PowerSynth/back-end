import { spawn } from "child_process";

export async function runPowerSynthScript(
  macroScriptPath: string
): Promise<number> {
  return new Promise((resolve, reject) => {
    const command = "PowerSynth2";
    const args = [macroScriptPath];
    console.log(`Running command: ${command} ${args.join(" ")}`);
    const powerSynthProcess = spawn(command, args);

    powerSynthProcess.stdin.write("y\n");

    powerSynthProcess.stdout.on("data", (data) => {
      console.log(`stdout:\n${data}`);
    });

    powerSynthProcess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    powerSynthProcess.on("close", (code) => {
      console.log(`PowerSynth process exited with code ${code}`);
      resolve(code);
    });
  });
}
