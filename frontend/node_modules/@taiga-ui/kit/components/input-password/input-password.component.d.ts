import * as i0 from "@angular/core";
import * as i1 from "@taiga-ui/core/components/textfield";
/**
 * @deprecated use {@link TuiPassword} with {@link TuiTextfield}
 */
export declare class TuiInputPassword {
    private readonly options;
    private readonly texts;
    protected readonly el: HTMLInputElement;
    protected readonly size: import("@angular/core").WritableSignal<"m" | "l" | "s">;
    protected readonly hidden: import("@angular/core").WritableSignal<boolean>;
    protected readonly text: import("@angular/core").Signal<string>;
    protected readonly icon: import("@angular/core").Signal<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiInputPassword, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TuiInputPassword, "input[tuiInputPassword]", never, {}, {}, never, never, true, [{ directive: typeof i1.TuiWithTextfield; inputs: {}; outputs: {}; }]>;
}
