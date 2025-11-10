import { TuiDriver } from '@taiga-ui/core/classes';
import * as i0 from "@angular/core";
export declare class TuiHintDescribe extends TuiDriver {
    private readonly doc;
    private readonly el;
    private readonly zone;
    private readonly id$;
    private readonly stream$;
    readonly type = "hint";
    constructor();
    set tuiHintDescribe(id: string | null | undefined);
    private get element();
    private get focused();
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiHintDescribe, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TuiHintDescribe, "[tuiHintDescribe]", never, { "tuiHintDescribe": { "alias": "tuiHintDescribe"; "required": false; }; }, {}, never, never, true, never>;
}
