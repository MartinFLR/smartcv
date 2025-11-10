import { ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class TuiElement<T extends Element = HTMLElement> implements ElementRef<T> {
    nativeElement: T;
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiElement<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TuiElement<any>, "[tuiElement]", ["elementRef"], {}, {}, never, never, true, never>;
}
