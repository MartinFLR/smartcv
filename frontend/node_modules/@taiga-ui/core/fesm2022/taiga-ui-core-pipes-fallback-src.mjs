import * as i0 from '@angular/core';
import { Pipe } from '@angular/core';
import { tuiInjectElement } from '@taiga-ui/cdk/utils/dom';
import { fromEvent, map, startWith } from 'rxjs';

class TuiFallbackSrcPipe {
    constructor() {
        this.el = tuiInjectElement();
    }
    transform(src, fallback) {
        return fromEvent(this.el, 'error', { capture: true }).pipe(map(() => fallback), startWith(src || fallback));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiFallbackSrcPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TuiFallbackSrcPipe, isStandalone: true, name: "tuiFallbackSrc" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiFallbackSrcPipe, decorators: [{
            type: Pipe,
            args: [{
                    standalone: true,
                    name: 'tuiFallbackSrc',
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiFallbackSrcPipe };
//# sourceMappingURL=taiga-ui-core-pipes-fallback-src.mjs.map
