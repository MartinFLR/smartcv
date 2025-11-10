import * as i0 from '@angular/core';
import { Pipe } from '@angular/core';
import { tuiIsPresent } from '@taiga-ui/cdk/utils';

class TuiIsPresentPipe {
    transform(value) {
        return tuiIsPresent(value);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiIsPresentPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TuiIsPresentPipe, isStandalone: true, name: "tuiIsPresent" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiIsPresentPipe, decorators: [{
            type: Pipe,
            args: [{
                    standalone: true,
                    name: 'tuiIsPresent',
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiIsPresentPipe };
//# sourceMappingURL=taiga-ui-cdk-pipes-is-present.mjs.map
