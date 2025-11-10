import * as i0 from '@angular/core';
import { ElementRef, Directive } from '@angular/core';
import { tuiInjectElement } from '@taiga-ui/cdk/utils';

class TuiElement {
    constructor() {
        this.nativeElement = tuiInjectElement();
        /**
         * @note:
         * Typically, when your constructor is invoked with new,
         * an object is created, its constructor is assigned to
         * the invoked constructor and the object is then assigned
         * to this before executing any operations specified
         * in your constructor method.
         *
         * ERROR TypeError: Class constructor ElementRef cannot be invoked without 'new'
         * https://github.com/taiga-family/taiga-ui/issues/3072
         *
         * This way we can instantiate object creation
         * without additional prototype chain for possible fix bug.
         */
        return new ElementRef(this.nativeElement);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiElement, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiElement, isStandalone: true, selector: "[tuiElement]", exportAs: ["elementRef"], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiElement, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiElement]',
                    exportAs: 'elementRef',
                }]
        }], ctorParameters: function () { return []; } });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiElement };
//# sourceMappingURL=taiga-ui-cdk-directives-element.mjs.map
