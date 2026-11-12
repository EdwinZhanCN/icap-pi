/**
 * The harness: Pi's coding agent without its terminal, its CLI and everything that loads code from disk.
 *
 * What is here: sessions (the turn loop, retries, queueing, compaction), their storage in Pi's own JSONL
 * format, models and credentials (~/.pi/agent: auth.json, models.json), settings, skills, prompt
 * templates, context files, the tools read, bash, powershell, edit and write, and MCP servers.
 *
 * What is not: the interactive mode and pi-tui, the RPC and print modes, the CLI, extension files and
 * jiti, the package manager, HTML export, the tools grep, find and ls (they download fd and ripgrep),
 * codemode, tool search and llama.cpp. A host embeds the harness and draws its own interface; it passes
 * its own tools and hooks as `extensionFactories`, and how the built-in tools act as `toolOptions`.
 *
 * Cut from @earendil-works/pi-coding-agent 1.5.2. pi-ai, pi-agent-core and pi-mcp are dependencies,
 * unchanged.
 */

export { CONFIG_DIR_NAME, getAgentDir, VERSION } from "./config.ts";
export {
	AgentSession,
	type AgentSessionConfig,
	type AgentSessionEvent,
	type AgentSessionEventListener,
	type ExtensionBindings,
	type PromptOptions,
} from "./core/agent-session.ts";
export { AuthStorage } from "./core/auth-storage.ts";
export type { CompactionResult } from "./core/compaction/index.ts";
export type {
	ExtensionAPI,
	ExtensionCommandContext,
	ExtensionContext,
	ExtensionError,
	ExtensionFactory,
	ExtensionUIContext,
	InlineExtension,
	ToolCallEvent,
	ToolCallEventResult,
	ToolDefinition,
} from "./core/extensions/index.ts";
export { ModelRegistry } from "./core/model-registry.ts";
export { ModelRuntime } from "./core/model-runtime.ts";
export {
	DefaultResourceLoader,
	type DefaultResourceLoaderOptions,
	loadProjectContextFiles,
	type ResourceLoader,
} from "./core/resource-loader.ts";
export { type CreateAgentSessionOptions, type CreateAgentSessionResult, createAgentSession } from "./core/sdk.ts";
export { SessionManager } from "./core/session-manager.ts";
export { SettingsManager } from "./core/settings-manager.ts";
export type { Skill } from "./core/skills.ts";
export type { SlashCommandInfo } from "./core/slash-commands.ts";
export {
	type BashOperations,
	type BashToolOptions,
	createLocalBashOperations,
	createLocalPowerShellOperations,
	type EditOperations,
	type PowerShellOperations,
	type ReadOperations,
	type ToolsOptions,
	type WriteOperations,
} from "./core/tools/index.ts";
export { hasTrustRequiringProjectResources, ProjectTrustStore } from "./core/trust-manager.ts";
export { createMcpExtension, type McpExtensionOptions } from "./extensions/mcp/index.ts";
