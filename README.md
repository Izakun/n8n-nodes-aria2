<img src="nodes/Aria2/aria2.svg" width="90" align="right" alt="Aria2" />

# n8n-nodes-aria2

[![npm version](https://img.shields.io/npm/v/n8n-nodes-aria2.svg)](https://www.npmjs.com/package/n8n-nodes-aria2)
[![npm downloads](https://img.shields.io/npm/dm/n8n-nodes-aria2.svg)](https://www.npmjs.com/package/n8n-nodes-aria2)
[![License: MIT](https://img.shields.io/npm/l/n8n-nodes-aria2.svg)](./LICENSE)
[![n8n verified](https://img.shields.io/badge/n8n-verified%20community%20node-EA4B71)](https://docs.n8n.io/integrations/community-nodes/installation/verified-install/)

Community node for **n8n** to interact with **Aria2**. It lets you automate
Aria2 directly from your n8n workflows using a secure stored credential.

> ✅ **Verified community node** — installable directly from the n8n node panel
> (self-hosted **and** n8n Cloud).

## Installation

This is a **verified** community node: in n8n click **+ (Add node)**, search for
**Aria2**, and add it — no manual install needed.

<details>
<summary>Manual install (older n8n, or as an unverified package)</summary>

Go to **Settings → Community Nodes → Install** and enter `n8n-nodes-aria2`.
</details>

## Operations

| Operation | Description |
|---|---|
| **Get Active Downloads** | Get active downloads |
| **Get Global Stats** | Get global statistics |
| **Get Version** | Get the server version |
| **Get Waiting Downloads** | Get waiting downloads |

## Authentication

This node uses the **Aria2 API** credential. In n8n, go to **Credentials → New**, pick
**Aria2 API**, and fill in:

- **Base URL** — the address of your instance, e.g. `http://aria2:6800` (no trailing slash).
- **RPC Secret** — the RPC secret token (leave empty if none is set).

The RPC secret token is passed with each JSON-RPC call.

**Where to find it:** See the service documentation: https://aria2.github.io/manual/en/html/aria2c.html#rpc-interface

The credential's **Test** button verifies the connection before you save.

## Usage

1. Add the **Aria2** node to a workflow (after a trigger such as *When clicking 'Test workflow'* or a Schedule Trigger).
2. Select your **Aria2 API** credential.
3. Pick an **Operation** and run the workflow — the response is returned as JSON for the next node.

## Compatibility

Requires n8n **1.0** or newer. Built and linted with the official `@n8n/node-cli`, and
published to npm with a build-provenance attestation.

## Resources

- [Aria2](https://aria2.github.io/manual/en/html/aria2c.html#rpc-interface)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](./LICENSE)
