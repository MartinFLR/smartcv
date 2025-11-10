import { Directive, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WA_WINDOW } from '@ng-web-apis/common';
import { ViewportService } from '@ng-web-apis/screen-orientation';
import { tuiInjectElement, tuiPx } from '@taiga-ui/cdk/utils';
import * as i0 from "@angular/core";
class TuiVisualViewport {
    constructor() {
        this.w = inject(WA_WINDOW);
        this.style = tuiInjectElement().style;
        this.$ = inject(ViewportService)
            .pipe(takeUntilDestroyed())
            .subscribe(({ offsetLeft, offsetTop, height, width, scale }) => {
            this.style.setProperty('--tui-viewport-x', tuiPx(offsetLeft));
            this.style.setProperty('--tui-viewport-y', tuiPx(offsetTop));
            this.style.setProperty('--tui-viewport-height', tuiPx(height));
            this.style.setProperty('--tui-viewport-width', tuiPx(width));
            this.style.setProperty('--tui-viewport-scale', String(scale));
            this.style.setProperty('--tui-viewport-vh', tuiPx(this.w.innerHeight / 100));
            this.style.setProperty('--tui-viewport-vw', tuiPx(this.w.innerWidth / 100));
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiVisualViewport, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiVisualViewport, isStandalone: true, selector: "[tuiVisualViewport]", ngImport: i0 }); }
}
export { TuiVisualViewport };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiVisualViewport, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiVisualViewport]',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsLXZpZXdwb3J0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2Nkay9kaXJlY3RpdmVzL3Zpc3VhbC12aWV3cG9ydC92aXN1YWwtdmlld3BvcnQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2hELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQzlELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFDLGdCQUFnQixFQUFFLEtBQUssRUFBQyxNQUFNLHFCQUFxQixDQUFDOztBQUU1RCxNQUlhLGlCQUFpQjtJQUo5QjtRQUtxQixNQUFDLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RCLFVBQUssR0FBRyxnQkFBZ0IsRUFBRSxDQUFDLEtBQUssQ0FBQztRQUUvQixNQUFDLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQzthQUN6QyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzthQUMxQixTQUFTLENBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUMsRUFBRSxFQUFFO1lBQ3pELElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzlELElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLHVCQUF1QixFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLHNCQUFzQixFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLHNCQUFzQixFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzlELElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzdFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2hGLENBQUMsQ0FBQyxDQUFDO0tBQ1Y7K0dBZlksaUJBQWlCO21HQUFqQixpQkFBaUI7O1NBQWpCLGlCQUFpQjs0RkFBakIsaUJBQWlCO2tCQUo3QixTQUFTO21CQUFDO29CQUNQLFVBQVUsRUFBRSxJQUFJO29CQUNoQixRQUFRLEVBQUUscUJBQXFCO2lCQUNsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBpbmplY3R9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHt0YWtlVW50aWxEZXN0cm95ZWR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvcnhqcy1pbnRlcm9wJztcbmltcG9ydCB7V0FfV0lORE9XfSBmcm9tICdAbmctd2ViLWFwaXMvY29tbW9uJztcbmltcG9ydCB7Vmlld3BvcnRTZXJ2aWNlfSBmcm9tICdAbmctd2ViLWFwaXMvc2NyZWVuLW9yaWVudGF0aW9uJztcbmltcG9ydCB7dHVpSW5qZWN0RWxlbWVudCwgdHVpUHh9IGZyb20gJ0B0YWlnYS11aS9jZGsvdXRpbHMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzdGFuZGFsb25lOiB0cnVlLFxuICAgIHNlbGVjdG9yOiAnW3R1aVZpc3VhbFZpZXdwb3J0XScsXG59KVxuZXhwb3J0IGNsYXNzIFR1aVZpc3VhbFZpZXdwb3J0IHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHcgPSBpbmplY3QoV0FfV0lORE9XKTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHN0eWxlID0gdHVpSW5qZWN0RWxlbWVudCgpLnN0eWxlO1xuXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5ICQgPSBpbmplY3QoVmlld3BvcnRTZXJ2aWNlKVxuICAgICAgICAucGlwZSh0YWtlVW50aWxEZXN0cm95ZWQoKSlcbiAgICAgICAgLnN1YnNjcmliZSgoe29mZnNldExlZnQsIG9mZnNldFRvcCwgaGVpZ2h0LCB3aWR0aCwgc2NhbGV9KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KCctLXR1aS12aWV3cG9ydC14JywgdHVpUHgob2Zmc2V0TGVmdCkpO1xuICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgnLS10dWktdmlld3BvcnQteScsIHR1aVB4KG9mZnNldFRvcCkpO1xuICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgnLS10dWktdmlld3BvcnQtaGVpZ2h0JywgdHVpUHgoaGVpZ2h0KSk7XG4gICAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KCctLXR1aS12aWV3cG9ydC13aWR0aCcsIHR1aVB4KHdpZHRoKSk7XG4gICAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KCctLXR1aS12aWV3cG9ydC1zY2FsZScsIFN0cmluZyhzY2FsZSkpO1xuICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgnLS10dWktdmlld3BvcnQtdmgnLCB0dWlQeCh0aGlzLncuaW5uZXJIZWlnaHQgLyAxMDApKTtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoJy0tdHVpLXZpZXdwb3J0LXZ3JywgdHVpUHgodGhpcy53LmlubmVyV2lkdGggLyAxMDApKTtcbiAgICAgICAgfSk7XG59XG4iXX0=