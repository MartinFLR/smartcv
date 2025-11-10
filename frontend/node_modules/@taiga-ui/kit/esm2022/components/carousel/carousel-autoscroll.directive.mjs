import { Directive, inject, Output } from '@angular/core';
import { TuiCarouselDirective } from './carousel.directive';
import * as i0 from "@angular/core";
class TuiCarouselAutoscroll {
    constructor() {
        this.tuiCarouselAutoscroll = inject(TuiCarouselDirective);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiCarouselAutoscroll, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiCarouselAutoscroll, isStandalone: true, selector: "[tuiCarouselAutoscroll]", outputs: { tuiCarouselAutoscroll: "tuiCarouselAutoscroll" }, ngImport: i0 }); }
}
export { TuiCarouselAutoscroll };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiCarouselAutoscroll, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiCarouselAutoscroll]',
                }]
        }], propDecorators: { tuiCarouselAutoscroll: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwtYXV0b3Njcm9sbC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9raXQvY29tcG9uZW50cy9jYXJvdXNlbC9jYXJvdXNlbC1hdXRvc2Nyb2xsLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFeEQsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7O0FBRTFELE1BSWEscUJBQXFCO0lBSmxDO1FBTW9CLDBCQUFxQixHQUFHLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0tBQ3hFOytHQUhZLHFCQUFxQjttR0FBckIscUJBQXFCOztTQUFyQixxQkFBcUI7NEZBQXJCLHFCQUFxQjtrQkFKakMsU0FBUzttQkFBQztvQkFDUCxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsUUFBUSxFQUFFLHlCQUF5QjtpQkFDdEM7OEJBR21CLHFCQUFxQjtzQkFEcEMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBpbmplY3QsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7VHVpQ2Fyb3VzZWxEaXJlY3RpdmV9IGZyb20gJy4vY2Fyb3VzZWwuZGlyZWN0aXZlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgICBzZWxlY3RvcjogJ1t0dWlDYXJvdXNlbEF1dG9zY3JvbGxdJyxcbn0pXG5leHBvcnQgY2xhc3MgVHVpQ2Fyb3VzZWxBdXRvc2Nyb2xsIHtcbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgcmVhZG9ubHkgdHVpQ2Fyb3VzZWxBdXRvc2Nyb2xsID0gaW5qZWN0KFR1aUNhcm91c2VsRGlyZWN0aXZlKTtcbn1cbiJdfQ==