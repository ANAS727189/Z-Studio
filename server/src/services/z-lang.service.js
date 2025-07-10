import { exec } from "child_process";
import fs from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";

export const runZLangCompiler = async (code) => {
  const filename = `temp-${uuid()}.z--`;
  const filepath = path.join("/tmp", filename);

  await fs.writeFile(filepath, code);

  return new Promise((resolve, reject) => {
    exec(`node src/index.js ${filepath}`, (err, stdout, stderr) => {
      if (err) return reject(stderr || err.message);
      resolve(stdout);
    });
  });
};
