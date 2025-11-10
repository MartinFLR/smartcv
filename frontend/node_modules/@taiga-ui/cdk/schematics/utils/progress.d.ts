export declare function setupProgressLogger({ total, prefix, tabs, }: {
    prefix?: string;
    tabs?: number;
    total: number;
}): (message: string, incrementIndex?: boolean) => void;
