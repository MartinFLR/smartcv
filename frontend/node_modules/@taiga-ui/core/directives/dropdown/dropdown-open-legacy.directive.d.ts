import * as i0 from "@angular/core";
/**
 * @deprecated TODO: remove in v.5 when legacy controls are dropped
 */
export declare class TuiDropdownOpenLegacy {
    private readonly openStateSub;
    readonly tuiDropdownOpenChange: import("rxjs").Observable<boolean>;
    set tuiDropdownOpen(open: boolean);
    emitOpenChange(open: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiDropdownOpenLegacy, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TuiDropdownOpenLegacy, "[tuiDropdownOpen]:not([tuiDropdown]),[tuiDropdownOpenChange]:not([tuiDropdown])", never, { "tuiDropdownOpen": { "alias": "tuiDropdownOpen"; "required": false; }; }, { "tuiDropdownOpenChange": "tuiDropdownOpenChange"; }, never, never, true, never>;
}
