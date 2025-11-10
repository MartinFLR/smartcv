import * as i0 from '@angular/core';
import { inject, Pipe } from '@angular/core';
import { TUI_NUMBER_FORMAT } from '@taiga-ui/core/tokens';
import { tuiFormatNumber } from '@taiga-ui/core/utils/format';
import { map } from 'rxjs';

class TuiFormatNumberPipe {
    constructor() {
        this.numberFormat = inject(TUI_NUMBER_FORMAT);
    }
    /**
     * Formats number adding thousand separators and correct decimal separator
     * padding decimal part with zeroes to given length
     * @param value number
     * @param settings See {@link TuiNumberFormatSettings}
     */
    transform(value, settings = {}) {
        return this.numberFormat.pipe(map((format) => tuiFormatNumber(value, {
            ...format,
            precision: Number.isNaN(format.precision)
                ? Infinity
                : format.precision,
            ...settings,
        })));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiFormatNumberPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TuiFormatNumberPipe, isStandalone: true, name: "tuiFormatNumber" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiFormatNumberPipe, decorators: [{
            type: Pipe,
            args: [{
                    standalone: true,
                    name: 'tuiFormatNumber',
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiFormatNumberPipe };
//# sourceMappingURL=taiga-ui-core-pipes-format-number.mjs.map
