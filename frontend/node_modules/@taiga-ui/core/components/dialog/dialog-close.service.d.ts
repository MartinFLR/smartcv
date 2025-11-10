import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class TuiDialogCloseService extends Observable<unknown> {
    private readonly win;
    private readonly doc;
    private readonly el;
    private readonly esc$;
    private readonly mousedown$;
    constructor();
    private isOutside;
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiDialogCloseService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TuiDialogCloseService>;
}
