import * as i0 from '@angular/core';
import { inject, Directive, Input } from '@angular/core';
import { tuiProvide } from '@taiga-ui/cdk/utils/miscellaneous';
import { TUI_NUMBER_FORMAT } from '@taiga-ui/core/tokens';
import { Observable, combineLatest, map, ReplaySubject } from 'rxjs';

class TuiNumberFormat extends Observable {
    constructor() {
        super((subscriber) => combineLatest([this.parent, this.settings])
            .pipe(map(([parent, settings]) => ({ ...parent, ...settings })))
            .subscribe(subscriber));
        this.settings = new ReplaySubject(1);
        this.parent = inject(TUI_NUMBER_FORMAT, { skipSelf: true });
    }
    set tuiNumberFormat(format) {
        this.settings.next(format);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiNumberFormat, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiNumberFormat, isStandalone: true, selector: "[tuiNumberFormat]", inputs: { tuiNumberFormat: "tuiNumberFormat" }, providers: [tuiProvide(TUI_NUMBER_FORMAT, TuiNumberFormat)], usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiNumberFormat, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiNumberFormat]',
                    providers: [tuiProvide(TUI_NUMBER_FORMAT, TuiNumberFormat)],
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { tuiNumberFormat: [{
                type: Input
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiNumberFormat };
//# sourceMappingURL=taiga-ui-core-directives-number-format.mjs.map
