import * as i0 from "@angular/core";
export declare class TuiScrollbarDirective {
    private readonly el;
    private readonly style;
    protected readonly scrollSub: import("rxjs").Subscription;
    protected readonly styleSub: import("rxjs").Subscription;
    tuiScrollbar: 'horizontal' | 'vertical';
    private getScrolled;
    private getCompensation;
    private getThumb;
    private getView;
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiScrollbarDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TuiScrollbarDirective, "[tuiScrollbar]", never, { "tuiScrollbar": { "alias": "tuiScrollbar"; "required": false; }; }, {}, never, never, true, never>;
}
