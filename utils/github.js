// utils/github.js

const GITHUB_TOKEN = 'YOUR_GITHUB_TOKEN'; // Replace with your personal access token
const OWNER = 'Tyke03';
const REPO = 'Lord_of_Terminals';

async function githubRequest(endpoint, method = 'GET', body = null) {
  const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/${endpoint}`, {
    method,
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null,
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(`${res.status}: ${error.message}`);
  }
  return await res.json();
}

export { createBranch, writeFileToBranch, branchExists };
 {
  const mainRef = await githubRequest('git/ref/heads/main');
  const sha = mainRef.object.sha;
  await githubRequest('git/refs', 'POST', {
    ref: `refs/heads/${branchName}`,
    sha,
  });
}

export async function writeFileToBranch(branch, path, content) {
  const encoded = btoa(unescape(encodeURIComponent(content)));
  await githubRequest(`contents/${path}`, 'PUT', {
    message: `Add ${path}`,
    content: encoded,
    branch,
  });
}