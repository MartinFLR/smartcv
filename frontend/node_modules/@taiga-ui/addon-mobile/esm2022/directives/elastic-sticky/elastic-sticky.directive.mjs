import { Directive, inject, Output } from '@angular/core';
import { TuiElasticStickyService } from './elastic-sticky.service';
import * as i0 from "@angular/core";
class TuiElasticSticky {
    constructor() {
        this.tuiElasticSticky = inject(TuiElasticStickyService);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiElasticSticky, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiElasticSticky, isStandalone: true, selector: "[tuiElasticSticky]", outputs: { tuiElasticSticky: "tuiElasticSticky" }, providers: [TuiElasticStickyService], exportAs: ["tuiElasticSticky"], ngImport: i0 }); }
}
export { TuiElasticSticky };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiElasticSticky, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiElasticSticky]',
                    providers: [TuiElasticStickyService],
                    exportAs: 'tuiElasticSticky',
                }]
        }], propDecorators: { tuiElasticSticky: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxhc3RpYy1zdGlja3kuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYWRkb24tbW9iaWxlL2RpcmVjdGl2ZXMvZWxhc3RpYy1zdGlja3kvZWxhc3RpYy1zdGlja3kuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV4RCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQzs7QUFFakUsTUFNYSxnQkFBZ0I7SUFON0I7UUFRb0IscUJBQWdCLEdBQUcsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUM7S0FDdEU7K0dBSFksZ0JBQWdCO21HQUFoQixnQkFBZ0Isb0hBSGQsQ0FBQyx1QkFBdUIsQ0FBQzs7U0FHM0IsZ0JBQWdCOzRGQUFoQixnQkFBZ0I7a0JBTjVCLFNBQVM7bUJBQUM7b0JBQ1AsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFNBQVMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO29CQUNwQyxRQUFRLEVBQUUsa0JBQWtCO2lCQUMvQjs4QkFHbUIsZ0JBQWdCO3NCQUQvQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIGluamVjdCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtUdWlFbGFzdGljU3RpY2t5U2VydmljZX0gZnJvbSAnLi9lbGFzdGljLXN0aWNreS5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgICBzZWxlY3RvcjogJ1t0dWlFbGFzdGljU3RpY2t5XScsXG4gICAgcHJvdmlkZXJzOiBbVHVpRWxhc3RpY1N0aWNreVNlcnZpY2VdLFxuICAgIGV4cG9ydEFzOiAndHVpRWxhc3RpY1N0aWNreScsXG59KVxuZXhwb3J0IGNsYXNzIFR1aUVsYXN0aWNTdGlja3kge1xuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSB0dWlFbGFzdGljU3RpY2t5ID0gaW5qZWN0KFR1aUVsYXN0aWNTdGlja3lTZXJ2aWNlKTtcbn1cbiJdfQ==