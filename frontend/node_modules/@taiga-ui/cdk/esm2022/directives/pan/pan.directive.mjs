import { Directive, inject, Output } from '@angular/core';
import { TuiPanService } from './pan.service';
import * as i0 from "@angular/core";
class TuiPan {
    constructor() {
        this.tuiPan = inject(TuiPanService);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPan, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiPan, isStandalone: true, selector: "[tuiPan]", outputs: { tuiPan: "tuiPan" }, providers: [TuiPanService], ngImport: i0 }); }
}
export { TuiPan };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPan, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiPan]',
                    providers: [TuiPanService],
                }]
        }], propDecorators: { tuiPan: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2Nkay9kaXJlY3RpdmVzL3Bhbi9wYW4uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV4RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUU1QyxNQUthLE1BQU07SUFMbkI7UUFPb0IsV0FBTSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztLQUNsRDsrR0FIWSxNQUFNO21HQUFOLE1BQU0sc0ZBRkosQ0FBQyxhQUFhLENBQUM7O1NBRWpCLE1BQU07NEZBQU4sTUFBTTtrQkFMbEIsU0FBUzttQkFBQztvQkFDUCxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsUUFBUSxFQUFFLFVBQVU7b0JBQ3BCLFNBQVMsRUFBRSxDQUFDLGFBQWEsQ0FBQztpQkFDN0I7OEJBR21CLE1BQU07c0JBRHJCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgaW5qZWN0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1R1aVBhblNlcnZpY2V9IGZyb20gJy4vcGFuLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzdGFuZGFsb25lOiB0cnVlLFxuICAgIHNlbGVjdG9yOiAnW3R1aVBhbl0nLFxuICAgIHByb3ZpZGVyczogW1R1aVBhblNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBUdWlQYW4ge1xuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSB0dWlQYW4gPSBpbmplY3QoVHVpUGFuU2VydmljZSk7XG59XG4iXX0=