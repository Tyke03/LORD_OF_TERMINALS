import { writeFileToRepo } from './utils/github.js';

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
    case 'page create':
      appendToOutput(`Creating page: ${payload}`);
      // future: auto create .html boilerplate if needed
      break;

    case 'html add':
      const fileName = `pages/${payload}.html`;
      const htmlContent = prompt(`Paste HTML content for ${payload}.html:`);
      try {
        await writeFileToRepo(fileName, htmlContent, `Add ${payload}.html`);
        appendToOutput(`✅ ${fileName} written to GitHub.`);
      } catch (err) {
        appendToOutput(`❌ Error writing file: ${err.message}`);
      }
      break;

    case 'css add':
      appendToOutput(`Adding CSS to ${payload}`);
      break;

    case 'js add':
      appendToOutput(`Adding JS to ${payload}`);
      break;

    default:
      appendToOutput(`Unknown command: ${cmd}`);
  }
}