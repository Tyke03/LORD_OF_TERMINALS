// terminal.js
console.log("✅ terminal.js loaded");
import { createBranch, writeFileToBranch } from './utils/github.js';

const output = document.getElementById('output');
const input = document.getElementById('input');

input.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    const command = input.value.trim();
    appendToOutput(`> ${command}`);
    input.value = '';
    await handleCommand(command);
  }
});

function appendToOutput(text) {
  output.textContent += `\n${text}`;
  output.scrollTop = output.scrollHeight;
}

async function handleCommand(cmd) {
  const [action, type, ...rest] = cmd.split(' ');
  const payload = rest.join(' ');

  switch (`${action} ${type}`) {
    case 'branch create': {
      appendToOutput(`Creating branch: ${payload}`);
      await createBranch(payload);
      break;
    }
    case 'page create': {
      const [pageName, , branchName] = payload.split('--branch').map(s => s.trim());
      const htmlContent = `<!DOCTYPE html><html><head><title>${pageName}</title></head><body><h1>${pageName} page</h1></body></html>`;
      const path = `pages/${pageName}.html`;
      appendToOutput(`Creating page '${pageName}' in branch '${branchName}'`);
      await writeFileToBranch(branchName, path, htmlContent);
      break;
    }
    default:
      appendToOutput(`Unknown command: ${cmd}`);
  }
}