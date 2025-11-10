import { inject, Injectable } from '@angular/core';
import { WA_ANIMATION_FRAME } from '@ng-web-apis/common';
import { tuiZonefreeScheduler, tuiZoneOptimized } from '@taiga-ui/cdk/observables';
import { tuiGetElementObscures, tuiInjectElement } from '@taiga-ui/cdk/utils/dom';
import { distinctUntilChanged, map, Observable, startWith, throttleTime } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Service that monitors element visibility by polling and returning
 * either null or an array of elements that overlap given element edges
 */
class TuiObscuredService extends Observable {
    constructor() {
        super((subscriber) => this.obscured$.subscribe(subscriber));
        this.el = tuiInjectElement();
        this.obscured$ = inject(WA_ANIMATION_FRAME).pipe(throttleTime(100, tuiZonefreeScheduler()), map(() => tuiGetElementObscures(this.el)), startWith(null), distinctUntilChanged(), tuiZoneOptimized());
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiObscuredService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiObscuredService }); }
}
export { TuiObscuredService };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiObscuredService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzY3VyZWQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2Nkay9kaXJlY3RpdmVzL29ic2N1cmVkL29ic2N1cmVkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFDLG9CQUFvQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDakYsT0FBTyxFQUFDLHFCQUFxQixFQUFFLGdCQUFnQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDaEYsT0FBTyxFQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQzs7QUFFcEY7OztHQUdHO0FBQ0gsTUFDYSxrQkFBbUIsU0FBUSxVQUFxQztJQVV6RTtRQUNJLEtBQUssQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQVYvQyxPQUFFLEdBQUcsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixjQUFTLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUN4RCxZQUFZLENBQUMsR0FBRyxFQUFFLG9CQUFvQixFQUFFLENBQUMsRUFDekMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUN6QyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQ2Ysb0JBQW9CLEVBQUUsRUFDdEIsZ0JBQWdCLEVBQUUsQ0FDckIsQ0FBQztJQUlGLENBQUM7K0dBWlEsa0JBQWtCO21IQUFsQixrQkFBa0I7O1NBQWxCLGtCQUFrQjs0RkFBbEIsa0JBQWtCO2tCQUQ5QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3QsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtXQV9BTklNQVRJT05fRlJBTUV9IGZyb20gJ0BuZy13ZWItYXBpcy9jb21tb24nO1xuaW1wb3J0IHt0dWlab25lZnJlZVNjaGVkdWxlciwgdHVpWm9uZU9wdGltaXplZH0gZnJvbSAnQHRhaWdhLXVpL2Nkay9vYnNlcnZhYmxlcyc7XG5pbXBvcnQge3R1aUdldEVsZW1lbnRPYnNjdXJlcywgdHVpSW5qZWN0RWxlbWVudH0gZnJvbSAnQHRhaWdhLXVpL2Nkay91dGlscy9kb20nO1xuaW1wb3J0IHtkaXN0aW5jdFVudGlsQ2hhbmdlZCwgbWFwLCBPYnNlcnZhYmxlLCBzdGFydFdpdGgsIHRocm90dGxlVGltZX0gZnJvbSAncnhqcyc7XG5cbi8qKlxuICogU2VydmljZSB0aGF0IG1vbml0b3JzIGVsZW1lbnQgdmlzaWJpbGl0eSBieSBwb2xsaW5nIGFuZCByZXR1cm5pbmdcbiAqIGVpdGhlciBudWxsIG9yIGFuIGFycmF5IG9mIGVsZW1lbnRzIHRoYXQgb3ZlcmxhcCBnaXZlbiBlbGVtZW50IGVkZ2VzXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUdWlPYnNjdXJlZFNlcnZpY2UgZXh0ZW5kcyBPYnNlcnZhYmxlPHJlYWRvbmx5IEVsZW1lbnRbXSB8IG51bGw+IHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGVsID0gdHVpSW5qZWN0RWxlbWVudCgpO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgb2JzY3VyZWQkID0gaW5qZWN0KFdBX0FOSU1BVElPTl9GUkFNRSkucGlwZShcbiAgICAgICAgdGhyb3R0bGVUaW1lKDEwMCwgdHVpWm9uZWZyZWVTY2hlZHVsZXIoKSksXG4gICAgICAgIG1hcCgoKSA9PiB0dWlHZXRFbGVtZW50T2JzY3VyZXModGhpcy5lbCkpLFxuICAgICAgICBzdGFydFdpdGgobnVsbCksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICAgIHR1aVpvbmVPcHRpbWl6ZWQoKSxcbiAgICApO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKChzdWJzY3JpYmVyKSA9PiB0aGlzLm9ic2N1cmVkJC5zdWJzY3JpYmUoc3Vic2NyaWJlcikpO1xuICAgIH1cbn1cbiJdfQ==