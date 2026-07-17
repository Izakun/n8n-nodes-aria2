# n8n-nodes-aria2

[![npm version](https://img.shields.io/npm/v/n8n-nodes-aria2.svg)](https://www.npmjs.com/package/n8n-nodes-aria2)

n8n community node for [aria2](https://aria2.github.io/) — the multi-protocol download utility — via its JSON-RPC API.

Install via **Settings -> Community Nodes -> Install** -> `n8n-nodes-aria2`.

## Operations
- Get Global Stats, Get Active/Waiting Downloads, Get Version

## Credentials
Configure the base URL and authentication in the **aria2 API** credential.

## Usage example

Read global download stats:

1. Add the node after a trigger (e.g. *When clicking 'Test workflow'*).
2. Select your credential.
3. **Get Global Stats**.
4. Execute the node — example output:

```json
{ "numActive": "1", "numWaiting": "0", "downloadSpeed": "1048576", "uploadSpeed": "0" }
```

## Disclaimer
Not affiliated with or endorsed by the respective project.
