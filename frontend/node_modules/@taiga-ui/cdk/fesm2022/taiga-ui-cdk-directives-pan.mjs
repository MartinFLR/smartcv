import * as i0 from '@angular/core';
import { inject, Injectable, Directive, Output } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { tuiTypedFromEvent } from '@taiga-ui/cdk/observables';
import { tuiInjectElement } from '@taiga-ui/cdk/utils/dom';
import { Observable, merge, switchMap, filter, map, pairwise, takeUntil, repeat } from 'rxjs';

class TuiPanService extends Observable {
    constructor() {
        const el = tuiInjectElement();
        const doc = inject(DOCUMENT);
        super((subscriber) => merge(tuiTypedFromEvent(el, 'touchstart', { passive: true }), tuiTypedFromEvent(el, 'mousedown'))
            .pipe(switchMap(() => merge(tuiTypedFromEvent(doc, 'touchmove', {
            passive: true,
        }).pipe(filter(({ touches }) => touches.length < 2), map(({ touches }) => touches[0])), tuiTypedFromEvent(doc, 'mousemove'))), pairwise(), map(([first, second]) => {
            const deltaX = (second?.clientX ?? 0) - (first?.clientX ?? 0);
            const deltaY = (second?.clientY ?? 0) - (first?.clientY ?? 0);
            return [deltaX, deltaY];
        }), takeUntil(merge(tuiTypedFromEvent(doc, 'touchend'), tuiTypedFromEvent(doc, 'mouseup'))), repeat())
            .subscribe(subscriber));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPanService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPanService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPanService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });

class TuiPan {
    constructor() {
        this.tuiPan = inject(TuiPanService);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPan, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiPan, isStandalone: true, selector: "[tuiPan]", outputs: { tuiPan: "tuiPan" }, providers: [TuiPanService], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPan, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiPan]',
                    providers: [TuiPanService],
                }]
        }], propDecorators: { tuiPan: [{
                type: Output
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiPan, TuiPanService };
//# sourceMappingURL=taiga-ui-cdk-directives-pan.mjs.map
