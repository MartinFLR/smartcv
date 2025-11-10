import * as i0 from '@angular/core';
import { inject, Pipe } from '@angular/core';
import { TUI_COUNTRIES } from '@taiga-ui/kit/tokens';
import { map } from 'rxjs';

class TuiSortCountriesPipe {
    constructor() {
        this.countriesNames$ = inject(TUI_COUNTRIES);
    }
    transform(countries) {
        return this.countriesNames$.pipe(map((names) => [...countries].sort((a, b) => names[a].localeCompare(names[b]))));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiSortCountriesPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TuiSortCountriesPipe, isStandalone: true, name: "tuiSortCountries" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiSortCountriesPipe, decorators: [{
            type: Pipe,
            args: [{
                    standalone: true,
                    name: 'tuiSortCountries',
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiSortCountriesPipe };
//# sourceMappingURL=taiga-ui-kit-pipes-sort-countries.mjs.map
