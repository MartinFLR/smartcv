import * as i0 from '@angular/core';
import { inject, Pipe } from '@angular/core';
import { TuiFormatDateService } from '@taiga-ui/core/services';

class TuiFormatDatePipe {
    constructor() {
        this.service = inject(TuiFormatDateService);
    }
    transform(timestampOrDate) {
        return this.service.format(timestampOrDate.valueOf());
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiFormatDatePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TuiFormatDatePipe, isStandalone: true, name: "tuiFormatDate" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiFormatDatePipe, decorators: [{
            type: Pipe,
            args: [{
                    standalone: true,
                    name: 'tuiFormatDate',
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiFormatDatePipe };
//# sourceMappingURL=taiga-ui-core-pipes-format-date.mjs.map
