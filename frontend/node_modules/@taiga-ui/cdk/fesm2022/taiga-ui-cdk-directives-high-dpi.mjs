import * as i0 from '@angular/core';
import { inject, ViewContainerRef, TemplateRef, Directive } from '@angular/core';
import { WA_WINDOW } from '@ng-web-apis/common';

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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiHighDpi, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiHighDpi]',
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiHighDpi };
//# sourceMappingURL=taiga-ui-cdk-directives-high-dpi.mjs.map
