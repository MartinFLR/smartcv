import * as i0 from "@angular/core";
export declare class TuiDroppable {
    private readonly el;
    readonly tuiDroppableDropped: import("rxjs").Observable<DataTransfer>;
    readonly tuiDroppableDragOverChange: import("rxjs").Observable<DataTransfer | null>;
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiDroppable, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TuiDroppable, "[tuiDroppableDropped], [tuiDroppableDragOverChange]", never, {}, { "tuiDroppableDropped": "tuiDroppableDropped"; "tuiDroppableDragOverChange": "tuiDroppableDragOverChange"; }, never, never, true, never>;
}
