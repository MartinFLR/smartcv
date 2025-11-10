import { TuiDriver } from '@taiga-ui/core/classes';
import * as i0 from "@angular/core";
export declare class TuiDropdownHover extends TuiDriver {
    private readonly dropdownHost?;
    private readonly el;
    private readonly doc;
    private readonly options;
    private readonly activeZone;
    private readonly open;
    /**
     * Dropdown can be removed not only via click/touch –
     * swipe on mobile devices removes dropdown sheet without triggering new mouseover / mouseout events.
     */
    private readonly dropdownExternalRemoval$;
    private readonly stream$;
    showDelay: number;
    hideDelay: number;
    hovered: boolean;
    readonly type = "dropdown";
    constructor();
    protected onClick(event: MouseEvent): void;
    private isHovered;
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiDropdownHover, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TuiDropdownHover, "[tuiDropdownHover]", never, { "showDelay": { "alias": "tuiDropdownShowDelay"; "required": false; }; "hideDelay": { "alias": "tuiDropdownHideDelay"; "required": false; }; }, {}, ["dropdownHost"], never, true, never>;
}
