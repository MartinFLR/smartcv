import { TuiTextfieldComponent } from '@taiga-ui/core/components/textfield';
import * as i0 from "@angular/core";
import * as i1 from "@taiga-ui/core/directives/appearance";
import * as i2 from "@taiga-ui/core/directives/hint";
export declare class TuiPassword {
    private readonly options;
    private readonly texts;
    protected readonly textfield: TuiTextfieldComponent<any>;
    protected readonly hidden: import("@angular/core").WritableSignal<boolean>;
    protected readonly icon: import("@angular/core").Signal<string>;
    protected readonly hint: import("@angular/core").Signal<string>;
    protected toggle(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiPassword, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TuiPassword, "tui-icon[tuiPassword]", never, {}, {}, never, never, true, [{ directive: typeof i1.TuiWithAppearance; inputs: {}; outputs: {}; }, { directive: typeof i2.TuiHintDirective; inputs: { "tuiHintAppearance": "tuiHintAppearance"; "tuiHintContext": "tuiHintContext"; }; outputs: {}; }]>;
}
