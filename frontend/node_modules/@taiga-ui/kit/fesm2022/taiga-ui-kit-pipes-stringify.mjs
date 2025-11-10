import * as i0 from '@angular/core';
import { Pipe } from '@angular/core';

class TuiStringifyPipe {
    transform(key) {
        return (value) => String(value[key] ?? '');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiStringifyPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TuiStringifyPipe, isStandalone: true, name: "tuiStringify" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiStringifyPipe, decorators: [{
            type: Pipe,
            args: [{
                    standalone: true,
                    name: 'tuiStringify',
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiStringifyPipe };
//# sourceMappingURL=taiga-ui-kit-pipes-stringify.mjs.map
