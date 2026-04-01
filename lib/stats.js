import { execSync } from "child_process";
import boxen from "boxen";

export async function showStats() {
  const node = execSync(
    'du -sh ~/Developer/*/node_modules 2>/dev/null',
    { encoding: "utf-8", shell: "/bin/bash" }
  );

  console.log(
    boxen(`📦 Node_modules Usage:\n\n${node}`, {
      padding: 1,
      borderColor: "green",
      title: "💻 Dev Storage Stats"
    })
  );
}