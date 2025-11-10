import * as i0 from '@angular/core';
import { inject, Directive } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WA_WINDOW } from '@ng-web-apis/common';
import { ViewportService } from '@ng-web-apis/screen-orientation';
import { tuiInjectElement, tuiPx } from '@taiga-ui/cdk/utils';

class TuiVisualViewport {
    constructor() {
        this.w = inject(WA_WINDOW);
        this.style = tuiInjectElement().style;
        this.$ = inject(ViewportService)
            .pipe(takeUntilDestroyed())
            .subscribe(({ offsetLeft, offsetTop, height, width, scale }) => {
            this.style.setProperty('--tui-viewport-x', tuiPx(offsetLeft));
            this.style.setProperty('--tui-viewport-y', tuiPx(offsetTop));
            this.style.setProperty('--tui-viewport-height', tuiPx(height));
            this.style.setProperty('--tui-viewport-width', tuiPx(width));
            this.style.setProperty('--tui-viewport-scale', String(scale));
            this.style.setProperty('--tui-viewport-vh', tuiPx(this.w.innerHeight / 100));
            this.style.setProperty('--tui-viewport-vw', tuiPx(this.w.innerWidth / 100));
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiVisualViewport, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiVisualViewport, isStandalone: true, selector: "[tuiVisualViewport]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiVisualViewport, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiVisualViewport]',
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiVisualViewport };
//# sourceMappingURL=taiga-ui-cdk-directives-visual-viewport.mjs.map
