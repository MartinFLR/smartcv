import { Directive, Input, Output } from '@angular/core';
import { distinctUntilChanged, Subject } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * @deprecated TODO: remove in v.5 when legacy controls are dropped
 */
class TuiDropdownOpenLegacy {
    constructor() {
        this.openStateSub = new Subject();
        this.tuiDropdownOpenChange = this.openStateSub.pipe(distinctUntilChanged());
    }
    set tuiDropdownOpen(open) {
        this.emitOpenChange(open);
    }
    emitOpenChange(open) {
        this.openStateSub.next(open);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiDropdownOpenLegacy, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiDropdownOpenLegacy, isStandalone: true, selector: "[tuiDropdownOpen]:not([tuiDropdown]),[tuiDropdownOpenChange]:not([tuiDropdown])", inputs: { tuiDropdownOpen: "tuiDropdownOpen" }, outputs: { tuiDropdownOpenChange: "tuiDropdownOpenChange" }, ngImport: i0 }); }
}
export { TuiDropdownOpenLegacy };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiDropdownOpenLegacy, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiDropdownOpen]:not([tuiDropdown]),[tuiDropdownOpenChange]:not([tuiDropdown])',
                }]
        }], propDecorators: { tuiDropdownOpenChange: [{
                type: Output
            }], tuiDropdownOpen: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tb3Blbi1sZWdhY3kuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9kaXJlY3RpdmVzL2Ryb3Bkb3duL2Ryb3Bkb3duLW9wZW4tbGVnYWN5LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFDLG9CQUFvQixFQUFFLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQzs7QUFFbkQ7O0dBRUc7QUFDSCxNQUthLHFCQUFxQjtJQUxsQztRQU1xQixpQkFBWSxHQUFHLElBQUksT0FBTyxFQUFXLENBQUM7UUFHdkMsMEJBQXFCLEdBQ2pDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztLQVV0RDtJQVJHLElBQ1csZUFBZSxDQUFDLElBQWE7UUFDcEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRU0sY0FBYyxDQUFDLElBQWE7UUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQzsrR0FkUSxxQkFBcUI7bUdBQXJCLHFCQUFxQjs7U0FBckIscUJBQXFCOzRGQUFyQixxQkFBcUI7a0JBTGpDLFNBQVM7bUJBQUM7b0JBQ1AsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLFFBQVEsRUFDSixpRkFBaUY7aUJBQ3hGOzhCQUttQixxQkFBcUI7c0JBRHBDLE1BQU07Z0JBS0ksZUFBZTtzQkFEekIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBJbnB1dCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7ZGlzdGluY3RVbnRpbENoYW5nZWQsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xuXG4vKipcbiAqIEBkZXByZWNhdGVkIFRPRE86IHJlbW92ZSBpbiB2LjUgd2hlbiBsZWdhY3kgY29udHJvbHMgYXJlIGRyb3BwZWRcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgICBzZWxlY3RvcjpcbiAgICAgICAgJ1t0dWlEcm9wZG93bk9wZW5dOm5vdChbdHVpRHJvcGRvd25dKSxbdHVpRHJvcGRvd25PcGVuQ2hhbmdlXTpub3QoW3R1aURyb3Bkb3duXSknLFxufSlcbmV4cG9ydCBjbGFzcyBUdWlEcm9wZG93bk9wZW5MZWdhY3kge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgb3BlblN0YXRlU3ViID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSB0dWlEcm9wZG93bk9wZW5DaGFuZ2UgPVxuICAgICAgICB0aGlzLm9wZW5TdGF0ZVN1Yi5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2V0IHR1aURyb3Bkb3duT3BlbihvcGVuOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZW1pdE9wZW5DaGFuZ2Uob3Blbik7XG4gICAgfVxuXG4gICAgcHVibGljIGVtaXRPcGVuQ2hhbmdlKG9wZW46IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vcGVuU3RhdGVTdWIubmV4dChvcGVuKTtcbiAgICB9XG59XG4iXX0=