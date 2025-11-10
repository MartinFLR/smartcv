import * as i0 from '@angular/core';
import { Directive, Input } from '@angular/core';
import { maskitoTransform, MASKITO_DEFAULT_OPTIONS } from '@maskito/core';
import { TuiValueTransformer } from '@taiga-ui/cdk/classes';
import { tuiProvide } from '@taiga-ui/cdk/utils/miscellaneous';
import { identity } from 'rxjs';

class TuiUnmaskHandler extends TuiValueTransformer {
    constructor() {
        super(...arguments);
        this.tuiUnmaskHandler = identity;
        this.maskito = null;
    }
    fromControlValue(controlValue) {
        return maskitoTransform(String(controlValue ?? ''), this.maskito || MASKITO_DEFAULT_OPTIONS);
    }
    toControlValue(value) {
        return this.tuiUnmaskHandler(value);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiUnmaskHandler, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiUnmaskHandler, isStandalone: true, selector: "[maskito][tuiUnmaskHandler]", inputs: { tuiUnmaskHandler: "tuiUnmaskHandler", maskito: "maskito" }, providers: [tuiProvide(TuiValueTransformer, TuiUnmaskHandler)], usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiUnmaskHandler, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[maskito][tuiUnmaskHandler]',
                    providers: [tuiProvide(TuiValueTransformer, TuiUnmaskHandler)],
                }]
        }], propDecorators: { tuiUnmaskHandler: [{
                type: Input
            }], maskito: [{
                type: Input
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiUnmaskHandler };
//# sourceMappingURL=taiga-ui-kit-directives-unmask-handler.mjs.map
