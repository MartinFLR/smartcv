import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare const MICRO_OFFSET: number;
export declare class TuiPullToRefreshService extends Observable<number> {
    private readonly el;
    private readonly scrollRef;
    private readonly loaded$;
    private readonly threshold;
    private touched;
    private readonly pulling$;
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiPullToRefreshService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TuiPullToRefreshService>;
}
