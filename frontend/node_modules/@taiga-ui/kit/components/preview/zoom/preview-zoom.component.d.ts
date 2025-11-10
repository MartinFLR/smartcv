import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class TuiPreviewZoom {
    protected readonly icons: import("@taiga-ui/kit/tokens").TuiPreviewIcons;
    protected readonly zoomTexts$: import("rxjs").Observable<{
        zoomIn: string;
        zoomOut: string;
        reset: string;
    }>;
    min: number;
    max: number;
    value: number;
    readonly valueChange: EventEmitter<number>;
    readonly reset: EventEmitter<void>;
    readonly hintShow$: import("rxjs").Observable<boolean>;
    protected get leftButtonDisabled(): boolean;
    protected get rightButtonDisabled(): boolean;
    protected get collapseVisible(): boolean;
    protected onModelChange(value: number): void;
    protected onReset(): void;
    protected onMinus(): void;
    protected onPlus(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiPreviewZoom, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TuiPreviewZoom, "tui-preview-zoom", never, { "min": { "alias": "min"; "required": false; }; "max": { "alias": "max"; "required": false; }; "value": { "alias": "value"; "required": false; }; }, { "valueChange": "valueChange"; "reset": "reset"; }, never, never, true, never>;
}
