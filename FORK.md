# This fork

This repository is a fork of [earendil-works/pi](https://github.com/earendil-works/pi) for the
[ICAP Learning Agent](https://github.com/EdwinZhanCN/obsidian-icap-agent), an Obsidian plugin. The plugin
embeds Pi's coding agent in Obsidian's own process. It needs the agent, not the terminal program around it.

Branch `icap` is cut from the upstream tag **v1.5.2**. Only `packages/coding-agent` is changed. Every
other package is as upstream; the plugin takes `pi-ai`, `pi-agent-core` and `pi-mcp` from npm, unchanged.

## What `packages/coding-agent` is here

A harness to embed: `src/index.ts` is its whole public surface.

| Kept | Removed |
|---|---|
| Sessions: the turn loop, retries, queueing, compaction | The interactive mode (`modes/interactive`) and `pi-tui` |
| Session storage, in Pi's JSONL format | The RPC and print modes, the CLI, `main.ts` |
| Models and credentials (`auth.json`, `models.json`), every provider | Extension files on disk: the loader, jiti, the SDK as virtual modules |
| Settings, skills, prompt templates, context files | The package manager (npm and git installs, updates) |
| The tools `read`, `bash`, `powershell`, `edit`, `write` | The tools `grep`, `find`, `ls` and `tools-manager.ts`, which downloads `fd` and `ripgrep` |
| MCP: stdio and streamable HTTP, OAuth | MCP's `cli.ts` and `ui.ts`; codemode, tool search, llama.cpp |
| The in-process hook runner (`core/extensions/runner.ts`, `types.ts`) | HTML export, bug reports, self-update, themes, keybindings, the footer |

Size: 265 source files and about 78,700 lines upstream; 98 files and about 33,800 lines here.

## Decisions that differ from upstream

- **Nothing is loaded from disk.** `core/extensions/loader.ts` keeps only what turns a factory the host
  passes in (`extensionFactories`) into an extension. The runner and its types stay: the session is built
  on them (tool wrapping, the `tool_call` hook, commands), and MCP registers through them unchanged.
- **Resources are local.** `core/local-resources.ts` is the local half of upstream's `package-manager.ts`,
  verbatim: the skill and prompt-template folders, the `skills` and `prompts` settings, their overrides
  and ignore files. Packages, extension paths and themes are not resolved.
- **A host decides how the tools act.** `createAgentSession({ toolOptions })` passes operations to the
  built-in tools (`EditOperations`, `WriteOperations`, `BashOperations`). The plugin routes `edit` and
  `write` through the learner's review this way; the tools keep their names and parameters.
- **MCP tools are declared directly.** Upstream reaches `codemode` and `deferred` tools through the
  codemode and tool-search tools, which are not here. `effectiveMcpExposure` maps every exposure but
  `hidden` to `direct`. `mcp.json` is read as written, so a learner's own Pi and the harness share it.
- **Names and paths are constants** (`config.ts`): the harness has no package folder to read, no docs
  beside it, and does not update itself. `~/.pi/agent` and the session format are Pi's, shared.
- **`core/ui-types.ts`** stands in for the terminal types the hook API names. They are opaque here.
- **Images are resized in process** (`utils/image-resize.ts`): a bundle has no worker file beside it.

## Not done yet

- `packages/coding-agent/test`, `examples` and `docs` are upstream's and describe the full program.
  Tests of removed parts do not run. The plugin tests the harness through its own suites.
- `packages/tui`, `packages/codemode` and the other packages are untouched and unused by the plugin.

## Following upstream

```sh
git fetch upstream --tags
git rebase --onto v<new> v<old> icap     # or merge the new tag into icap
```

Conflicts are expected where upstream changes a file this fork cut into: `core/agent-session.ts`
(HTML export, bug reports), `core/resource-loader.ts` (rewritten around `LocalResources`),
`core/extensions/loader.ts`, `extensions/mcp/index.ts` (the TUI manager), `core/tools/*` (renderers) and
`config.ts`. A new upstream file that only the removed parts use is deleted again. After a sync, in the
plugin: `pnpm check` type-checks this package (`tsconfig.pi.json`), and `pnpm test` runs it against a
scripted provider (`test/integration/agent/desktop/pi-session.spec.test.ts`).

`VERSION` in `packages/coding-agent/src/config.ts` names the upstream release the harness was cut from.
Update it with each sync.
