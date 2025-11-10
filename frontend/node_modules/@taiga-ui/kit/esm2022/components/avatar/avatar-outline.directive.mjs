import { ChangeDetectionStrategy, Component, Directive, Input, ViewEncapsulation, } from '@angular/core';
import { tuiWithStyles } from '@taiga-ui/cdk/utils/miscellaneous';
import * as i0 from "@angular/core";
class TuiAvatarOutlineStyles {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiAvatarOutlineStyles, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: TuiAvatarOutlineStyles, isStandalone: true, selector: "ng-component", host: { classAttribute: "tui-avatar-outline" }, ngImport: i0, template: '', isInline: true, styles: ["[tuiAvatarOutline]{--t-outline: .1875rem;--t-gap: .125rem}[tuiAvatarOutline][data-size=xs],[tuiAvatarOutline][data-size=s],[tuiAvatarOutline][data-size=m]{--t-outline: .125rem;--t-gap: .0625rem}[tuiAvatarOutline]._outline{-webkit-mask:radial-gradient(closest-side,#000,#000 calc(100% - var(--t-gap) - var(--t-outline) - .5px),transparent calc(100% - var(--t-gap) - var(--t-outline)),transparent calc(100% - var(--t-outline) - .5px),#000 calc(100% - var(--t-outline)));mask:radial-gradient(closest-side,#000,#000 calc(100% - var(--t-gap) - var(--t-outline) - .5px),transparent calc(100% - var(--t-gap) - var(--t-outline)),transparent calc(100% - var(--t-outline) - .5px),#000 calc(100% - var(--t-outline)))}[tuiAvatarOutline]._outline:after{content:\"\";position:absolute;top:0;left:0;inline-size:100%;block-size:100%;background:var(--t-fill);-webkit-mask:radial-gradient(closest-side,transparent,transparent calc(100% - var(--t-outline) - .5px),#000 calc(100% - var(--t-outline)));mask:radial-gradient(closest-side,transparent,transparent calc(100% - var(--t-outline) - .5px),#000 calc(100% - var(--t-outline)))}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiAvatarOutlineStyles, decorators: [{
            type: Component,
            args: [{ standalone: true, template: '', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        class: 'tui-avatar-outline',
                    }, styles: ["[tuiAvatarOutline]{--t-outline: .1875rem;--t-gap: .125rem}[tuiAvatarOutline][data-size=xs],[tuiAvatarOutline][data-size=s],[tuiAvatarOutline][data-size=m]{--t-outline: .125rem;--t-gap: .0625rem}[tuiAvatarOutline]._outline{-webkit-mask:radial-gradient(closest-side,#000,#000 calc(100% - var(--t-gap) - var(--t-outline) - .5px),transparent calc(100% - var(--t-gap) - var(--t-outline)),transparent calc(100% - var(--t-outline) - .5px),#000 calc(100% - var(--t-outline)));mask:radial-gradient(closest-side,#000,#000 calc(100% - var(--t-gap) - var(--t-outline) - .5px),transparent calc(100% - var(--t-gap) - var(--t-outline)),transparent calc(100% - var(--t-outline) - .5px),#000 calc(100% - var(--t-outline)))}[tuiAvatarOutline]._outline:after{content:\"\";position:absolute;top:0;left:0;inline-size:100%;block-size:100%;background:var(--t-fill);-webkit-mask:radial-gradient(closest-side,transparent,transparent calc(100% - var(--t-outline) - .5px),#000 calc(100% - var(--t-outline)));mask:radial-gradient(closest-side,transparent,transparent calc(100% - var(--t-outline) - .5px),#000 calc(100% - var(--t-outline)))}\n"] }]
        }] });
