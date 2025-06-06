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
      // here we’ll later call a backend or GitHub API
      break;
    case 'html add':
      appendToOutput(`Adding HTML to ${payload}`);
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