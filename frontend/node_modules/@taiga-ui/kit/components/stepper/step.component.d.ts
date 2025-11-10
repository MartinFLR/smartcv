import * as i0 from "@angular/core";
export declare class TuiStep {
    private readonly stepper;
    private readonly el;
    protected readonly $: import("rxjs").Subscription;
    protected focusVisible: boolean;
    protected readonly icons: import("@taiga-ui/core/tokens").TuiCommonIcons;
    stepState: 'error' | 'normal' | 'pass';
    icon: string;
    protected get isActive(): boolean;
    protected get isVertical(): boolean;
    protected get tabIndex(): number;
    protected get index(): number;
    protected activate(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiStep, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TuiStep, "button[tuiStep], a[tuiStep]:not([routerLink]), a[tuiStep][routerLink][routerLinkActive]", never, { "stepState": { "alias": "stepState"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; }, {}, never, ["*"], true, never>;
}
