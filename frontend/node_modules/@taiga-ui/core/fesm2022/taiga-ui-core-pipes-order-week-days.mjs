import * as i0 from '@angular/core';
import { inject, Pipe } from '@angular/core';
import { TUI_FIRST_DAY_OF_WEEK } from '@taiga-ui/core/tokens';
import { map } from 'rxjs';

function convertToSundayFirstWeekFormat(weekDaysNames) {
    const sundayIndex = weekDaysNames.length - 1;
    return [weekDaysNames[sundayIndex] || '', ...weekDaysNames.slice(0, sundayIndex)];
}
class TuiOrderWeekDaysPipe {
    constructor() {
        this.firstDayOfWeekIndex = inject(TUI_FIRST_DAY_OF_WEEK);
    }
    transform(mondayFirstWeekDays$) {
        return mondayFirstWeekDays$.pipe(map(convertToSundayFirstWeekFormat), map((weekDays) => [
            ...weekDays.slice(this.firstDayOfWeekIndex),
            ...weekDays.slice(0, this.firstDayOfWeekIndex),
        ]));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiOrderWeekDaysPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TuiOrderWeekDaysPipe, isStandalone: true, name: "tuiOrderWeekDays" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiOrderWeekDaysPipe, decorators: [{
            type: Pipe,
            args: [{
                    standalone: true,
                    name: 'tuiOrderWeekDays',
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiOrderWeekDaysPipe };
//# sourceMappingURL=taiga-ui-core-pipes-order-week-days.mjs.map
