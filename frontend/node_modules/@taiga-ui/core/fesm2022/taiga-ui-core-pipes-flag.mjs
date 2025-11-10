import * as i0 from '@angular/core';
import { inject, Pipe } from '@angular/core';
import { TUI_ASSETS_PATH } from '@taiga-ui/core/tokens';

// TODO: Move to kit in v5
class TuiFlagPipe {
    constructor() {
        this.staticPath = inject(TUI_ASSETS_PATH);
    }
    transform(countryIsoCode) {
        if (!countryIsoCode) {
            return null;
        }
        return `${this.staticPath}/flags/${countryIsoCode.toLowerCase()}.svg`;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiFlagPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TuiFlagPipe, isStandalone: true, name: "tuiFlag" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiFlagPipe, decorators: [{
            type: Pipe,
            args: [{
                    standalone: true,
                    name: 'tuiFlag',
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiFlagPipe };
//# sourceMappingURL=taiga-ui-core-pipes-flag.mjs.map
