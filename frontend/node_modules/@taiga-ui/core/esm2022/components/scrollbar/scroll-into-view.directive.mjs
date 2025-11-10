import { DestroyRef, Directive, inject, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tuiInjectElement } from '@taiga-ui/cdk/utils/dom';
import { timer } from 'rxjs';
import { TUI_SCROLL_INTO_VIEW } from './scrollbar.component';
import * as i0 from "@angular/core";
/**
 * Directive scrolls element into view inside tui-scrollbar
 */
class TuiScrollIntoView {
    constructor() {
        this.el = tuiInjectElement();
        this.destroyRef = inject(DestroyRef);
    }
    set tuiScrollIntoView(scroll) {
        if (!scroll) {
            return;
        }
        // Timeout is necessary in order to give element render cycle to get into its final spot
        // (for example if it is inside dropdown box which has to be positioned first)
        timer(0)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
            this.el.dispatchEvent(new CustomEvent(TUI_SCROLL_INTO_VIEW, {
                bubbles: true,
                detail: this.el,
            }));
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiScrollIntoView, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiScrollIntoView, isStandalone: true, selector: "[tuiScrollIntoView]", inputs: { tuiScrollIntoView: "tuiScrollIntoView" }, ngImport: i0 }); }
}
export { TuiScrollIntoView };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiScrollIntoView, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiScrollIntoView]',
                }]
        }], propDecorators: { tuiScrollIntoView: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLWludG8tdmlldy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2NvbXBvbmVudHMvc2Nyb2xsYmFyL3Njcm9sbC1pbnRvLXZpZXcuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDOUQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUUzQixPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQzs7QUFFM0Q7O0dBRUc7QUFDSCxNQUlhLGlCQUFpQjtJQUo5QjtRQUtxQixPQUFFLEdBQUcsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixlQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBcUJwRDtJQW5CRyxJQUNXLGlCQUFpQixDQUFDLE1BQWU7UUFDeEMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE9BQU87U0FDVjtRQUVELHdGQUF3RjtRQUN4Riw4RUFBOEU7UUFDOUUsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUNILElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDekMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUNqQixJQUFJLFdBQVcsQ0FBVSxvQkFBb0IsRUFBRTtnQkFDM0MsT0FBTyxFQUFFLElBQUk7Z0JBQ2IsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFO2FBQ2xCLENBQUMsQ0FDTCxDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDOytHQXRCUSxpQkFBaUI7bUdBQWpCLGlCQUFpQjs7U0FBakIsaUJBQWlCOzRGQUFqQixpQkFBaUI7a0JBSjdCLFNBQVM7bUJBQUM7b0JBQ1AsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLFFBQVEsRUFBRSxxQkFBcUI7aUJBQ2xDOzhCQU1jLGlCQUFpQjtzQkFEM0IsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGVzdHJveVJlZiwgRGlyZWN0aXZlLCBpbmplY3QsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7dGFrZVVudGlsRGVzdHJveWVkfSBmcm9tICdAYW5ndWxhci9jb3JlL3J4anMtaW50ZXJvcCc7XG5pbXBvcnQge3R1aUluamVjdEVsZW1lbnR9IGZyb20gJ0B0YWlnYS11aS9jZGsvdXRpbHMvZG9tJztcbmltcG9ydCB7dGltZXJ9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge1RVSV9TQ1JPTExfSU5UT19WSUVXfSBmcm9tICcuL3Njcm9sbGJhci5jb21wb25lbnQnO1xuXG4vKipcbiAqIERpcmVjdGl2ZSBzY3JvbGxzIGVsZW1lbnQgaW50byB2aWV3IGluc2lkZSB0dWktc2Nyb2xsYmFyXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHN0YW5kYWxvbmU6IHRydWUsXG4gICAgc2VsZWN0b3I6ICdbdHVpU2Nyb2xsSW50b1ZpZXddJyxcbn0pXG5leHBvcnQgY2xhc3MgVHVpU2Nyb2xsSW50b1ZpZXcge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZWwgPSB0dWlJbmplY3RFbGVtZW50KCk7XG4gICAgcHJpdmF0ZSByZWFkb25seSBkZXN0cm95UmVmID0gaW5qZWN0KERlc3Ryb3lSZWYpO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2V0IHR1aVNjcm9sbEludG9WaWV3KHNjcm9sbDogYm9vbGVhbikge1xuICAgICAgICBpZiAoIXNjcm9sbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGltZW91dCBpcyBuZWNlc3NhcnkgaW4gb3JkZXIgdG8gZ2l2ZSBlbGVtZW50IHJlbmRlciBjeWNsZSB0byBnZXQgaW50byBpdHMgZmluYWwgc3BvdFxuICAgICAgICAvLyAoZm9yIGV4YW1wbGUgaWYgaXQgaXMgaW5zaWRlIGRyb3Bkb3duIGJveCB3aGljaCBoYXMgdG8gYmUgcG9zaXRpb25lZCBmaXJzdClcbiAgICAgICAgdGltZXIoMClcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbERlc3Ryb3llZCh0aGlzLmRlc3Ryb3lSZWYpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgICAgICAgICAgICBuZXcgQ3VzdG9tRXZlbnQ8RWxlbWVudD4oVFVJX1NDUk9MTF9JTlRPX1ZJRVcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHRoaXMuZWwsXG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=