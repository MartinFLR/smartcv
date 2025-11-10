import { ChangeDetectionStrategy, Component, Directive, inject, Input, signal, ViewEncapsulation, } from '@angular/core';
import { tuiWithStyles } from '@taiga-ui/cdk/utils/miscellaneous';
import { TuiIcon } from '@taiga-ui/core/components/icon';
import * as i0 from "@angular/core";
class TuiIconBadgeStyles {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiIconBadgeStyles, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: TuiIconBadgeStyles, isStandalone: true, selector: "ng-component", host: { classAttribute: "tui-icon-badge" }, ngImport: i0, template: '', isInline: true, styles: ["[tuiIconBadge]:before{content:\"\";position:absolute;right:.143em;bottom:.143em;display:var(--t-icon-badge, none);inline-size:.57em;block-size:.57em;transform:translate(50%,50%);-webkit-mask:var(--t-icon-badge) no-repeat center / contain;mask:var(--t-icon-badge) no-repeat center / contain;background:currentColor}[tuiIconBadge][style*=\"--t-icon-badge:\"]:after{-webkit-mask-image:var(--t-icon),radial-gradient(circle at bottom .1em right .1em,transparent calc(.4em - .5px),#000 .4em);mask-image:var(--t-icon),radial-gradient(circle at bottom .1em right .1em,transparent calc(.4em - .5px),#000 .4em);-webkit-mask-composite:source-in,xor;mask-composite:intersect}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiIconBadgeStyles, decorators: [{
            type: Component,
            args: [{ standalone: true, template: '', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        class: 'tui-icon-badge',
                    }, styles: ["[tuiIconBadge]:before{content:\"\";position:absolute;right:.143em;bottom:.143em;display:var(--t-icon-badge, none);inline-size:.57em;block-size:.57em;transform:translate(50%,50%);-webkit-mask:var(--t-icon-badge) no-repeat center / contain;mask:var(--t-icon-badge) no-repeat center / contain;background:currentColor}[tuiIconBadge][style*=\"--t-icon-badge:\"]:after{-webkit-mask-image:var(--t-icon),radial-gradient(circle at bottom .1em right .1em,transparent calc(.4em - .5px),#000 .4em);mask-image:var(--t-icon),radial-gradient(circle at bottom .1em right .1em,transparent calc(.4em - .5px),#000 .4em);-webkit-mask-composite:source-in,xor;mask-composite:intersect}\n"] }]
        }] });
class TuiIconBadge {
    constructor() {
        this.icon = inject(TuiIcon);
        this.nothing = tuiWithStyles(TuiIconBadgeStyles);
        this.badgeSrc = signal(null);
    }
    set badge(icon) {
        this.badgeSrc.set(this.icon.resolve(icon));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiIconBadge, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiIconBadge, isStandalone: true, selector: "tui-icon[badge]", inputs: { badge: "badge" }, host: { attributes: { "tuiIconBadge": "" }, properties: { "style.--t-icon-badge": "badgeSrc()" } }, ngImport: i0 }); }
}
export { TuiIconBadge };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiIconBadge, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: 'tui-icon[badge]',
                    host: {
                        tuiIconBadge: '',
                        '[style.--t-icon-badge]': 'badgeSrc()',
                    },
                }]
        }], propDecorators: { badge: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi1iYWRnZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9raXQvZGlyZWN0aXZlcy9pY29uLWJhZGdlL2ljb24tYmFkZ2UuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFNBQVMsRUFDVCxNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sRUFDTixpQkFBaUIsR0FDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQzs7QUFFdkQsTUFVTSxrQkFBa0I7K0dBQWxCLGtCQUFrQjttR0FBbEIsa0JBQWtCLG9IQVJWLEVBQUU7OzRGQVFWLGtCQUFrQjtrQkFWdkIsU0FBUztpQ0FDTSxJQUFJLFlBQ04sRUFBRSxpQkFFRyxpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNLFFBQ3pDO3dCQUNGLEtBQUssRUFBRSxnQkFBZ0I7cUJBQzFCOztBQUlMLE1BUWEsWUFBWTtJQVJ6QjtRQVNxQixTQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXJCLFlBQU8sR0FBRyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUM1QyxhQUFRLEdBQUcsTUFBTSxDQUFnQixJQUFJLENBQUMsQ0FBQztLQU03RDtJQUpHLElBQ1csS0FBSyxDQUFDLElBQVk7UUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDOytHQVRRLFlBQVk7bUdBQVosWUFBWTs7U0FBWixZQUFZOzRGQUFaLFlBQVk7a0JBUnhCLFNBQVM7bUJBQUM7b0JBQ1AsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLElBQUksRUFBRTt3QkFDRixZQUFZLEVBQUUsRUFBRTt3QkFDaEIsd0JBQXdCLEVBQUUsWUFBWTtxQkFDekM7aUJBQ0o7OEJBUWMsS0FBSztzQkFEZixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgRGlyZWN0aXZlLFxuICAgIGluamVjdCxcbiAgICBJbnB1dCxcbiAgICBzaWduYWwsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHt0dWlXaXRoU3R5bGVzfSBmcm9tICdAdGFpZ2EtdWkvY2RrL3V0aWxzL21pc2NlbGxhbmVvdXMnO1xuaW1wb3J0IHtUdWlJY29ufSBmcm9tICdAdGFpZ2EtdWkvY29yZS9jb21wb25lbnRzL2ljb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzdGFuZGFsb25lOiB0cnVlLFxuICAgIHRlbXBsYXRlOiAnJyxcbiAgICBzdHlsZVVybHM6IFsnLi9pY29uLWJhZGdlLnN0eWxlLmxlc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICd0dWktaWNvbi1iYWRnZScsXG4gICAgfSxcbn0pXG5jbGFzcyBUdWlJY29uQmFkZ2VTdHlsZXMge31cblxuQERpcmVjdGl2ZSh7XG4gICAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgICBzZWxlY3RvcjogJ3R1aS1pY29uW2JhZGdlXScsXG4gICAgaG9zdDoge1xuICAgICAgICB0dWlJY29uQmFkZ2U6ICcnLFxuICAgICAgICAnW3N0eWxlLi0tdC1pY29uLWJhZGdlXSc6ICdiYWRnZVNyYygpJyxcbiAgICB9LFxufSlcbmV4cG9ydCBjbGFzcyBUdWlJY29uQmFkZ2Uge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgaWNvbiA9IGluamVjdChUdWlJY29uKTtcblxuICAgIHByb3RlY3RlZCByZWFkb25seSBub3RoaW5nID0gdHVpV2l0aFN0eWxlcyhUdWlJY29uQmFkZ2VTdHlsZXMpO1xuICAgIHByb3RlY3RlZCByZWFkb25seSBiYWRnZVNyYyA9IHNpZ25hbDxzdHJpbmcgfCBudWxsPihudWxsKTtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNldCBiYWRnZShpY29uOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5iYWRnZVNyYy5zZXQodGhpcy5pY29uLnJlc29sdmUoaWNvbikpO1xuICAgIH1cbn1cbiJdfQ==