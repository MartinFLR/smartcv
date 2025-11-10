import { Directive, inject, Output } from '@angular/core';
import { MutationObserverService, WA_MUTATION_OBSERVER_INIT, } from '@ng-web-apis/mutation-observer';
import { ResizeObserverService } from '@ng-web-apis/resize-observer';
import { tuiInjectElement } from '@taiga-ui/cdk/utils/dom';
import { debounceTime, distinctUntilChanged, map, merge } from 'rxjs';
import * as i0 from "@angular/core";
class TuiElasticContainerDirective {
    constructor() {
        this.el = tuiInjectElement();
        this.tuiElasticContainer = merge(inject(ResizeObserverService, { self: true }), inject(MutationObserverService, { self: true })).pipe(debounceTime(0), map(() => this.el.clientHeight - 1), distinctUntilChanged());
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiElasticContainerDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiElasticContainerDirective, isStandalone: true, selector: "[tuiElasticContainer]", outputs: { tuiElasticContainer: "tuiElasticContainer" }, providers: [
            ResizeObserverService,
            MutationObserverService,
            {
                provide: WA_MUTATION_OBSERVER_INIT,
                useValue: {
                    childList: true,
                    characterData: true,
                    subtree: true,
                },
            },
        ], ngImport: i0 }); }
}
export { TuiElasticContainerDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiElasticContainerDirective, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiElasticContainer]',
                    providers: [
                        ResizeObserverService,
                        MutationObserverService,
                        {
                            provide: WA_MUTATION_OBSERVER_INIT,
                            useValue: {
                                childList: true,
                                characterData: true,
                                subtree: true,
                            },
                        },
                    ],
                }]
        }], propDecorators: { tuiElasticContainer: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxhc3RpYy1jb250YWluZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMva2l0L2NvbXBvbmVudHMvZWxhc3RpYy1jb250YWluZXIvZWxhc3RpYy1jb250YWluZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4RCxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLHlCQUF5QixHQUM1QixNQUFNLGdDQUFnQyxDQUFDO0FBQ3hDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ25FLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBQyxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBQyxNQUFNLE1BQU0sQ0FBQzs7QUFFcEUsTUFnQmEsNEJBQTRCO0lBaEJ6QztRQWlCcUIsT0FBRSxHQUFHLGdCQUFnQixFQUFFLENBQUM7UUFHekIsd0JBQW1CLEdBQUcsS0FBSyxDQUN2QyxNQUFNLENBQUMscUJBQXFCLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUMsRUFDM0MsTUFBTSxDQUFDLHVCQUF1QixFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLENBQ2hELENBQUMsSUFBSSxDQUNGLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFDZixHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLEVBQ25DLG9CQUFvQixFQUFFLENBQ3pCLENBQUM7S0FDTDsrR0FaWSw0QkFBNEI7bUdBQTVCLDRCQUE0Qiw2SEFiMUI7WUFDUCxxQkFBcUI7WUFDckIsdUJBQXVCO1lBQ3ZCO2dCQUNJLE9BQU8sRUFBRSx5QkFBeUI7Z0JBQ2xDLFFBQVEsRUFBRTtvQkFDTixTQUFTLEVBQUUsSUFBSTtvQkFDZixhQUFhLEVBQUUsSUFBSTtvQkFDbkIsT0FBTyxFQUFFLElBQUk7aUJBQ2hCO2FBQ0o7U0FDSjs7U0FFUSw0QkFBNEI7NEZBQTVCLDRCQUE0QjtrQkFoQnhDLFNBQVM7bUJBQUM7b0JBQ1AsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLFNBQVMsRUFBRTt3QkFDUCxxQkFBcUI7d0JBQ3JCLHVCQUF1Qjt3QkFDdkI7NEJBQ0ksT0FBTyxFQUFFLHlCQUF5Qjs0QkFDbEMsUUFBUSxFQUFFO2dDQUNOLFNBQVMsRUFBRSxJQUFJO2dDQUNmLGFBQWEsRUFBRSxJQUFJO2dDQUNuQixPQUFPLEVBQUUsSUFBSTs2QkFDaEI7eUJBQ0o7cUJBQ0o7aUJBQ0o7OEJBS21CLG1CQUFtQjtzQkFEbEMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBpbmplY3QsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIE11dGF0aW9uT2JzZXJ2ZXJTZXJ2aWNlLFxuICAgIFdBX01VVEFUSU9OX09CU0VSVkVSX0lOSVQsXG59IGZyb20gJ0BuZy13ZWItYXBpcy9tdXRhdGlvbi1vYnNlcnZlcic7XG5pbXBvcnQge1Jlc2l6ZU9ic2VydmVyU2VydmljZX0gZnJvbSAnQG5nLXdlYi1hcGlzL3Jlc2l6ZS1vYnNlcnZlcic7XG5pbXBvcnQge3R1aUluamVjdEVsZW1lbnR9IGZyb20gJ0B0YWlnYS11aS9jZGsvdXRpbHMvZG9tJztcbmltcG9ydCB7ZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgbWFwLCBtZXJnZX0gZnJvbSAncnhqcyc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHN0YW5kYWxvbmU6IHRydWUsXG4gICAgc2VsZWN0b3I6ICdbdHVpRWxhc3RpY0NvbnRhaW5lcl0nLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBSZXNpemVPYnNlcnZlclNlcnZpY2UsXG4gICAgICAgIE11dGF0aW9uT2JzZXJ2ZXJTZXJ2aWNlLFxuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBXQV9NVVRBVElPTl9PQlNFUlZFUl9JTklULFxuICAgICAgICAgICAgdXNlVmFsdWU6IHtcbiAgICAgICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyRGF0YTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICBdLFxufSlcbmV4cG9ydCBjbGFzcyBUdWlFbGFzdGljQ29udGFpbmVyRGlyZWN0aXZlIHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGVsID0gdHVpSW5qZWN0RWxlbWVudCgpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHJlYWRvbmx5IHR1aUVsYXN0aWNDb250YWluZXIgPSBtZXJnZShcbiAgICAgICAgaW5qZWN0KFJlc2l6ZU9ic2VydmVyU2VydmljZSwge3NlbGY6IHRydWV9KSxcbiAgICAgICAgaW5qZWN0KE11dGF0aW9uT2JzZXJ2ZXJTZXJ2aWNlLCB7c2VsZjogdHJ1ZX0pLFxuICAgICkucGlwZShcbiAgICAgICAgZGVib3VuY2VUaW1lKDApLFxuICAgICAgICBtYXAoKCkgPT4gdGhpcy5lbC5jbGllbnRIZWlnaHQgLSAxKSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICApO1xufVxuIl19