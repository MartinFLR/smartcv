import { ChangeDetectionStrategy, Component, Directive, ViewEncapsulation, } from '@angular/core';
import { tuiWithStyles } from '@taiga-ui/cdk/utils/miscellaneous';
import { TUI_APPEARANCE_OPTIONS, TuiWithAppearance, } from '@taiga-ui/core/directives/appearance';
import * as i0 from "@angular/core";
import * as i1 from "@taiga-ui/core/directives/appearance";
class TuiMessageStyles {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiMessageStyles, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: TuiMessageStyles, isStandalone: true, selector: "ng-component", host: { classAttribute: "tui-message" }, ngImport: i0, template: '', isInline: true, styles: ["[tuiMessage]{display:inline-flex;padding:.5rem .625rem;min-block-size:2.25rem;block-size:auto;box-sizing:border-box;inline-size:-webkit-fit-content;inline-size:-moz-fit-content;inline-size:fit-content;isolation:isolate;white-space:nowrap;text-align:start;font:var(--tui-font-text-ui-m);border-radius:var(--tui-radius-l)}[tuiMessage]>[tuiLink]{color:inherit!important;-webkit-text-decoration:underline solid!important;text-decoration:underline solid!important}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiMessageStyles, decorators: [{
            type: Component,
            args: [{ standalone: true, template: '', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        class: 'tui-message',
                    }, styles: ["[tuiMessage]{display:inline-flex;padding:.5rem .625rem;min-block-size:2.25rem;block-size:auto;box-sizing:border-box;inline-size:-webkit-fit-content;inline-size:-moz-fit-content;inline-size:fit-content;isolation:isolate;white-space:nowrap;text-align:start;font:var(--tui-font-text-ui-m);border-radius:var(--tui-radius-l)}[tuiMessage]>[tuiLink]{color:inherit!important;-webkit-text-decoration:underline solid!important;text-decoration:underline solid!important}\n"] }]
        }] });
class TuiMessage {
    constructor() {
        this.nothing = tuiWithStyles(TuiMessageStyles);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiMessage, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiMessage, isStandalone: true, selector: "[tuiMessage]", providers: [
            {
                provide: TUI_APPEARANCE_OPTIONS,
                useValue: { appearance: 'neutral' },
            },
        ], hostDirectives: [{ directive: i1.TuiWithAppearance }], ngImport: i0 }); }
}
export { TuiMessage };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiMessage, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiMessage]',
                    providers: [
                        {
                            provide: TUI_APPEARANCE_OPTIONS,
                            useValue: { appearance: 'neutral' },
                        },
                    ],
                    hostDirectives: [TuiWithAppearance],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9raXQvY29tcG9uZW50cy9tZXNzYWdlL21lc3NhZ2UuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFNBQVMsRUFDVCxpQkFBaUIsR0FDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQ2hFLE9BQU8sRUFDSCxzQkFBc0IsRUFDdEIsaUJBQWlCLEdBQ3BCLE1BQU0sc0NBQXNDLENBQUM7OztBQUU5QyxNQVVNLGdCQUFnQjsrR0FBaEIsZ0JBQWdCO21HQUFoQixnQkFBZ0IsaUhBUlIsRUFBRTs7NEZBUVYsZ0JBQWdCO2tCQVZyQixTQUFTO2lDQUNNLElBQUksWUFDTixFQUFFLGlCQUVHLGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU0sUUFDekM7d0JBQ0YsS0FBSyxFQUFFLGFBQWE7cUJBQ3ZCOztBQUlMLE1BV2EsVUFBVTtJQVh2QjtRQVl1QixZQUFPLEdBQUcsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7S0FDaEU7K0dBRlksVUFBVTttR0FBVixVQUFVLDJEQVJSO1lBQ1A7Z0JBQ0ksT0FBTyxFQUFFLHNCQUFzQjtnQkFDL0IsUUFBUSxFQUFFLEVBQUMsVUFBVSxFQUFFLFNBQVMsRUFBQzthQUNwQztTQUNKOztTQUdRLFVBQVU7NEZBQVYsVUFBVTtrQkFYdEIsU0FBUzttQkFBQztvQkFDUCxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFNBQVMsRUFBRTt3QkFDUDs0QkFDSSxPQUFPLEVBQUUsc0JBQXNCOzRCQUMvQixRQUFRLEVBQUUsRUFBQyxVQUFVLEVBQUUsU0FBUyxFQUFDO3lCQUNwQztxQkFDSjtvQkFDRCxjQUFjLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztpQkFDdEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBEaXJlY3RpdmUsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHt0dWlXaXRoU3R5bGVzfSBmcm9tICdAdGFpZ2EtdWkvY2RrL3V0aWxzL21pc2NlbGxhbmVvdXMnO1xuaW1wb3J0IHtcbiAgICBUVUlfQVBQRUFSQU5DRV9PUFRJT05TLFxuICAgIFR1aVdpdGhBcHBlYXJhbmNlLFxufSBmcm9tICdAdGFpZ2EtdWkvY29yZS9kaXJlY3RpdmVzL2FwcGVhcmFuY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzdGFuZGFsb25lOiB0cnVlLFxuICAgIHRlbXBsYXRlOiAnJyxcbiAgICBzdHlsZXM6IFsnQGltcG9ydCBcIkB0YWlnYS11aS9raXQvc3R5bGVzL2NvbXBvbmVudHMvbWVzc2FnZS5sZXNzXCI7J10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAndHVpLW1lc3NhZ2UnLFxuICAgIH0sXG59KVxuY2xhc3MgVHVpTWVzc2FnZVN0eWxlcyB7fVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzdGFuZGFsb25lOiB0cnVlLFxuICAgIHNlbGVjdG9yOiAnW3R1aU1lc3NhZ2VdJyxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogVFVJX0FQUEVBUkFOQ0VfT1BUSU9OUyxcbiAgICAgICAgICAgIHVzZVZhbHVlOiB7YXBwZWFyYW5jZTogJ25ldXRyYWwnfSxcbiAgICAgICAgfSxcbiAgICBdLFxuICAgIGhvc3REaXJlY3RpdmVzOiBbVHVpV2l0aEFwcGVhcmFuY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBUdWlNZXNzYWdlIHtcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgbm90aGluZyA9IHR1aVdpdGhTdHlsZXMoVHVpTWVzc2FnZVN0eWxlcyk7XG59XG4iXX0=