import * as i0 from '@angular/core';
import { Directive, Output } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, skip } from 'rxjs';

class TuiPresent {
    constructor() {
        this.visibility$ = new BehaviorSubject(false);
        this.tuiPresentChange = this.visibility$.pipe(distinctUntilChanged(), skip(1));
    }
    ngOnDestroy() {
        this.visibility$.next(false);
    }
    onAnimation(visibility) {
        this.visibility$.next(visibility);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPresent, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiPresent, isStandalone: true, selector: "[tuiPresentChange]", outputs: { tuiPresentChange: "tuiPresentChange" }, host: { listeners: { "animationcancel.self": "onAnimation(false)", "animationstart.self": "onAnimation(true)" }, properties: { "style.animation": "\"tuiPresent 1s infinite\"" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPresent, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiPresentChange]',
                    host: {
                        '[style.animation]': '"tuiPresent 1s infinite"',
                        '(animationcancel.self)': 'onAnimation(false)',
                        '(animationstart.self)': 'onAnimation(true)',
                    },
                }]
        }], propDecorators: { tuiPresentChange: [{
                type: Output
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiPresent };
//# sourceMappingURL=taiga-ui-kit-directives-present.mjs.map
