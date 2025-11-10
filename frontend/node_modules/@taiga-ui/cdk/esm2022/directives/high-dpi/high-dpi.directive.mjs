import { Directive, inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { WA_WINDOW } from '@ng-web-apis/common';
import * as i0 from "@angular/core";
/**
 * Only adds current content if user has High DPI display
 */
class TuiHighDpi {
    constructor() {
        this.ref = inject(WA_WINDOW).devicePixelRatio > 1 &&
            inject(ViewContainerRef).createEmbeddedView(inject(TemplateRef));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiHighDpi, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiHighDpi, isStandalone: true, selector: "[tuiHighDpi]", ngImport: i0 }); }
}
export { TuiHighDpi };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiHighDpi, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiHighDpi]',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaC1kcGkuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2RrL2RpcmVjdGl2ZXMvaGlnaC1kcGkvaGlnaC1kcGkuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0scUJBQXFCLENBQUM7O0FBRTlDOztHQUVHO0FBQ0gsTUFJYSxVQUFVO0lBSnZCO1FBS3VCLFFBQUcsR0FDbEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLGdCQUFnQixHQUFHLENBQUM7WUFDdEMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7S0FDeEU7K0dBSlksVUFBVTttR0FBVixVQUFVOztTQUFWLFVBQVU7NEZBQVYsVUFBVTtrQkFKdEIsU0FBUzttQkFBQztvQkFDUCxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsUUFBUSxFQUFFLGNBQWM7aUJBQzNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIGluamVjdCwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtXQV9XSU5ET1d9IGZyb20gJ0BuZy13ZWItYXBpcy9jb21tb24nO1xuXG4vKipcbiAqIE9ubHkgYWRkcyBjdXJyZW50IGNvbnRlbnQgaWYgdXNlciBoYXMgSGlnaCBEUEkgZGlzcGxheVxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzdGFuZGFsb25lOiB0cnVlLFxuICAgIHNlbGVjdG9yOiAnW3R1aUhpZ2hEcGldJyxcbn0pXG5leHBvcnQgY2xhc3MgVHVpSGlnaERwaSB7XG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IHJlZiA9XG4gICAgICAgIGluamVjdChXQV9XSU5ET1cpLmRldmljZVBpeGVsUmF0aW8gPiAxICYmXG4gICAgICAgIGluamVjdChWaWV3Q29udGFpbmVyUmVmKS5jcmVhdGVFbWJlZGRlZFZpZXcoaW5qZWN0KFRlbXBsYXRlUmVmKSk7XG59XG4iXX0=