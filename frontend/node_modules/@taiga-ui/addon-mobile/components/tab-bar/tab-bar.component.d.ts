import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class TuiTabBarComponent {
    private readonly tabs;
    quantity: number;
    activeItemIndex: number;
    readonly activeItemIndexChange: EventEmitter<number>;
    setActive(tab: EventTarget): void;
    protected get style(): string;
    private updateIndex;
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiTabBarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TuiTabBarComponent, "nav[tuiTabBar]", never, { "quantity": { "alias": "quantity"; "required": false; }; "activeItemIndex": { "alias": "activeItemIndex"; "required": false; }; }, { "activeItemIndexChange": "activeItemIndexChange"; }, ["tabs"], ["*"], true, never>;
}
