import * as i0 from "@angular/core";
export declare class TuiTreeService<T> {
    private readonly loading;
    private readonly start;
    private readonly loader;
    private readonly map;
    private readonly load$;
    readonly data$: import("rxjs").Observable<T>;
    getChildren(item: T): readonly T[];
    loadChildren(item: T): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiTreeService<any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TuiTreeService<any>>;
}
