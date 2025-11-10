import * as i0 from '@angular/core';
import { Pipe } from '@angular/core';

class TuiStringifyContentPipe {
    transform(stringify) {
        return ({ $implicit }) => stringify($implicit);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiStringifyContentPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TuiStringifyContentPipe, isStandalone: true, name: "tuiStringifyContent" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiStringifyContentPipe, decorators: [{
            type: Pipe,
            args: [{
                    standalone: true,
                    name: 'tuiStringifyContent',
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiStringifyContentPipe };
//# sourceMappingURL=taiga-ui-kit-pipes-stringify-content.mjs.map
