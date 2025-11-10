export interface TuiParsedGradient {
    readonly side: TuiGradientDirection;
    readonly stops: ReadonlyArray<{
        readonly color: string;
        readonly position: string;
    }>;
}
export type TuiGradientDirection = 'to bottom left' | 'to bottom right' | 'to bottom' | 'to left' | 'to right' | 'to top left' | 'to top right' | 'to top';
export declare function tuiParseGradient(input: string): TuiParsedGradient;
export declare function tuiToGradient({ stops, side }: TuiParsedGradient): string;
