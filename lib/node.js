import { checkbox, confirm } from "@inquirer/prompts";
import { execSync } from "child_process";
import chalk from "chalk";

export async function cleanNode() {
  const output = execSync(
    'find ~/Developer -type d -name "node_modules" -prune -exec du -sh {} + | sort -hr | head -n 20',
    { encoding: "utf-8", shell: "/bin/bash" }
  );

  const choices = output.split("\n").filter(Boolean).map(item => ({
    name: item,
    value: item.split(/\s+/).slice(1).join(" ")
  }));

  const selected = await checkbox({
    message: "Select node_modules to delete",
    choices
  });

  if (selected.length === 0) {
    console.log("⚠️ Nothing selected");
    return;
  }

  const ok = await confirm({
    message: `Delete ${selected.length} folders?`,
    default: false
  });

  if (!ok) {
    console.log("❌ Cancelled");
    return;
  }

  let totalFreed = 0;

  for (const path of selected) {
    const size = execSync(`du -sm "${path}"`, { encoding: "utf-8" });
    const mb = parseInt(size.split("\t")[0]);

    execSync(`rm -rf "${path}"`);
    totalFreed += mb;

    console.log(chalk.red("🗑️ Deleted:"), path);
  }

  console.log(chalk.green(`🔥 Freed ${(totalFreed / 1024).toFixed(2)} GB`));
}