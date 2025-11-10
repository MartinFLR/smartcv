import { DOCUMENT } from '@angular/common';
import * as i0 from '@angular/core';
import { inject, NgZone, Directive, Output } from '@angular/core';
import { tuiZoneOptimized } from '@taiga-ui/cdk/observables';
import { tuiInjectElement, tuiGetActualTarget, tuiContainsOrAfter } from '@taiga-ui/cdk/utils';
import { fromEvent, map, filter } from 'rxjs';

/**
 * @deprecated use {@link TuiActiveZone} instead
 */
class TuiClickOutside {
    constructor() {
        this.zone = inject(NgZone);
        this.doc = inject(DOCUMENT);
        this.el = tuiInjectElement();
        this.tuiClickOutside = fromEvent(this.doc, 'mouseup').pipe(map(tuiGetActualTarget), filter((target) => this.isOutside(target)), tuiZoneOptimized(this.zone));
    }
    isOutside(target) {
        return target === this.el || !tuiContainsOrAfter(this.el, target);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiClickOutside, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiClickOutside, isStandalone: true, selector: "[tuiClickOutside]", outputs: { tuiClickOutside: "tuiClickOutside" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiClickOutside, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiClickOutside]',
                }]
        }], propDecorators: { tuiClickOutside: [{
                type: Output
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiClickOutside };
//# sourceMappingURL=taiga-ui-cdk-directives-click-outside.mjs.map
