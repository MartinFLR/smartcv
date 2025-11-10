import * as i0 from "@angular/core";
/**
 * Directive that monitors element visibility
 */
export declare class TuiObscured {
    private readonly activeZone;
    private readonly enabled$;
    private readonly obscured$;
    readonly tuiObscured: import("rxjs").Observable<boolean>;
    set tuiObscuredEnabled(enabled: boolean);
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiObscured, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TuiObscured, "[tuiObscured]", never, { "tuiObscuredEnabled": { "alias": "tuiObscuredEnabled"; "required": false; }; }, { "tuiObscured": "tuiObscured"; }, never, never, true, never>;
}
