import * as i0 from "@angular/core";
export declare function tuiFindTouchIndex(touches: TouchList, id: number): number;
export declare class TuiTouchable {
    private readonly isIOS;
    private readonly el;
    tuiTouchable: '' | 'background' | 'opacity' | 'transform';
    constructor();
    protected get style(): 'background' | 'opacity' | 'transform';
    private hasTouchLeft;
    private onTouchStart;
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiTouchable, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TuiTouchable, "[tuiTouchable]", never, { "tuiTouchable": { "alias": "tuiTouchable"; "required": false; }; }, {}, never, never, true, never>;
}
