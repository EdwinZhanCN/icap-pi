/**
 * Stand-ins for the terminal UI this harness does not have.
 *
 * Upstream's hook API (extensions/types.ts) names types of pi-tui, the interactive mode's theme, its
 * keybindings and its footer. The harness runs inside a host that draws its own interface, so none of
 * them exist here; the API keeps its shape and these names stay opaque. A host never receives a value
 * of one of these types from the harness.
 */

export type KeyId = string;
export type Keybinding = string;
export type AppKeybinding = string;
export type KeybindingsConfig = Record<string, KeyId | KeyId[] | undefined>;
export type KeybindingsManager = unknown;
export type Component = object;
export type EditorComponent = object;
export type EditorTheme = unknown;
export type TUI = unknown;
export type OverlayHandle = unknown;
export type OverlayOptions = unknown;
export interface ProgramStatus {
	kind?: string;
}
export type AutocompleteProvider = unknown;
export interface AutocompleteItem {
	value: string;
	label: string;
	description?: string;
}
export type Theme = unknown;
export type ReadonlyFooterDataProvider = unknown;
export type ScrollViewScrollbar = "auto" | "always" | "hidden";
export type WheelScrollLines = number | "auto";
export type TerminalColorMode = "truecolor" | "256color";
export interface TerminalCapabilities {
	images: "kitty" | "iterm2" | null;
	trueColor: boolean;
	hyperlinks: boolean;
}
