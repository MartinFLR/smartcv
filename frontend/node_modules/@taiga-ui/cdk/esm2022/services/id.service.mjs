import { inject, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
class TuiIdService {
    static { this.autoId = 0; }
    generate() {
        return `tui_${TuiIdService.autoId++}${Date.now()}`;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiIdService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiIdService, providedIn: 'root' }); }
}
export { TuiIdService };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiIdService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
export function tuiInjectId() {
    return inject(TuiIdService).generate();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2Nkay9zZXJ2aWNlcy9pZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUVqRCxNQUdhLFlBQVk7YUFDTixXQUFNLEdBQUcsQ0FBQyxBQUFKLENBQUs7SUFFbkIsUUFBUTtRQUNYLE9BQU8sT0FBTyxZQUFZLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7SUFDdkQsQ0FBQzsrR0FMUSxZQUFZO21IQUFaLFlBQVksY0FGVCxNQUFNOztTQUVULFlBQVk7NEZBQVosWUFBWTtrQkFIeEIsVUFBVTttQkFBQztvQkFDUixVQUFVLEVBQUUsTUFBTTtpQkFDckI7O0FBU0QsTUFBTSxVQUFVLFdBQVc7SUFDdkIsT0FBTyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDM0MsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgVHVpSWRTZXJ2aWNlIHtcbiAgICBwcml2YXRlIHN0YXRpYyBhdXRvSWQgPSAwO1xuXG4gICAgcHVibGljIGdlbmVyYXRlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgdHVpXyR7VHVpSWRTZXJ2aWNlLmF1dG9JZCsrfSR7RGF0ZS5ub3coKX1gO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHR1aUluamVjdElkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGluamVjdChUdWlJZFNlcnZpY2UpLmdlbmVyYXRlKCk7XG59XG4iXX0=