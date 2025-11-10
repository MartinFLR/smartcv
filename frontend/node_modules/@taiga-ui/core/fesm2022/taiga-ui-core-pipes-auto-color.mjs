import * as i0 from '@angular/core';
import { Pipe } from '@angular/core';
import { tuiStringHashToHsl } from '@taiga-ui/core/utils';

class TuiAutoColorPipe {
    transform(text) {
        return tuiStringHashToHsl(text);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiAutoColorPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TuiAutoColorPipe, isStandalone: true, name: "tuiAutoColor" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiAutoColorPipe, decorators: [{
            type: Pipe,
            args: [{
                    standalone: true,
                    name: 'tuiAutoColor',
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiAutoColorPipe };
//# sourceMappingURL=taiga-ui-core-pipes-auto-color.mjs.map
