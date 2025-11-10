import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class TuiPreviewPagination {
    protected readonly icons: import("@taiga-ui/kit/tokens").TuiPreviewIcons;
    protected readonly texts$: import("rxjs").Observable<readonly [previous_page: string, next_page: string]>;
    length: number;
    index: number;
    readonly indexChange: EventEmitter<number>;
    onArrowClick(step: number): void;
    protected get leftButtonDisabled(): boolean;
    protected get rightButtonDisabled(): boolean;
    private updateIndex;
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiPreviewPagination, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TuiPreviewPagination, "tui-preview-pagination", never, { "length": { "alias": "length"; "required": false; }; "index": { "alias": "index"; "required": false; }; }, { "indexChange": "indexChange"; }, never, never, true, never>;
}
