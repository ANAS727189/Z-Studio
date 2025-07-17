import { exec } from "child_process";
import fs from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const runZLangCompiler = async (code) => {
  const uniqueId = uuid(); 
  const filename = `temp-${uniqueId}.z--`;
  const filepath = path.join("/tmp", filename);
  const outputBase = path.join("/tmp", `output-${uniqueId}`);
  const outputLLPath = `${outputBase}.ll`; // e.g., /tmp/output-uuid.ll
  const outputCPath = `${outputBase}.c`; // e.g., /tmp/output-uuid.c
  const compilerPath = process.env.COMPILER_PATH;

  try {
    // Writes Z-- code to a temporary file
    await fs.writeFile(filepath, code);

    // Run Z-- compiler
    const compilerPromise = new Promise((resolve, reject) => {
      exec(`node ${compilerPath} ${filepath} ${outputBase}`, { cwd: "/tmp" }, (err, stdout, stderr) => {
        if (err) return reject({ message: stderr || err.message, logs: stderr || '' });
        resolve(stdout);
      });
    });

    const compilerOutput = await compilerPromise;

    // Run lli
    const lliPromise = new Promise((resolve, reject) => {
      exec(`lli-14 ${outputLLPath}`, { cwd: "/tmp" }, (err, stdout, stderr) => {
        if (err)  return reject({ message: stderr || err.message, logs: stderr || '' });
        resolve(stdout);
      });
    });

    const programOutput = await lliPromise;

    return { compilerOutput, programOutput };
  } catch (err) {
     throw {
      message: err.message || 'Compilation failed',
      logs: err.logs || err.message || '',
      suggestions: err.logs ? 'Check syntax and ensure valid Z-- code structure.' : '',
    };
  } finally {
    // Cleanup temporary files
    await Promise.all([
      fs.unlink(filepath).catch(() => {}),
      fs.unlink(outputLLPath).catch(() => {}),
      fs.unlink(outputCPath).catch(() => {}),
    ]);
  }
};