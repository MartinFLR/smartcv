import * as i0 from '@angular/core';
import { Pipe } from '@angular/core';

class TuiMapperPipe {
    /**
     * Maps object to an arbitrary result through a mapper function
     *
     * @param value an item to transform
     * @param mapper a mapping function
     * @param args arbitrary number of additional arguments
     */
    transform(value, mapper, ...args) {
        return mapper(value, ...args);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiMapperPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TuiMapperPipe, isStandalone: true, name: "tuiMapper" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiMapperPipe, decorators: [{
            type: Pipe,
            args: [{
                    standalone: true,
                    name: 'tuiMapper',
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiMapperPipe };
//# sourceMappingURL=taiga-ui-cdk-pipes-mapper.mjs.map
