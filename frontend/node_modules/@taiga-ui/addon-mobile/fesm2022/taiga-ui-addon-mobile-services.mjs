import { DOCUMENT } from '@angular/common';
import * as i0 from '@angular/core';
import { inject, Injectable } from '@angular/core';
import { tuiGetNativeFocused } from '@taiga-ui/cdk/utils/focus';
import { merge, fromEvent, filter } from 'rxjs';

class TuiKeyboardService {
    constructor() {
        this.doc = inject(DOCUMENT);
        this.sub = merge(fromEvent(this.doc, 'focusout'), fromEvent(this.doc, 'mousedown').pipe(filter((e) => Object.is(e.target, this.element)))).subscribe(() => {
            this.show();
        });
        this.inputMode = '';
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
        this.show();
    }
    toggle() {
        if (this.element) {
            this.show();
        }
        else {
            this.hide();
        }
    }
    hide() {
        const focused = tuiGetNativeFocused(this.doc);
        if (focused?.inputMode === undefined || this.element) {
            return;
        }
        this.element = focused;
        this.inputMode = focused.inputMode;
        focused.inputMode = 'none';
    }
    show() {
        if (!this.element) {
            return;
        }
        this.element.inputMode = 'none';
        this.element.inputMode = this.inputMode;
        this.element = undefined;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiKeyboardService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiKeyboardService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiKeyboardService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiKeyboardService };
//# sourceMappingURL=taiga-ui-addon-mobile-services.mjs.map
