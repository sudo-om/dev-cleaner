import { checkbox, confirm } from "@inquirer/prompts";
import { execSync } from "child_process";
import chalk from "chalk";

export async function cleanBrew() {
  const output = execSync(
    'du -sh $(brew --cellar)/* | sort -hr | head -n 20',
    { encoding: "utf-8", shell: "/bin/bash" }
  );

  const choices = output.split("\n").filter(Boolean).map(item => ({
    name: item,
    value: item.split("/").pop()
  }));

  const selected = await checkbox({
    message: "Select brew packages to uninstall",
    choices
  });

  if (selected.length === 0) return;

  const ok = await confirm({
    message: `Uninstall ${selected.length} packages?`,
    default: false
  });

  if (!ok) return;

  for (const pkg of selected) {
    execSync(`brew uninstall ${pkg}`);
    console.log(chalk.red("🗑️ Removed:"), pkg);
  }

  console.log(chalk.green("✅ Brew cleanup done"));
}