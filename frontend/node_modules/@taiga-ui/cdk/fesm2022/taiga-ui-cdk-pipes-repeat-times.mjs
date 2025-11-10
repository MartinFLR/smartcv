import * as i0 from '@angular/core';
import { Pipe } from '@angular/core';
import { tuiClamp } from '@taiga-ui/cdk/utils';

class TuiRepeatTimesPipe {
    transform(n) {
        return Array.from({ length: tuiClamp(n, 0, n) }, (_, i) => i);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiRepeatTimesPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TuiRepeatTimesPipe, isStandalone: true, name: "tuiRepeatTimes" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiRepeatTimesPipe, decorators: [{
            type: Pipe,
            args: [{
                    standalone: true,
                    name: 'tuiRepeatTimes',
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiRepeatTimesPipe };
//# sourceMappingURL=taiga-ui-cdk-pipes-repeat-times.mjs.map
