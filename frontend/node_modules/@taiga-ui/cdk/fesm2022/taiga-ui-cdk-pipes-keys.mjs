import * as i0 from '@angular/core';
import { Pipe } from '@angular/core';

class TuiKeysPipe {
    transform(object) {
        return Object.keys(object);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiKeysPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TuiKeysPipe, isStandalone: true, name: "tuiKeys" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiKeysPipe, decorators: [{
            type: Pipe,
            args: [{
                    standalone: true,
                    name: 'tuiKeys',
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiKeysPipe };
//# sourceMappingURL=taiga-ui-cdk-pipes-keys.mjs.map
