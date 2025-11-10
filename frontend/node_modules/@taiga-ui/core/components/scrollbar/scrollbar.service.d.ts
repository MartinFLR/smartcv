import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class TuiScrollbarService extends Observable<[number, number]> {
    private readonly el;
    private readonly element;
    private readonly scroll$;
    constructor();
    private getScrolled;
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiScrollbarService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TuiScrollbarService>;
}
