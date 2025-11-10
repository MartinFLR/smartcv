import * as i0 from '@angular/core';
import { inject, Pipe } from '@angular/core';
import { TUI_MONTHS } from '@taiga-ui/core/tokens';
import { map } from 'rxjs';

class TuiMonthPipe {
    constructor() {
        this.months$ = inject(TUI_MONTHS);
    }
    transform({ month }) {
        return this.months$.pipe(map((months) => months[month] || months[0]));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiMonthPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TuiMonthPipe, isStandalone: true, name: "tuiMonth" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiMonthPipe, decorators: [{
            type: Pipe,
            args: [{
                    standalone: true,
                    name: 'tuiMonth',
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiMonthPipe };
//# sourceMappingURL=taiga-ui-core-pipes-month.mjs.map
