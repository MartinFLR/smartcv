import * as i0 from '@angular/core';
import { inject, Directive, Input } from '@angular/core';
import { tuiProvide } from '@taiga-ui/cdk/utils/miscellaneous';
import { TUI_DATE_FORMAT } from '@taiga-ui/core/tokens';
import { Observable, combineLatest, map, ReplaySubject } from 'rxjs';

class TuiDateFormat extends Observable {
    constructor() {
        super((subscriber) => combineLatest([this.parent, this.settings])
            .pipe(map(([parent, settings]) => ({ ...parent, ...settings })))
            .subscribe(subscriber));
        this.settings = new ReplaySubject(1);
        this.parent = inject(TUI_DATE_FORMAT, { skipSelf: true });
    }
    set tuiDateFormat(format) {
        this.settings.next(format);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiDateFormat, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiDateFormat, isStandalone: true, selector: "[tuiDateFormat]", inputs: { tuiDateFormat: "tuiDateFormat" }, providers: [tuiProvide(TUI_DATE_FORMAT, TuiDateFormat)], usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiDateFormat, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiDateFormat]',
                    providers: [tuiProvide(TUI_DATE_FORMAT, TuiDateFormat)],
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { tuiDateFormat: [{
                type: Input
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiDateFormat };
//# sourceMappingURL=taiga-ui-core-directives-date-format.mjs.map
