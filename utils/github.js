// github.js
const username = 'Tyke03';  // Your GitHub username
const repo = 'Lord_of_Terminals';
const branch = 'main';

export async function writeFileToRepo(path, content, commitMessage) {
  const token = prompt("Enter GitHub personal access token (PAT):");
  const url = `https://api.github.com/repos/${username}/${repo}/contents/${path}`;

  const getResp = await fetch(url, {
    headers: { Authorization: `token ${token}` }
  });

  const existing = await getResp.json();
  const sha = existing?.sha;

  const body = {
    message: commitMessage,
    content: btoa(unescape(encodeURIComponent(content))),
    branch,
    ...(sha && { sha })
  };

  const resp = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `token ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!resp.ok) throw new Error(await resp.text());
  return await resp.json();
}
