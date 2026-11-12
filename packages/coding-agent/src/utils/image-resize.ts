import { type ImageResizeOptions, type ResizedImage, resizeImageInProcess } from "./image-resize-core.ts";

export type { ImageResizeOptions, ResizedImage } from "./image-resize-core.ts";

/**
 * Resize an image to fit within the specified max dimensions and encoded file size.
 *
 * Upstream runs Photon in a worker thread, so decoding does not block the terminal's event loop, and
 * falls back to this process when the worker file cannot be loaded. The harness is one bundle with no
 * worker file beside it, so it resizes in process directly.
 */
export async function resizeImage(
	inputBytes: Uint8Array,
	mimeType: string,
	options?: ImageResizeOptions,
): Promise<ResizedImage | null> {
	return resizeImageInProcess(inputBytes, mimeType, options);
}

/**
 * Format a dimension note for resized images.
 * This helps the model understand the coordinate mapping.
 */
export function formatDimensionNote(result: ResizedImage): string | undefined {
	if (!result.wasResized) {
		return undefined;
	}

	const scale = result.originalWidth / result.width;
	return `[Image: original ${result.originalWidth}x${result.originalHeight}, displayed at ${result.width}x${result.height}. Multiply coordinates by ${scale.toFixed(2)} to map to original image.]`;
}
