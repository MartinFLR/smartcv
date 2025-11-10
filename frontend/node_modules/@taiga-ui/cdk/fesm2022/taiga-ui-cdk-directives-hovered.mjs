import * as i0 from '@angular/core';
import { inject, NgZone, Injectable, Directive, Output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TUI_TRUE_HANDLER, TUI_FALSE_HANDLER } from '@taiga-ui/cdk/constants';
import { tuiTypedFromEvent, tuiZoneOptimized, tuiWatch } from '@taiga-ui/cdk/observables';
import { TUI_IS_MOBILE } from '@taiga-ui/cdk/tokens';
import { tuiIsElement, tuiInjectElement } from '@taiga-ui/cdk/utils';
import { Observable, merge, map, filter, distinctUntilChanged, of } from 'rxjs';

function movedOut({ currentTarget, relatedTarget }) {
    return (!tuiIsElement(relatedTarget) ||
        !tuiIsElement(currentTarget) ||
        !currentTarget.contains(relatedTarget));
}
class TuiHoveredService extends Observable {
    constructor() {
        super((subscriber) => this.stream$.subscribe(subscriber));
        this.el = tuiInjectElement();
        this.zone = inject(NgZone);
        this.stream$ = merge(tuiTypedFromEvent(this.el, 'mouseenter').pipe(map(TUI_TRUE_HANDLER)), tuiTypedFromEvent(this.el, 'mouseleave').pipe(map(TUI_FALSE_HANDLER)), 
        // Hello, Safari
        tuiTypedFromEvent(this.el, 'mouseout').pipe(filter(movedOut), map(TUI_FALSE_HANDLER))).pipe(distinctUntilChanged(), tuiZoneOptimized(this.zone));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiHoveredService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiHoveredService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiHoveredService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
function tuiHovered() {
    return toSignal(inject(TUI_IS_MOBILE) ? of(false) : inject(TuiHoveredService).pipe(tuiWatch()), {
        initialValue: false,
    });
}

class TuiHovered {
    constructor() {
        this.tuiHoveredChange = inject(TuiHoveredService);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiHovered, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiHovered, isStandalone: true, selector: "[tuiHoveredChange]", outputs: { tuiHoveredChange: "tuiHoveredChange" }, providers: [TuiHoveredService], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiHovered, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiHoveredChange]',
                    providers: [TuiHoveredService],
                }]
        }], propDecorators: { tuiHoveredChange: [{
                type: Output
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiHovered, TuiHoveredService, tuiHovered };
//# sourceMappingURL=taiga-ui-cdk-directives-hovered.mjs.map
