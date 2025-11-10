import { ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * An event for scrolling an element into view within {@link TuiScrollbar}.
 */
export declare const TUI_SCROLL_INTO_VIEW = "tui-scroll-into-view";
/**
 * An event to notify {@link TuiScrollbar} that
 * it should control a nested element.
 */
export declare const TUI_SCROLLABLE = "tui-scrollable";
export declare class TuiScrollbar {
    private readonly el;
    protected readonly options: import("./scrollbar.options").TuiScrollbarOptions;
    protected readonly isIOS: boolean;
    protected readonly browserScrollRef: ElementRef<HTMLElement>;
    /**
     * @deprecated: use tuiScrollbarOptionsProvider({ mode: 'hidden' })
     */
    hidden: boolean;
    protected get delegated(): boolean;
    protected get scrollRef(): HTMLElement;
    protected set scrollRef(element: HTMLElement);
    protected scrollIntoView(detail: HTMLElement): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiScrollbar, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TuiScrollbar, "tui-scrollbar", never, { "hidden": { "alias": "hidden"; "required": false; }; }, {}, never, ["*"], true, never>;
}
