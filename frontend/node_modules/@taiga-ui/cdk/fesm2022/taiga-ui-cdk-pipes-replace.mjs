import * as i0 from '@angular/core';
import { Pipe } from '@angular/core';

class TuiReplacePipe {
    transform(value, search, replaceValue) {
        return (value?.replace(search, 
        // TS bug: https://github.com/microsoft/TypeScript/issues/22378
        replaceValue) ?? '');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiReplacePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TuiReplacePipe, isStandalone: true, name: "tuiReplace" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiReplacePipe, decorators: [{
            type: Pipe,
            args: [{
                    standalone: true,
                    name: 'tuiReplace',
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiReplacePipe };
//# sourceMappingURL=taiga-ui-cdk-pipes-replace.mjs.map
