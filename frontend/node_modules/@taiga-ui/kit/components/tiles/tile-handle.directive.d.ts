import * as i0 from "@angular/core";
export declare class TuiTileHandle {
    private readonly tile;
    private x;
    private y;
    protected onPointer(x?: number, y?: number): void;
    protected onMove(x: number, y: number): void;
    protected onStart(event: PointerEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiTileHandle, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TuiTileHandle, "[tuiTileHandle]", never, {}, {}, never, never, true, never>;
}