class TuiAvatarOutline {
    constructor() {
        this.nothing = tuiWithStyles(TuiAvatarOutlineStyles);
        this.tuiAvatarOutline = '';
    }
    get value() {
        return this.tuiAvatarOutline === ''
            ? 'var(--tui-background-accent-1)'
            : this.tuiAvatarOutline;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiAvatarOutline, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiAvatarOutline, isStandalone: true, selector: "[tuiAvatarOutline]", inputs: { tuiAvatarOutline: "tuiAvatarOutline" }, host: { properties: { "style.--t-fill": "value", "class._outline": "value" } }, ngImport: i0 }); }
}
export { TuiAvatarOutline };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiAvatarOutline, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiAvatarOutline]',
                    host: {
                        '[style.--t-fill]': 'value',
                        '[class._outline]': 'value',
                    },
                }]
        }], propDecorators: { tuiAvatarOutline: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLW91dGxpbmUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMva2l0L2NvbXBvbmVudHMvYXZhdGFyL2F2YXRhci1vdXRsaW5lLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxTQUFTLEVBQ1QsS0FBSyxFQUNMLGlCQUFpQixHQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sbUNBQW1DLENBQUM7O0FBRWhFLE1BVU0sc0JBQXNCOytHQUF0QixzQkFBc0I7bUdBQXRCLHNCQUFzQix3SEFSZCxFQUFFOzs0RkFRVixzQkFBc0I7a0JBVjNCLFNBQVM7aUNBQ00sSUFBSSxZQUNOLEVBQUUsaUJBRUcsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTSxRQUN6Qzt3QkFDRixLQUFLLEVBQUUsb0JBQW9CO3FCQUM5Qjs7QUFJTCxNQVFhLGdCQUFnQjtJQVI3QjtRQVN1QixZQUFPLEdBQUcsYUFBYSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFHNUQscUJBQWdCLEdBQWtCLEVBQUUsQ0FBQztLQU8vQztJQUxHLElBQWMsS0FBSztRQUNmLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixLQUFLLEVBQUU7WUFDL0IsQ0FBQyxDQUFDLGdDQUFnQztZQUNsQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO0lBQ2hDLENBQUM7K0dBVlEsZ0JBQWdCO21HQUFoQixnQkFBZ0I7O1NBQWhCLGdCQUFnQjs0RkFBaEIsZ0JBQWdCO2tCQVI1QixTQUFTO21CQUFDO29CQUNQLFVBQVUsRUFBRSxJQUFJO29CQUNoQixRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixJQUFJLEVBQUU7d0JBQ0Ysa0JBQWtCLEVBQUUsT0FBTzt3QkFDM0Isa0JBQWtCLEVBQUUsT0FBTztxQkFDOUI7aUJBQ0o7OEJBS1UsZ0JBQWdCO3NCQUR0QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgRGlyZWN0aXZlLFxuICAgIElucHV0LFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7dHVpV2l0aFN0eWxlc30gZnJvbSAnQHRhaWdhLXVpL2Nkay91dGlscy9taXNjZWxsYW5lb3VzJztcblxuQENvbXBvbmVudCh7XG4gICAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgICB0ZW1wbGF0ZTogJycsXG4gICAgc3R5bGVVcmxzOiBbJy4vYXZhdGFyLW91dGxpbmUuc3R5bGVzLmxlc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICd0dWktYXZhdGFyLW91dGxpbmUnLFxuICAgIH0sXG59KVxuY2xhc3MgVHVpQXZhdGFyT3V0bGluZVN0eWxlcyB7fVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzdGFuZGFsb25lOiB0cnVlLFxuICAgIHNlbGVjdG9yOiAnW3R1aUF2YXRhck91dGxpbmVdJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbc3R5bGUuLS10LWZpbGxdJzogJ3ZhbHVlJyxcbiAgICAgICAgJ1tjbGFzcy5fb3V0bGluZV0nOiAndmFsdWUnLFxuICAgIH0sXG59KVxuZXhwb3J0IGNsYXNzIFR1aUF2YXRhck91dGxpbmUge1xuICAgIHByb3RlY3RlZCByZWFkb25seSBub3RoaW5nID0gdHVpV2l0aFN0eWxlcyhUdWlBdmF0YXJPdXRsaW5lU3R5bGVzKTtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHR1aUF2YXRhck91dGxpbmU6IHN0cmluZyB8IG51bGwgPSAnJztcblxuICAgIHByb3RlY3RlZCBnZXQgdmFsdWUoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLnR1aUF2YXRhck91dGxpbmUgPT09ICcnXG4gICAgICAgICAgICA/ICd2YXIoLS10dWktYmFja2dyb3VuZC1hY2NlbnQtMSknXG4gICAgICAgICAgICA6IHRoaXMudHVpQXZhdGFyT3V0bGluZTtcbiAgICB9XG59XG4iXX0=