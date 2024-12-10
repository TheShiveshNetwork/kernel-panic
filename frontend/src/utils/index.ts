import { IPointsSchema } from "@/common-types";

export function FormatImageToAscii(image: string): string {
    return image.replace(/\\n/g, "\n");
}

export function renderStats(stats: IPointsSchema) {
    const statsText = `\n\tHealth: ${stats.health}\n\tWealth: ${stats.wealth}\n\tHappiness: ${stats.happiness}`;
    return FormatImageToAscii(statsText);
}
