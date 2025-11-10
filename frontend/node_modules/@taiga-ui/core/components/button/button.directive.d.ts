import * as i0 from "@angular/core";
import * as i1 from "@taiga-ui/core/directives/appearance";
import * as i2 from "@taiga-ui/core/directives/icons";
export declare class TuiButton {
    private readonly options;
    protected readonly nothing: undefined;
    size: "m" | "l" | "xl" | "s" | "xs";
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiButton, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TuiButton, "a[tuiButton],button[tuiButton],a[tuiIconButton],button[tuiIconButton]", never, { "size": { "alias": "size"; "required": false; }; }, {}, never, never, true, [{ directive: typeof i1.TuiWithAppearance; inputs: {}; outputs: {}; }, { directive: typeof i2.TuiWithIcons; inputs: {}; outputs: {}; }]>;
}
