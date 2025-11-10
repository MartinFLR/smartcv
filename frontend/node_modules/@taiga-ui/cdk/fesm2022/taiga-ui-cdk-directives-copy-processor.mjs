import * as i0 from '@angular/core';
import { inject, Directive, Input } from '@angular/core';
import { WA_WINDOW } from '@ng-web-apis/common';
import { tuiGetSelectedText } from '@taiga-ui/cdk/utils';
import { identity } from 'rxjs';

class TuiCopyProcessor {
    constructor() {
        this.win = inject(WA_WINDOW);
        this.tuiCopyProcessor = identity;
    }
    onCopy(event) {
        const text = tuiGetSelectedText(this.win);
        if (text) {
            event.clipboardData?.setData('text/plain', this.tuiCopyProcessor(text));
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiCopyProcessor, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiCopyProcessor, isStandalone: true, selector: "[tuiCopyProcessor]", inputs: { tuiCopyProcessor: "tuiCopyProcessor" }, host: { listeners: { "copy.prevent": "onCopy($event)" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiCopyProcessor, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiCopyProcessor]',
                    host: {
                        '(copy.prevent)': 'onCopy($event)',
                    },
                }]
        }], propDecorators: { tuiCopyProcessor: [{
                type: Input
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiCopyProcessor };
//# sourceMappingURL=taiga-ui-cdk-directives-copy-processor.mjs.map
