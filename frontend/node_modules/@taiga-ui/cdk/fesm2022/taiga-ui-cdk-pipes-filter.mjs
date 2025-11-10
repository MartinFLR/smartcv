import * as i0 from '@angular/core';
import { Pipe } from '@angular/core';

class TuiFilterPipe {
    /**
     * Filters an array through a matcher function using additional arguments
     *
     * @param items array
     * @param matcher method for filtering
     * @param args arbitrary number of additional arguments
     */
    transform(items, matcher, ...args) {
        return items.filter((item) => matcher(item, ...args));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiFilterPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TuiFilterPipe, isStandalone: true, name: "tuiFilter" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiFilterPipe, decorators: [{
            type: Pipe,
            args: [{
                    standalone: true,
                    name: 'tuiFilter',
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiFilterPipe };
//# sourceMappingURL=taiga-ui-cdk-pipes-filter.mjs.map
