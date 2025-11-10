import { Directive, inject, Output } from '@angular/core';
import { TuiSwipeService } from './swipe.service';
import * as i0 from "@angular/core";
class TuiSwipe {
    constructor() {
        this.tuiSwipe = inject(TuiSwipeService);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiSwipe, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiSwipe, isStandalone: true, selector: "[tuiSwipe]", outputs: { tuiSwipe: "tuiSwipe" }, providers: [TuiSwipeService], ngImport: i0 }); }
}
export { TuiSwipe };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiSwipe, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiSwipe]',
                    providers: [TuiSwipeService],
                }]
        }], propDecorators: { tuiSwipe: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpcGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2RrL2RpcmVjdGl2ZXMvc3dpcGUvc3dpcGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV4RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0saUJBQWlCLENBQUM7O0FBRWhELE1BS2EsUUFBUTtJQUxyQjtRQU9vQixhQUFRLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQ3REOytHQUhZLFFBQVE7bUdBQVIsUUFBUSw0RkFGTixDQUFDLGVBQWUsQ0FBQzs7U0FFbkIsUUFBUTs0RkFBUixRQUFRO2tCQUxwQixTQUFTO21CQUFDO29CQUNQLFVBQVUsRUFBRSxJQUFJO29CQUNoQixRQUFRLEVBQUUsWUFBWTtvQkFDdEIsU0FBUyxFQUFFLENBQUMsZUFBZSxDQUFDO2lCQUMvQjs4QkFHbUIsUUFBUTtzQkFEdkIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBpbmplY3QsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7VHVpU3dpcGVTZXJ2aWNlfSBmcm9tICcuL3N3aXBlLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzdGFuZGFsb25lOiB0cnVlLFxuICAgIHNlbGVjdG9yOiAnW3R1aVN3aXBlXScsXG4gICAgcHJvdmlkZXJzOiBbVHVpU3dpcGVTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgVHVpU3dpcGUge1xuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSB0dWlTd2lwZSA9IGluamVjdChUdWlTd2lwZVNlcnZpY2UpO1xufVxuIl19