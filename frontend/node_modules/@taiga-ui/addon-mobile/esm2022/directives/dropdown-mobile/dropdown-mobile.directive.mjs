import { Directive, inject, Input } from '@angular/core';
import { TUI_IS_MOBILE } from '@taiga-ui/cdk/tokens';
import { tuiIsHTMLElement } from '@taiga-ui/cdk/utils/dom';
import { TUI_DROPDOWN_COMPONENT } from '@taiga-ui/core/directives/dropdown';
import { TuiDropdownMobileComponent } from './dropdown-mobile.component';
import * as i0 from "@angular/core";
class TuiDropdownMobile {
    constructor() {
        this.isMobile = inject(TUI_IS_MOBILE);
        this.tuiDropdownMobile = '';
    }
    onMouseDown(event) {
        if (!this.isMobile ||
            !tuiIsHTMLElement(event.target) ||
            !event.target.matches('input,textarea') ||
            this.tuiDropdownMobile) {
            return;
        }
        event.preventDefault();
        event.target.focus({ preventScroll: true });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiDropdownMobile, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiDropdownMobile, isStandalone: true, selector: "[tuiDropdownMobile]", inputs: { tuiDropdownMobile: "tuiDropdownMobile" }, host: { listeners: { "mousedown": "onMouseDown($event)" }, properties: { "style.visibility": "\"visible\"" } }, providers: [
            {
                provide: TUI_DROPDOWN_COMPONENT,
                useFactory: () => inject(TUI_IS_MOBILE)
                    ? TuiDropdownMobileComponent
                    : inject(TUI_DROPDOWN_COMPONENT, { skipSelf: true }),
            },
        ], ngImport: i0 }); }
}
export { TuiDropdownMobile };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiDropdownMobile, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiDropdownMobile]',
                    providers: [
                        {
                            provide: TUI_DROPDOWN_COMPONENT,
                            useFactory: () => inject(TUI_IS_MOBILE)
                                ? TuiDropdownMobileComponent
                                : inject(TUI_DROPDOWN_COMPONENT, { skipSelf: true }),
                        },
                    ],
                    host: {
                        '[style.visibility]': '"visible"',
                        '(mousedown)': 'onMouseDown($event)',
                    },
                }]
        }], propDecorators: { tuiDropdownMobile: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tbW9iaWxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FkZG9uLW1vYmlsZS9kaXJlY3RpdmVzL2Ryb3Bkb3duLW1vYmlsZS9kcm9wZG93bi1tb2JpbGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFFMUUsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sNkJBQTZCLENBQUM7O0FBRXZFLE1BaUJhLGlCQUFpQjtJQWpCOUI7UUFrQnFCLGFBQVEsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFHM0Msc0JBQWlCLEdBQUcsRUFBRSxDQUFDO0tBZWpDO0lBYmEsV0FBVyxDQUFDLEtBQWlCO1FBQ25DLElBQ0ksQ0FBQyxJQUFJLENBQUMsUUFBUTtZQUNkLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUMvQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDO1lBQ3ZDLElBQUksQ0FBQyxpQkFBaUIsRUFDeEI7WUFDRSxPQUFPO1NBQ1Y7UUFFRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBQyxhQUFhLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUM5QyxDQUFDOytHQWxCUSxpQkFBaUI7bUdBQWpCLGlCQUFpQixzT0FkZjtZQUNQO2dCQUNJLE9BQU8sRUFBRSxzQkFBc0I7Z0JBQy9CLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FDYixNQUFNLENBQUMsYUFBYSxDQUFDO29CQUNqQixDQUFDLENBQUMsMEJBQTBCO29CQUM1QixDQUFDLENBQUMsTUFBTSxDQUFDLHNCQUFzQixFQUFFLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDO2FBQzdEO1NBQ0o7O1NBTVEsaUJBQWlCOzRGQUFqQixpQkFBaUI7a0JBakI3QixTQUFTO21CQUFDO29CQUNQLFVBQVUsRUFBRSxJQUFJO29CQUNoQixRQUFRLEVBQUUscUJBQXFCO29CQUMvQixTQUFTLEVBQUU7d0JBQ1A7NEJBQ0ksT0FBTyxFQUFFLHNCQUFzQjs0QkFDL0IsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUNiLE1BQU0sQ0FBQyxhQUFhLENBQUM7Z0NBQ2pCLENBQUMsQ0FBQywwQkFBMEI7Z0NBQzVCLENBQUMsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLEVBQUUsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUM7eUJBQzdEO3FCQUNKO29CQUNELElBQUksRUFBRTt3QkFDRixvQkFBb0IsRUFBRSxXQUFXO3dCQUNqQyxhQUFhLEVBQUUscUJBQXFCO3FCQUN2QztpQkFDSjs4QkFLVSxpQkFBaUI7c0JBRHZCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgaW5qZWN0LCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1RVSV9JU19NT0JJTEV9IGZyb20gJ0B0YWlnYS11aS9jZGsvdG9rZW5zJztcbmltcG9ydCB7dHVpSXNIVE1MRWxlbWVudH0gZnJvbSAnQHRhaWdhLXVpL2Nkay91dGlscy9kb20nO1xuaW1wb3J0IHtUVUlfRFJPUERPV05fQ09NUE9ORU5UfSBmcm9tICdAdGFpZ2EtdWkvY29yZS9kaXJlY3RpdmVzL2Ryb3Bkb3duJztcblxuaW1wb3J0IHtUdWlEcm9wZG93bk1vYmlsZUNvbXBvbmVudH0gZnJvbSAnLi9kcm9wZG93bi1tb2JpbGUuY29tcG9uZW50JztcblxuQERpcmVjdGl2ZSh7XG4gICAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgICBzZWxlY3RvcjogJ1t0dWlEcm9wZG93bk1vYmlsZV0nLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBUVUlfRFJPUERPV05fQ09NUE9ORU5ULFxuICAgICAgICAgICAgdXNlRmFjdG9yeTogKCkgPT5cbiAgICAgICAgICAgICAgICBpbmplY3QoVFVJX0lTX01PQklMRSlcbiAgICAgICAgICAgICAgICAgICAgPyBUdWlEcm9wZG93bk1vYmlsZUNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICA6IGluamVjdChUVUlfRFJPUERPV05fQ09NUE9ORU5ULCB7c2tpcFNlbGY6IHRydWV9KSxcbiAgICAgICAgfSxcbiAgICBdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tzdHlsZS52aXNpYmlsaXR5XSc6ICdcInZpc2libGVcIicsXG4gICAgICAgICcobW91c2Vkb3duKSc6ICdvbk1vdXNlRG93bigkZXZlbnQpJyxcbiAgICB9LFxufSlcbmV4cG9ydCBjbGFzcyBUdWlEcm9wZG93bk1vYmlsZSB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBpc01vYmlsZSA9IGluamVjdChUVUlfSVNfTU9CSUxFKTtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHR1aURyb3Bkb3duTW9iaWxlID0gJyc7XG5cbiAgICBwcm90ZWN0ZWQgb25Nb3VzZURvd24oZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgIXRoaXMuaXNNb2JpbGUgfHxcbiAgICAgICAgICAgICF0dWlJc0hUTUxFbGVtZW50KGV2ZW50LnRhcmdldCkgfHxcbiAgICAgICAgICAgICFldmVudC50YXJnZXQubWF0Y2hlcygnaW5wdXQsdGV4dGFyZWEnKSB8fFxuICAgICAgICAgICAgdGhpcy50dWlEcm9wZG93bk1vYmlsZVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnRhcmdldC5mb2N1cyh7cHJldmVudFNjcm9sbDogdHJ1ZX0pO1xuICAgIH1cbn1cbiJdfQ==