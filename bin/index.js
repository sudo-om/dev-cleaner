#!/usr/bin/env node

import { select } from "@inquirer/prompts";
import chalk from "chalk";
import { Command } from "commander";

import { cleanNode } from "../lib/node.js";
import { cleanPython } from "../lib/python.js";
import { cleanBrew } from "../lib/brew.js";
import { autoClean } from "../lib/auto.js";
import { showStats } from "../lib/stats.js";

const program = new Command();

program
  .name("dev-cleaner")
  .description("Clean dev junk (node_modules, venv, brew)")
  .version("1.0.0");

program.parse();

process.on("SIGINT", () => {
  console.log("\n👋 Exiting safely...");
  process.exit(0);
});

console.clear();
console.log(chalk.green("🚀 Dev Cleaner CLI\n"));

async function mainMenu() {
  while (true) {
    const choice = await select({
      message: "Select action",
      choices: [
        { name: "📦 Clean node_modules", value: "node" },
        { name: "🐍 Clean Python venv", value: "python" },
        { name: "🍺 Clean Brew packages", value: "brew" },
        { name: "⚡ Auto clean (free space)", value: "auto" },
        { name: "📊 Show stats", value: "stats" },
        { name: "❌ Exit", value: "exit" }
      ]
    });

    if (choice === "exit") {
      console.log(chalk.yellow("\n👋 Goodbye!\n"));
      process.exit(0);
    }

    try {
      if (choice === "node") await cleanNode();
      if (choice === "python") await cleanPython();
      if (choice === "brew") await cleanBrew();
      if (choice === "auto") await autoClean(5);
      if (choice === "stats") await showStats();
    } catch (err) {
      console.log(chalk.red("⚠️ Error:"), err.message);
    }

    console.log(chalk.gray("\n↩️ Returning to menu...\n"));
  }
}

mainMenu();