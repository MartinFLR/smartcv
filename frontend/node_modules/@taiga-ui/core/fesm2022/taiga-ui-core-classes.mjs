import * as i0 from '@angular/core';
import { SkipSelf, Optional, inject, DestroyRef, Directive } from '@angular/core';
import { tuiProvide } from '@taiga-ui/cdk/utils/miscellaneous';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, merge, distinctUntilChanged } from 'rxjs';

class TuiAccessor {
}
class TuiPositionAccessor extends TuiAccessor {
}
class TuiRectAccessor extends TuiAccessor {
}
function tuiProvideAccessor(provide, type, fallback) {
    return {
        provide,
        deps: [[new SkipSelf(), new Optional(), provide], fallback],
        useFactory: tuiFallbackAccessor(type),
    };
}
function tuiFallbackAccessor(type) {
    return (accessors, fallback) => accessors?.find?.((accessor) => accessor !== fallback && accessor.type === type) || fallback;
}
function tuiPositionAccessorFor(type, fallback) {
    return tuiProvideAccessor(TuiPositionAccessor, type, fallback);
}
function tuiRectAccessorFor(type, fallback) {
    return tuiProvideAccessor(TuiRectAccessor, type, fallback);
}
function tuiAsPositionAccessor(accessor) {
    return tuiProvide(TuiPositionAccessor, accessor, true);
}
function tuiAsRectAccessor(accessor) {
    return tuiProvide(TuiRectAccessor, accessor, true);
}

class TuiVehicle {
}
function tuiAsVehicle(vehicle) {
    return tuiProvide(TuiVehicle, vehicle, true);
}

class TuiDriver extends Observable {
}
function tuiAsDriver(driver) {
    return tuiProvide(TuiDriver, driver, true);
}
class TuiDriverDirective {
    constructor() {
        this.destroyRef = inject(DestroyRef);
        this.drivers = inject(TuiDriver, { self: true, optional: true }) || [];
        this.vehicles = inject(TuiVehicle, {
            self: true,
            optional: true,
        });
    }
    ngAfterViewInit() {
        const vehicle = this.vehicles?.find(({ type }) => type === this.type);
        merge(...this.drivers.filter(({ type }) => type === this.type))
            .pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
            .subscribe((value) => {
            vehicle?.toggle(value);
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiDriverDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiDriverDirective, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiDriverDirective, decorators: [{
            type: Directive
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiAccessor, TuiDriver, TuiDriverDirective, TuiPositionAccessor, TuiRectAccessor, TuiVehicle, tuiAsDriver, tuiAsPositionAccessor, tuiAsRectAccessor, tuiAsVehicle, tuiFallbackAccessor, tuiPositionAccessorFor, tuiProvideAccessor, tuiRectAccessorFor };
//# sourceMappingURL=taiga-ui-core-classes.mjs.map
