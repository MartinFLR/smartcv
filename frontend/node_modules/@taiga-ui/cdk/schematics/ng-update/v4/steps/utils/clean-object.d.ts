export type TuiDeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? TuiDeepPartial<T[K]> : T[K];
};
export declare function cleanObject<T>(object: T): TuiDeepPartial<T>;
