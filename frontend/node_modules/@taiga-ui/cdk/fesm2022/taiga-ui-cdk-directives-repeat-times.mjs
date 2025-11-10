import * as i0 from '@angular/core';
import { inject, ViewContainerRef, TemplateRef, Directive, Input } from '@angular/core';
import { tuiClamp } from '@taiga-ui/cdk/utils/math';

const MAX_VALUE = 0x10000;
class TuiRepeatTimesContext {
    constructor($implicit) {
        this.$implicit = $implicit;
    }
}
/**
 * Directive similar to ngFor but using a number of repetitions rather than an array
 *
 * {@link TuiRepeatTimes.tuiRepeatTimesOf requested number of times}.
 * {@link TuiRepeatTimesContext context} for every instance of the template inherits outer context and stores
 * {@link TuiRepeatTimesContext.$implicit index} of a template instance.
 */
class TuiRepeatTimes {
    constructor() {
        this.viewContainer = inject(ViewContainerRef);
        this.templateRef = inject((TemplateRef));
    }
    set tuiRepeatTimesOf(count) {
        const safeCount = Math.floor(tuiClamp(count, 0, MAX_VALUE));
        const { length } = this.viewContainer;
        if (count < length) {
            this.removeContainers(length - count);
        }
        else {
            this.addContainers(safeCount);
        }
    }
    addContainers(count) {
        for (let index = this.viewContainer.length; index < count; index++) {
            this.viewContainer.createEmbeddedView(this.templateRef, new TuiRepeatTimesContext(index));
        }
    }
    removeContainers(amount) {
        for (let index = 0; index < amount; index++) {
            this.viewContainer.remove();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiRepeatTimes, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiRepeatTimes, isStandalone: true, selector: "[tuiRepeatTimes][tuiRepeatTimesOf]", inputs: { tuiRepeatTimesOf: "tuiRepeatTimesOf" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiRepeatTimes, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiRepeatTimes][tuiRepeatTimesOf]',
                }]
        }], propDecorators: { tuiRepeatTimesOf: [{
                type: Input
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiRepeatTimes, TuiRepeatTimesContext };
//# sourceMappingURL=taiga-ui-cdk-directives-repeat-times.mjs.map
