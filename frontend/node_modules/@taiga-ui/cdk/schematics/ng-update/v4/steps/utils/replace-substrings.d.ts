export interface Replacement {
    start: number;
    from: string;
    to: string;
}
export declare function replaceSubstrings(text: string, replacements: Replacement[]): string;
