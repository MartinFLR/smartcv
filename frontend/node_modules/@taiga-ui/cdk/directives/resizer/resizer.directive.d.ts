import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class TuiResizer {
    private readonly resizable;
    protected x: number;
    protected y: number;
    protected width: number;
    protected height: number;
    tuiResizer: readonly [x: number, y: number];
    readonly tuiSizeChange: EventEmitter<readonly [x: number, y: number]>;
    protected get cursor(): string;
    protected onPointerDown(x: number, y: number): void;
    protected onPointerMove({ x, y, buttons }: PointerEvent): void;
    protected onPointerUp(): void;
    protected onMove(x: number, y: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiResizer, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TuiResizer, "[tuiResizer]", never, { "tuiResizer": { "alias": "tuiResizer"; "required": false; }; }, { "tuiSizeChange": "tuiSizeChange"; }, never, never, true, never>;
}
