import { ChangeDetectorRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class TuiSwipeActions {
    protected actionsWidth: number;
    protected readonly cdr: ChangeDetectorRef;
    protected onResize({ target }: ResizeObserverEntry): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiSwipeActions, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TuiSwipeActions, "tui-swipe-actions", never, {}, {}, never, ["*", "[tuiSwipeAction]"], true, never>;
}
