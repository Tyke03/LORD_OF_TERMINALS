// terminal.js
console.log("✅ terminal.js loaded");

import { createBranch, writeFileToBranch, branchExists } from './utils/github.js';

const output = document.getElementById('output');
const input = document.getElementById('input');

console.log("📦 Output element:", output);
console.log("📦 Input element:", input);

if (!input) {
  console.error("❌ Input element not found in DOM");
} else {
  input.addEventListener('keydown', async (e) => {
    console.log("⌨️ Key pressed:", e.key);

    if (e.key === 'Enter') {
      const command = input.value.trim();
      console.log("📥 Command received:", command);
      appendToOutput(`> ${command}`);
      input.value = '';
      await handleCommand(command);
    }
  });
}

function appendToOutput(text) {
  if (!output) {
    console.error("❌ Output element missing. Cannot print:", text);
    return;
  }

  output.textContent += `\n${text}`;
  output.scrollTop = output.scrollHeight;
}

async function handleCommand(cmd) {
  const [action, type, ...rest] = cmd.split(' ');
  const payload = rest.join(' ');

  console.log("🧠 Parsed command:", { action, type, payload });

  try {
    switch (`${action} ${type}`) {
      case 'branch create': {
        appendToOutput(`Creating branch: ${payload}`);
        await createBranch(payload);
        break;
      }
      case 'page create': {
        const match = payload.match(/(.*?)\s*--branch\s*(.*)/);
        if (!match) {
          appendToOutput("❌ Invalid syntax. Use: page create <name> --branch <branch>");
          return;
        }

        const pageName = match[1].trim();
        const branchName = match[2].trim();

        appendToOutput(`🧪 Checking if branch '${branchName}' exists...`);
        const exists = await branchExists(branchName);
        if (!exists) {
          appendToOutput(`⚠️ Branch '${branchName}' does not exist. Creating...`);
          await createBranch(branchName);
        }

        const htmlContent = `<!DOCTYPE html><html><head><title>${pageName}</title></head><body><h1>${pageName} page</h1></body></html>`;
        const path = `pages/${pageName}.html`;

        appendToOutput(`Creating page '${pageName}' in branch '${branchName}'`);
        await writeFileToBranch(branchName, path, htmlContent);
        break;
      }
      default:
        appendToOutput(`Unknown command: ${cmd}`);
        console.warn("⚠️ Unrecognized command structure:", cmd);
    }
  } catch (error) {
    appendToOutput(`❌ Error: ${error.message}`);
    console.error("🔥 Command execution failed:", error);
  }
}
