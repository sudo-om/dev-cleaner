import { execSync } from "child_process";
import ora from "ora";

export async function autoClean(targetGB = 5) {
  const spinner = ora("Scanning large node_modules...").start();

  const output = execSync(
    'find ~/Developer -type d -name "node_modules" -prune -exec du -sm {} + | sort -hr',
    { encoding: "utf-8", shell: "/bin/bash" }
  );

  let freed = 0;
  const targetMB = targetGB * 1024;

  for (const line of output.split("\n")) {
    if (!line) continue;

    const [size, path] = line.split("\t");

    if (freed >= targetMB) break;

    execSync(`rm -rf "${path}"`);
    freed += parseInt(size);
  }

  spinner.succeed(`🔥 Freed ${(freed / 1024).toFixed(2)} GB`);
}