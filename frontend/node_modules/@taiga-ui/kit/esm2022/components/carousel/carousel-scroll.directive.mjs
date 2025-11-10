import { Directive, Output } from '@angular/core';
import { tuiTypedFromEvent, tuiZonefreeScheduler } from '@taiga-ui/cdk/observables';
import { tuiInjectElement } from '@taiga-ui/cdk/utils/dom';
import { filter, map, tap, throttleTime } from 'rxjs';
import * as i0 from "@angular/core";
class TuiCarouselScroll {
    constructor() {
        this.el = tuiInjectElement();
        this.tuiCarouselScroll = tuiTypedFromEvent(this.el, 'wheel').pipe(filter(({ deltaX }) => Math.abs(deltaX) > 20), throttleTime(500, tuiZonefreeScheduler()), map(({ deltaX }) => Math.sign(deltaX)), tap(() => {
            // So we always have space to scroll and overflow-behavior saves us from back nav
            this.el.scrollLeft = 10;
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiCarouselScroll, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiCarouselScroll, isStandalone: true, selector: "[tuiCarouselScroll]", outputs: { tuiCarouselScroll: "tuiCarouselScroll" }, ngImport: i0 }); }
}
export { TuiCarouselScroll };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiCarouselScroll, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiCarouselScroll]',
                }]
        }], propDecorators: { tuiCarouselScroll: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwtc2Nyb2xsLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2tpdC9jb21wb25lbnRzL2Nhcm91c2VsL2Nhcm91c2VsLXNjcm9sbC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDaEQsT0FBTyxFQUFDLGlCQUFpQixFQUFFLG9CQUFvQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDbEYsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQzs7QUFFcEQsTUFJYSxpQkFBaUI7SUFKOUI7UUFLcUIsT0FBRSxHQUFHLGdCQUFnQixFQUFFLENBQUM7UUFHekIsc0JBQWlCLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ3hFLE1BQU0sQ0FBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQzNDLFlBQVksQ0FBQyxHQUFHLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxFQUN6QyxHQUFHLENBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQ3BDLEdBQUcsQ0FBQyxHQUFHLEVBQUU7WUFDTCxpRkFBaUY7WUFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUNMLENBQUM7S0FDTDsrR0FiWSxpQkFBaUI7bUdBQWpCLGlCQUFpQjs7U0FBakIsaUJBQWlCOzRGQUFqQixpQkFBaUI7a0JBSjdCLFNBQVM7bUJBQUM7b0JBQ1AsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLFFBQVEsRUFBRSxxQkFBcUI7aUJBQ2xDOzhCQUttQixpQkFBaUI7c0JBRGhDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7dHVpVHlwZWRGcm9tRXZlbnQsIHR1aVpvbmVmcmVlU2NoZWR1bGVyfSBmcm9tICdAdGFpZ2EtdWkvY2RrL29ic2VydmFibGVzJztcbmltcG9ydCB7dHVpSW5qZWN0RWxlbWVudH0gZnJvbSAnQHRhaWdhLXVpL2Nkay91dGlscy9kb20nO1xuaW1wb3J0IHtmaWx0ZXIsIG1hcCwgdGFwLCB0aHJvdHRsZVRpbWV9IGZyb20gJ3J4anMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzdGFuZGFsb25lOiB0cnVlLFxuICAgIHNlbGVjdG9yOiAnW3R1aUNhcm91c2VsU2Nyb2xsXScsXG59KVxuZXhwb3J0IGNsYXNzIFR1aUNhcm91c2VsU2Nyb2xsIHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGVsID0gdHVpSW5qZWN0RWxlbWVudCgpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHJlYWRvbmx5IHR1aUNhcm91c2VsU2Nyb2xsID0gdHVpVHlwZWRGcm9tRXZlbnQodGhpcy5lbCwgJ3doZWVsJykucGlwZShcbiAgICAgICAgZmlsdGVyKCh7ZGVsdGFYfSkgPT4gTWF0aC5hYnMoZGVsdGFYKSA+IDIwKSxcbiAgICAgICAgdGhyb3R0bGVUaW1lKDUwMCwgdHVpWm9uZWZyZWVTY2hlZHVsZXIoKSksXG4gICAgICAgIG1hcCgoe2RlbHRhWH0pID0+IE1hdGguc2lnbihkZWx0YVgpKSxcbiAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICAgIC8vIFNvIHdlIGFsd2F5cyBoYXZlIHNwYWNlIHRvIHNjcm9sbCBhbmQgb3ZlcmZsb3ctYmVoYXZpb3Igc2F2ZXMgdXMgZnJvbSBiYWNrIG5hdlxuICAgICAgICAgICAgdGhpcy5lbC5zY3JvbGxMZWZ0ID0gMTA7XG4gICAgICAgIH0pLFxuICAgICk7XG59XG4iXX0=