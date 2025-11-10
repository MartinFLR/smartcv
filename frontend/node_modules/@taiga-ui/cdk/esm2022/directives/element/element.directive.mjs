import { Directive, ElementRef } from '@angular/core';
import { tuiInjectElement } from '@taiga-ui/cdk/utils';
import * as i0 from "@angular/core";
class TuiElement {
    constructor() {
        this.nativeElement = tuiInjectElement();
        /**
         * @note:
         * Typically, when your constructor is invoked with new,
         * an object is created, its constructor is assigned to
         * the invoked constructor and the object is then assigned
         * to this before executing any operations specified
         * in your constructor method.
         *
         * ERROR TypeError: Class constructor ElementRef cannot be invoked without 'new'
         * https://github.com/taiga-family/taiga-ui/issues/3072
         *
         * This way we can instantiate object creation
         * without additional prototype chain for possible fix bug.
         */
        return new ElementRef(this.nativeElement);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiElement, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiElement, isStandalone: true, selector: "[tuiElement]", exportAs: ["elementRef"], ngImport: i0 }); }
}
export { TuiElement };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiElement, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiElement]',
                    exportAs: 'elementRef',
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jZGsvZGlyZWN0aXZlcy9lbGVtZW50L2VsZW1lbnQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDOztBQUVyRCxNQUthLFVBQVU7SUFHbkI7UUFGTyxrQkFBYSxHQUFHLGdCQUFnQixFQUFLLENBQUM7UUFHekM7Ozs7Ozs7Ozs7Ozs7V0FhRztRQUNILE9BQU8sSUFBSSxVQUFVLENBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2pELENBQUM7K0dBbkJRLFVBQVU7bUdBQVYsVUFBVTs7U0FBVixVQUFVOzRGQUFWLFVBQVU7a0JBTHRCLFNBQVM7bUJBQUM7b0JBQ1AsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLFFBQVEsRUFBRSxjQUFjO29CQUN4QixRQUFRLEVBQUUsWUFBWTtpQkFDekIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge3R1aUluamVjdEVsZW1lbnR9IGZyb20gJ0B0YWlnYS11aS9jZGsvdXRpbHMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzdGFuZGFsb25lOiB0cnVlLFxuICAgIHNlbGVjdG9yOiAnW3R1aUVsZW1lbnRdJyxcbiAgICBleHBvcnRBczogJ2VsZW1lbnRSZWYnLFxufSlcbmV4cG9ydCBjbGFzcyBUdWlFbGVtZW50PFQgZXh0ZW5kcyBFbGVtZW50ID0gSFRNTEVsZW1lbnQ+IGltcGxlbWVudHMgRWxlbWVudFJlZjxUPiB7XG4gICAgcHVibGljIG5hdGl2ZUVsZW1lbnQgPSB0dWlJbmplY3RFbGVtZW50PFQ+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBub3RlOlxuICAgICAgICAgKiBUeXBpY2FsbHksIHdoZW4geW91ciBjb25zdHJ1Y3RvciBpcyBpbnZva2VkIHdpdGggbmV3LFxuICAgICAgICAgKiBhbiBvYmplY3QgaXMgY3JlYXRlZCwgaXRzIGNvbnN0cnVjdG9yIGlzIGFzc2lnbmVkIHRvXG4gICAgICAgICAqIHRoZSBpbnZva2VkIGNvbnN0cnVjdG9yIGFuZCB0aGUgb2JqZWN0IGlzIHRoZW4gYXNzaWduZWRcbiAgICAgICAgICogdG8gdGhpcyBiZWZvcmUgZXhlY3V0aW5nIGFueSBvcGVyYXRpb25zIHNwZWNpZmllZFxuICAgICAgICAgKiBpbiB5b3VyIGNvbnN0cnVjdG9yIG1ldGhvZC5cbiAgICAgICAgICpcbiAgICAgICAgICogRVJST1IgVHlwZUVycm9yOiBDbGFzcyBjb25zdHJ1Y3RvciBFbGVtZW50UmVmIGNhbm5vdCBiZSBpbnZva2VkIHdpdGhvdXQgJ25ldydcbiAgICAgICAgICogaHR0cHM6Ly9naXRodWIuY29tL3RhaWdhLWZhbWlseS90YWlnYS11aS9pc3N1ZXMvMzA3MlxuICAgICAgICAgKlxuICAgICAgICAgKiBUaGlzIHdheSB3ZSBjYW4gaW5zdGFudGlhdGUgb2JqZWN0IGNyZWF0aW9uXG4gICAgICAgICAqIHdpdGhvdXQgYWRkaXRpb25hbCBwcm90b3R5cGUgY2hhaW4gZm9yIHBvc3NpYmxlIGZpeCBidWcuXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gbmV3IEVsZW1lbnRSZWY8VD4odGhpcy5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG59XG4iXX0=