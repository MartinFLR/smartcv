export interface ProviderToReplace {
    name: string;
    providerSpecifier: string;
    isFunction?: boolean;
}
export interface ModuleToReplace {
    from: {
        name: string;
        moduleSpecifier: string;
    };
    to: ProviderToReplace | ProviderToReplace[];
}
export declare const MODULES_TO_REPLACE_WITH_PROVIDERS: ModuleToReplace[];
