import * as i0 from '@angular/core';
import { Pipe } from '@angular/core';

class TuiToArrayPipe {
    transform(items) {
        return Array.from(items);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiToArrayPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TuiToArrayPipe, isStandalone: true, name: "tuiToArray" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiToArrayPipe, decorators: [{
            type: Pipe,
            args: [{
                    standalone: true,
                    name: 'tuiToArray',
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiToArrayPipe };
//# sourceMappingURL=taiga-ui-cdk-pipes-to-array.mjs.map
