import { Directive, inject, Output } from '@angular/core';
import { TuiHoveredService } from './hovered.service';
import * as i0 from "@angular/core";
class TuiHovered {
    constructor() {
        this.tuiHoveredChange = inject(TuiHoveredService);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiHovered, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiHovered, isStandalone: true, selector: "[tuiHoveredChange]", outputs: { tuiHoveredChange: "tuiHoveredChange" }, providers: [TuiHoveredService], ngImport: i0 }); }
}
export { TuiHovered };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiHovered, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiHoveredChange]',
                    providers: [TuiHoveredService],
                }]
        }], propDecorators: { tuiHoveredChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG92ZXJlZC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jZGsvZGlyZWN0aXZlcy9ob3ZlcmVkL2hvdmVyZWQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV4RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQzs7QUFFcEQsTUFLYSxVQUFVO0lBTHZCO1FBT29CLHFCQUFnQixHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0tBQ2hFOytHQUhZLFVBQVU7bUdBQVYsVUFBVSxvSEFGUixDQUFDLGlCQUFpQixDQUFDOztTQUVyQixVQUFVOzRGQUFWLFVBQVU7a0JBTHRCLFNBQVM7bUJBQUM7b0JBQ1AsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFNBQVMsRUFBRSxDQUFDLGlCQUFpQixDQUFDO2lCQUNqQzs4QkFHbUIsZ0JBQWdCO3NCQUQvQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIGluamVjdCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtUdWlIb3ZlcmVkU2VydmljZX0gZnJvbSAnLi9ob3ZlcmVkLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzdGFuZGFsb25lOiB0cnVlLFxuICAgIHNlbGVjdG9yOiAnW3R1aUhvdmVyZWRDaGFuZ2VdJyxcbiAgICBwcm92aWRlcnM6IFtUdWlIb3ZlcmVkU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIFR1aUhvdmVyZWQge1xuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSB0dWlIb3ZlcmVkQ2hhbmdlID0gaW5qZWN0KFR1aUhvdmVyZWRTZXJ2aWNlKTtcbn1cbiJdfQ==