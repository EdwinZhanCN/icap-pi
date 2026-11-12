const UNKNOWN_PROVIDER = "unknown";

/** The harness has no /login of its own: the host that embeds it logs in and adds keys. */
export function getProviderLoginHelp(): string {
	return "Log in to a model provider, or add an API key, in the settings of the application you are using.";
}

export function formatNoModelsAvailableMessage(): string {
	return `No models available. ${getProviderLoginHelp()}`;
}

export function formatNoModelSelectedMessage(): string {
	return `No model selected.\n\n${getProviderLoginHelp()}`;
}

export function formatNoApiKeyFoundMessage(provider: string): string {
	const providerDisplay = provider === UNKNOWN_PROVIDER ? "the selected model" : provider;
	return `No API key found for ${providerDisplay}.\n\n${getProviderLoginHelp()}`;
}
