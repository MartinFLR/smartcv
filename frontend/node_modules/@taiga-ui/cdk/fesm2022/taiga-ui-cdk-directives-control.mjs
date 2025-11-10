import * as i0 from '@angular/core';
import { inject, Directive } from '@angular/core';
import { NgControl } from '@angular/forms';

class TuiNgControl {
    constructor() {
        this.ngControl = inject(NgControl);
    }
    get control() {
        return this.ngControl.control;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiNgControl, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiNgControl, isStandalone: true, selector: "[tuiControl]", exportAs: ["ngControl"], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiNgControl, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiControl]',
                    exportAs: 'ngControl',
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiNgControl };
//# sourceMappingURL=taiga-ui-cdk-directives-control.mjs.map
