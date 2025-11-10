import * as i0 from '@angular/core';
import { inject, Directive, Output } from '@angular/core';
import { ControlContainer, NgControl } from '@angular/forms';
import { Subject, distinctUntilChanged, switchAll, EMPTY } from 'rxjs';

class TuiValueChanges {
    constructor() {
        this.container = inject(ControlContainer, { optional: true });
        this.control = inject(NgControl, { optional: true });
        this.refresh$ = new Subject();
        this.tuiValueChanges = this.refresh$.pipe(distinctUntilChanged(), switchAll(), distinctUntilChanged());
    }
    ngDoCheck() {
        this.refresh$.next(this.control?.valueChanges || this.container?.valueChanges || EMPTY);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiValueChanges, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiValueChanges, isStandalone: true, selector: "[tuiValueChanges]", outputs: { tuiValueChanges: "tuiValueChanges" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiValueChanges, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiValueChanges]',
                }]
        }], propDecorators: { tuiValueChanges: [{
                type: Output
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiValueChanges };
//# sourceMappingURL=taiga-ui-cdk-directives-value-changes.mjs.map
