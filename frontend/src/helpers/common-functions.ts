export function FormatImageToAscii(image: string): string {
    return image.replace(/\\n/g, "\n");
}
