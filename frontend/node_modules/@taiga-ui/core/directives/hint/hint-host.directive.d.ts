import { TuiRectAccessor } from '@taiga-ui/core/classes';
import * as i0 from "@angular/core";
export declare class TuiHintHost extends TuiRectAccessor {
    tuiHintHost?: HTMLElement;
    readonly type = "hint";
    getClientRect(): DOMRect;
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiHintHost, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TuiHintHost, "[tuiHint][tuiHintHost]", never, { "tuiHintHost": { "alias": "tuiHintHost"; "required": false; }; }, {}, never, never, true, never>;
}
