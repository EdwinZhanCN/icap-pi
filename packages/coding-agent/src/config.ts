import { homedir } from "os";
import { join } from "path";
import { normalizePath } from "./utils/paths.ts";

/**
 * Names and paths of the harness.
 *
 * Upstream reads these from its own package.json on disk and adds what an installed CLI needs: how it
 * was installed, how to update itself, where its docs, themes and bundled assets are. The harness is
 * bundled into a host and has no package folder, so the names are constants and only the paths of the
 * user's Pi configuration (~/.pi/agent) remain. Those are shared with an installed Pi: the same
 * auth.json, models.json, settings.json, mcp.json and sessions.
 */

export const PACKAGE_NAME = "@earendil-works/pi-coding-agent";
export const APP_NAME = "pi";
export const CONFIG_DIR_NAME = ".pi";
/** The upstream release this harness was cut from. Sessions it writes carry it, as Pi's do. */
export const VERSION = "1.5.2";

// e.g., PI_CODING_AGENT_DIR
export const ENV_AGENT_DIR = `${APP_NAME.toUpperCase()}_CODING_AGENT_DIR`;
export const ENV_SESSION_DIR = `${APP_NAME.toUpperCase()}_CODING_AGENT_SESSION_DIR`;

export function expandTildePath(path: string): string {
	return normalizePath(path);
}

// =============================================================================
// User Config Paths (~/.pi/agent/*)
// =============================================================================

/** Get the agent config directory (e.g., ~/.pi/agent/) */
export function getAgentDir(): string {
	const envDir = process.env[ENV_AGENT_DIR];
	if (envDir) {
		return expandTildePath(envDir);
	}
	return join(homedir(), CONFIG_DIR_NAME, "agent");
}

/** Get path to models.json */
export function getModelsPath(): string {
	return join(getAgentDir(), "models.json");
}

/** Get path to auth.json */
export function getAuthPath(): string {
	return join(getAgentDir(), "auth.json");
}

/** Get path to settings.json */
export function getSettingsPath(): string {
	return join(getAgentDir(), "settings.json");
}

/** Get path to managed binaries directory: an installed Pi keeps tools there, and the shell tools put it on PATH. */
export function getBinDir(): string {
	return join(getAgentDir(), "bin");
}

/** Get path to prompt templates directory */
export function getPromptsDir(): string {
	return join(getAgentDir(), "prompts");
}

/** Get path to sessions directory */
export function getSessionsDir(): string {
	return join(getAgentDir(), "sessions");
}

/** Get path to debug log file */
export function getDebugLogPath(): string {
	return join(getAgentDir(), `${APP_NAME}-debug.log`);
}
