import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Service that monitors element visibility by polling and returning
 * either null or an array of elements that overlap given element edges
 */
export declare class TuiObscuredService extends Observable<readonly Element[] | null> {
    private readonly el;
    private readonly obscured$;
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiObscuredService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TuiObscuredService>;
}
