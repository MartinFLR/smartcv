import { Directive, inject } from '@angular/core';
import { TuiZoomService } from './zoom.service';
import * as i0 from "@angular/core";
class TuiZoom {
    constructor() {
        this.tuiZoom = inject(TuiZoomService);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiZoom, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiZoom, isStandalone: true, selector: "[tuiZoom]", outputs: { tuiZoom: "tuiZoom" }, host: { properties: { "style.touch-action": "\"none\"" } }, providers: [TuiZoomService], ngImport: i0 }); }
}
export { TuiZoom };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiZoom, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiZoom]',
                    outputs: ['tuiZoom'],
                    providers: [TuiZoomService],
                    host: {
                        '[style.touch-action]': '"none"',
                    },
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9vbS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jZGsvZGlyZWN0aXZlcy96b29tL3pvb20uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWhELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFFOUMsTUFTYSxPQUFPO0lBVHBCO1FBVXVCLFlBQU8sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7S0FDdkQ7K0dBRlksT0FBTzttR0FBUCxPQUFPLHFKQUxMLENBQUMsY0FBYyxDQUFDOztTQUtsQixPQUFPOzRGQUFQLE9BQU87a0JBVG5CLFNBQVM7bUJBQUM7b0JBQ1AsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLFFBQVEsRUFBRSxXQUFXO29CQUNyQixPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUM7b0JBQ3BCLFNBQVMsRUFBRSxDQUFDLGNBQWMsQ0FBQztvQkFDM0IsSUFBSSxFQUFFO3dCQUNGLHNCQUFzQixFQUFFLFFBQVE7cUJBQ25DO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIGluamVjdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7VHVpWm9vbVNlcnZpY2V9IGZyb20gJy4vem9vbS5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgICBzZWxlY3RvcjogJ1t0dWlab29tXScsXG4gICAgb3V0cHV0czogWyd0dWlab29tJ10sXG4gICAgcHJvdmlkZXJzOiBbVHVpWm9vbVNlcnZpY2VdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tzdHlsZS50b3VjaC1hY3Rpb25dJzogJ1wibm9uZVwiJyxcbiAgICB9LFxufSlcbmV4cG9ydCBjbGFzcyBUdWlab29tIHtcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgdHVpWm9vbSA9IGluamVjdChUdWlab29tU2VydmljZSk7XG59XG4iXX0=