import { PolymorpheusTemplate } from '@taiga-ui/polymorpheus';
import * as i0 from "@angular/core";
export declare class TuiPushDirective extends PolymorpheusTemplate {
    private readonly push;
    private readonly show$;
    constructor();
    set tuiPush(show: boolean);
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiPushDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TuiPushDirective, "ng-template[tuiPush]", never, { "tuiPush": { "alias": "tuiPush"; "required": false; }; }, {}, never, never, true, never>;
}
