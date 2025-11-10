import * as i0 from '@angular/core';
import { Pipe } from '@angular/core';

class TuiInitialsPipe {
    transform(text) {
        return text
            .toUpperCase()
            .split(' ')
            .map(([char]) => char)
            .join('')
            .slice(0, 2);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiInitialsPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TuiInitialsPipe, isStandalone: true, name: "tuiInitials" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiInitialsPipe, decorators: [{
            type: Pipe,
            args: [{
                    standalone: true,
                    name: 'tuiInitials',
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiInitialsPipe };
//# sourceMappingURL=taiga-ui-core-pipes-initials.mjs.map
